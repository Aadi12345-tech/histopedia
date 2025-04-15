const express = require('express');
const City = require('../models/cities'); 

const router = express.Router();

//get
router.get('/', async (req, res) => {
    try {
        const cities = await City.find();
        console.log(cities)
        res.status(200).json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//patch
router.patch('/artifact', async (req, res) => {
    try {
        const { cityId, artifact } = req.body;

        if (!cityId || !artifact) {
            return res.status(400).json({ error: 'cityId and artifact are required' });
        }

        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        city.artifacts.push(artifact);
        await city.save();

        res.status(200).json({ message: 'Artifact added successfully', city });
    } catch (error) {
        console.error('Error adding artifact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//patch
router.patch('/event', async (req, res) => {
    try {
        const { cityId, event } = req.body;

        if (!cityId || !event) {
            return res.status(400).json({ error: 'cityId and event are required' });
        }

        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        city.events.push(event);
        await city.save();

        res.status(200).json({ message: 'Event added successfully', city });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//patch
router.patch('/guides', async (req, res) => {
    try {
        const { cityId, username, updatedGuide } = req.body;

        if (!cityId || !username || !updatedGuide) {
            return res.status(400).json({ error: 'cityId, username, and updatedGuide are required' });
        }

        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        const guideIndex = city.guides.findIndex(guide => guide.username === username);
        if (guideIndex === -1) {
            return res.status(404).json({ error: 'Guide not found' });
        }

        city.guides[guideIndex] = { ...city.guides[guideIndex], ...updatedGuide };
        await city.save();

        res.status(200).json({ message: 'Guide updated successfully', city });
    } catch (error) {
        console.error('Error updating guide:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch("/guides/add", async (req, res) => {
    try {
        const { cityId, newGuide } = req.body;

        if (!cityId || !newGuide) {
            return res.status(400).json({ error: 'cityId and newGuide are required' });
        }

        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        city.guides.push(newGuide);
        await city.save();

        res.status(200).json({ message: 'Guide added successfully', city });
    } catch (error) {
        console.error('Error adding guide:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//patch
router.patch('/', async (req, res) => {
    try {
        const { cityId, monument } = req.body;

        if (!cityId || !monument) {
            return res.status(400).json({ error: 'cityId and monument are required' });
        }

        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        city.monuments.push(monument);
        await city.save();

        res.status(200).json({ message: 'Monument added successfully', city });
    } catch (error) {
        console.error('Error adding monument:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//post
router.post("/", async(req, res)=>{
    const data = req.body;
    const newCity = new City(data);
    await newCity.save();
    res.sendStatus(200)
})

module.exports = router;