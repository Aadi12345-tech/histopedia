import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../utils/ImageUtils';
import { getMainImage } from '../utils/MonumentImageUtil';
import './Monument.css';

const Monument = () => {
  const { monumentId } = useParams();
  const location = useLocation();
  const [monument, setMonument] = useState(null);
  
  // Get background image from location state if available
  const backgroundImage = location.state?.backgroundImage;

  // Log the monumentId for debugging
  useEffect(() => {
    console.log('Monument page - Current monument ID:', monumentId);
    if (backgroundImage) {
      console.log('Using background image from navigation:', backgroundImage);
    }
  }, [monumentId, backgroundImage]);

  // Monument data (in a real app, you would fetch this from an API)
  const monumentsData = useMemo(() => ({
    'red-fort': {
      id: 'red-fort',
      name: 'Red Fort',
      city: 'Delhi',
      image: '/desktop/images/redfort.jpg',
      fallbackImage: '/images/red-fort.jpg', // Alternative image
      description: 'The Red Fort is a historic fort in the city of Delhi that served as the main residence of the Mughal Emperors.',
      history: 'Built in 1639-48 by Emperor Shah Jahan, the Red Fort (Lal Qila) derives its name from its massive red sandstone walls. It served as the main residence of the Mughal Emperors for nearly 200 years, until 1856. The fort complex houses numerous buildings including the Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), Rang Mahal (Palace of Colors), and Moti Masjid (Pearl Mosque). It was the ceremonial and political center of the Mughal state and where the emperor would receive members of the public and hear their grievances. During British colonial rule, the fort became a symbol of power and was where the British housed their military. In 1947, India\\\'s first Prime Minister, Jawaharlal Nehru, raised the Indian national flag above the Lahori Gate, a tradition that continues today with the Prime Minister\\\'s annual Independence Day address to the nation.',
      significance: 'The Red Fort represents the zenith of Mughal creativity, blending Persian, Timurid, and Hindu architectural traditions. It influenced later buildings and gardens in Delhi, Rajasthan, and other regions. The fort complex showcases the architectural magnificence and cultural wealth of the Mughal Empire at its peak. The planning and aesthetics of the Red Fort represent a significant phase in the development of Mughal imperial architecture. It serves as a powerful reminder of India\\\'s rich cultural heritage and its struggle for independence. Since 1947, the fort has been a politically significant monument, with the Prime Minister delivering the Independence Day speech from its ramparts. In 2007, it was designated a UNESCO World Heritage Site for its outstanding cultural importance. Today, it remains one of India\\\'s most iconic landmarks and a major tourist attraction, drawing millions of visitors from around the world each year.',
      ticketPrice: 35
    },
    'taj-mahal': {
      id: 'taj-mahal',
      name: 'Taj Mahal',
      city: 'Agra',
      image: '/desktop/images/tajmahal.jpg',
      fallbackImage: '/images/taj-mahal.jpg', // Alternative image
      description: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra.',
      history: 'The Taj Mahal was commissioned in 1632 by the Mughal emperor Shah Jahan (reigned 1628–1658) to house the tomb of his favorite wife, Mumtaz Mahal, who died in childbirth in 1631. Construction took approximately 22 years and required over 20,000 artisans and craftsmen, led by the court architect Ustad Ahmad Lahauri. The main building was completed by 1643, but work on the surrounding complex continued for another decade. The material used included over 1,000 elephants to transport building materials, and specialized craftsmen from as far away as Europe and Central Asia contributed to the project. The total cost at the time was estimated to be around 32 million rupees, which would be over $1 billion in today\\\'s value. According to legend, Shah Jahan planned to build an identical mausoleum in black marble for himself across the river but was deposed by his son Aurangzeb before construction could begin. The Taj Mahal underwent various phases of ownership, from the decline of the Mughal Empire to British colonial rule, and finally to independent India, where extensive restoration efforts have been undertaken to preserve its beauty.',
      significance: 'The Taj Mahal is universally admired as the finest example of Mughal architecture, combining elements from Islamic, Persian, Ottoman Turkish, and Indian architectural styles. Its perfect proportions, exquisite craftsmanship, and the harmonious integration of architectural elements have made it one of the most beautiful buildings in the world. The use of white marble with inlaid precious and semi-precious stones (pietra dura) represents the pinnacle of this decorative art form. Beyond its architectural significance, the Taj Mahal stands as a monumental symbol of eternal love. The detailed calligraphy, intricate marble screens, and precise garden layout all carry deep symbolic meaning within Islamic tradition. The monument demonstrates perfect symmetry except for Shah Jahan\\\'s cenotaph, which was added later. In 1983, the Taj Mahal became a UNESCO World Heritage site and is considered one of the New Seven Wonders of the World. It attracts 7-8 million visitors annually and has become an iconic symbol of India\\\'s rich cultural heritage, appearing in countless works of literature, film, and art throughout the world.',
      ticketPrice: 45
    },
    'hawa-mahal': {
      id: 'hawa-mahal',
      name: 'Hawa Mahal',
      city: 'Jaipur',
      image: '/desktop/images/hawamahal.jpg',
      fallbackImage: '/images/hawa-mahal.jpg', // Alternative image
      description: 'Hawa Mahal (Palace of Winds) is a palace in Jaipur, India, with a unique five-story exterior resembling a honeycomb with 953 small windows.',
      history: 'Hawa Mahal was built in 1799 by Maharaja Sawai Pratap Singh, the grandson of Maharaja Sawai Jai Singh, who founded Jaipur. The palace was designed by Lal Chand Ustad in the form of the crown of Krishna, the Hindu god. Its unique five-story exterior resembles a honeycomb with its 953 small windows called "jharokhas" decorated with intricate latticework. The original intention of the lattice design was to allow royal ladies to observe everyday life and festivals celebrated in the street below without being seen, since they had to follow the strict "purdah" (face covering) tradition. The architectural style is a remarkable fusion of Hindu Rajput architecture and Islamic Mughal architecture. The palace is a five-story pyramidal structure constructed of red and pink sandstone. The façade, intricately carved and maintained in immaculate condition, faces east and stands at an angle to the main road. The entry is from the rear side, through an imperial door which opens into a spacious courtyard surrounded by two-story buildings on three sides.',
      significance: 'Hawa Mahal is one of the most distinctive landmarks of Jaipur and has become an icon of Rajasthani architecture. Its cultural significance lies in how it represents the perfect blend of Hindu Rajput architecture with Islamic Mughal influences, showcasing the cultural synthesis that was prominent during that era. The palace stands as a remarkable testament to the scientific and architectural expertise of the period. The jharokhas (windows) were designed not only for aesthetic purposes but also for climate control - they create a venturi effect (wind tunnel) which helps maintain air circulation and keeps the palace cool even during extreme summer temperatures. This makes it one of the earliest examples of bioclimatic architecture. Beyond its architectural merits, Hawa Mahal represents an important cultural statement about the social customs of the time, particularly regarding the role of royal women and the purdah system. The palace symbolizes how architectural innovation was used to navigate social restrictions, allowing royal women to participate in public life while maintaining their privacy. Today, the Hawa Mahal is one of Rajasthan\\\'s most popular tourist attractions and has become a symbol of Jaipur, often featured in tourism campaigns for the "Pink City."',
      ticketPrice: 50
    },
    'humayun-tomb': {
      id: 'humayun-tomb',
      name: 'Humayun\'s Tomb',
      city: 'Delhi',
      image: '/desktop/images/humayuntomb.jpg',
      fallbackImage: '/images/humayun-tomb.jpg', // Alternative image
      description: 'Humayun\'s Tomb is the tomb of the Mughal Emperor Humayun in Delhi, India.',
      history: 'Humayun\'s Tomb was built between 1569-1570, commissioned by Humayun\'s first wife and chief consort, Empress Bega Begum (also known as Haji Begum), nine years after the Emperor\'s death. The construction cost 1.5 million rupees, funded entirely by the Empress. The tomb was designed by Mirak Mirza Ghiyas, a Persian architect chosen by the Empress, and was the first garden-tomb on the Indian subcontinent. The construction was supervised by Mirak\'s son, Sayyid Muhammad, after his father\'s death. The site chosen was on the banks of the Yamuna River, in a large walled garden. Humayun had previously established many gardens in Kabul and Delhi, and this may have influenced the choice of setting. The main tomb took eight years to build, and the empress herself supervised the construction. The complex also included a mosque, a guest house, and other Mughal-era structures. During the Partition of India, the tomb complex was used as a refugee camp for people migrating to the newly formed Pakistan. After independence, the Archaeological Survey of India undertook a major restoration project between 1997-2013, which restored the gardens, fountains, and water channels to their original glory.',
      significance: 'Humayun\'s Tomb is architecturally one of the most influential Mughal buildings, representing a leap in Mughal architecture and setting a precedent for future Mughal tombs. It combines Persian and Indian architectural elements in a harmonious synthesis and is considered a precursor to the Taj Mahal. The tomb pioneered several architectural innovations that became hallmarks of Mughal design, including the garden-tomb concept (char-bagh) with quadrilateral layout and water channels representing the four rivers of Paradise according to Islamic belief. The use of red sandstone with white marble accents created a distinctive aesthetic that influenced numerous later buildings. The double dome structure, first of its kind in India, allowed for greater height while maintaining interior proportions. In 1993, Humayun\'s Tomb was declared a UNESCO World Heritage Site, recognized for its cultural significance and architectural innovation. The restoration of the tomb complex has become a model for heritage conservation in India, including the urban renewal project in the adjoining Nizamuddin area that combined conservation with socio-economic development initiatives. The tomb complex continues to be one of Delhi\'s most significant historical sites, attracting hundreds of thousands of visitors annually.',
      ticketPrice: 35
    },
    // Add more monuments here as needed
  }), []);

  // Additional monuments based on IDs from the City component
  const additionalMonuments = useMemo(() => ({
    'qutub-minar': {
      id: 'qutub-minar',
      name: 'Qutub Minar',
      city: 'Delhi',
      image: '/desktop/images/qutubminar.jpg',
      fallbackImage: '/images/qutub-minar.jpg', // Alternative image
      description: 'The Qutub Minar is a minaret and victory tower that forms part of the Qutub complex.',
      history: 'The Qutub Minar was built in 1193 by Qutb-ud-din Aibak, the founder of the Delhi Sultanate, to celebrate Muslim victory over the last Hindu kingdom in Delhi. The construction began after the defeat of Delhi\'s last Hindu kingdom, and was completed by his successor Iltutmish and later restored and expanded by Firoz Shah Tughlaq in 1368. The tower\'s construction spanned three generations of rulers. Standing at 72.5 meters (238 feet), it was the tallest minaret in the world at the time of its completion. The tower consists of five distinct storeys, each marked by a projecting balcony and tapers from a 15-meter diameter at the base to just 2.5 meters at the top. The first three storeys are made of red sandstone, while the fourth and fifth storeys are made of marble and sandstone. Each storey features intricate carvings of verses from the Quran and various decorative elements, showing the evolution of architectural styles over time. The Qutub complex also contains the Iron Pillar of Delhi, a 7.21-meter (24-foot) high pillar from the Gupta Empire (4th century CE) that has stood for over 1,600 years without rusting, demonstrating the advanced metallurgical skills of ancient India.',
      significance: 'The Qutub Minar is one of the earliest and most prominent examples of Indo-Islamic architecture, representing the beginning of Muslim rule in India. It masterfully combines traditional Hindu decorative elements with Islamic calligraphy and architectural principles, symbolizing the cultural synthesis that would characterize much of India\'s medieval period. The monument marks a pivotal turning point in Indian history and architecture, showing the transition from Hindu temple architectural styles to new Islamic-influenced designs. The scientific and engineering achievement of the Qutub Minar is remarkable - its earthquake-resistant design has allowed it to withstand numerous seismic events over eight centuries. The complex is now a UNESCO World Heritage Site, recognized for its outstanding universal value and architectural significance. The Qutub Minar continues to be one of India\'s most visited monuments, attracting scholars, architects, and tourists from around the world. As the first major Islamic monument built in India, it set architectural precedents that would influence buildings throughout the subcontinent for centuries to come. Beyond its architectural importance, the Qutub Minar serves as a powerful cultural symbol in modern India, featured on postage stamps, in literature, and in numerous cultural references.',
      ticketPrice: 30
    },
    'india-gate': {
      id: 'india-gate',
      name: 'India Gate',
      city: 'Delhi',
      image: '/desktop/images/indiagate.jpg',
      fallbackImage: '/images/india-gate.jpg', // Alternative image
      description: 'The India Gate is a war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi.',
      history: 'The India Gate, originally called the All India War Memorial, was designed by Sir Edwin Lutyens, a leading member of the British town planning for New Delhi. Construction began in 1921 and was completed in 1931, taking ten years to build. The memorial was built to honor the 82,000 soldiers of the undivided British Indian Army who died serving in the First World War (1914-1918) and the Third Anglo-Afghan War (1919). The names of 13,300 servicemen, including some soldiers and officers from the United Kingdom, are inscribed on the gate. Following India\'s independence in 1947, the India Gate became a symbol of national pride and was incorporated into India\'s Republic Day celebrations. In 1971, a simple black marble cenotaph with a rifle topped by a soldier\'s helmet, known as the Amar Jawan Jyoti (Flame of the Immortal Soldier), was added beneath the archway to commemorate the Indian soldiers who died in the 1971 Indo-Pakistan War. This eternal flame burned continuously for 50 years until it was merged with the National War Memorial flame in 2022. In 2022, the canopy near India Gate that once housed the statue of King George V was replaced with a statue of Subhas Chandra Bose, a prominent Indian nationalist leader.',
      significance: 'The India Gate stands as one of India\'s largest war memorials and is a powerful symbol of national sacrifice and pride. Architecturally, it exemplifies the British Imperial style that characterized Edwin Lutyens\' design for New Delhi, with elements inspired by the Arc de Triomphe in Paris but adapted to include Indian decorative elements. The memorial holds immense historical importance as it commemorates the sacrifice of Indian soldiers who fought in various wars, bridging India\'s colonial past and its independent present. The memorial\'s location at the eastern end of the Rajpath (now Kartavya Path) makes it part of the ceremonial axis of New Delhi and a central element in India\'s most important state functions, including the annual Republic Day parade. Beyond its commemorative role, the India Gate and its surrounding lawns have become one of Delhi\'s most popular public spaces, visited by thousands of locals and tourists daily. The site has evolved into a vibrant recreational area where families gather, especially in the evenings when the monument is illuminated. The recent addition of Subhas Chandra Bose\'s statue in 2022 represents how the monument continues to evolve as a space that reflects India\'s developing national identity and historical narrative. In contemporary India, the India Gate remains an iconic landmark that appears in numerous films, photographs, and tourist literature, making it one of the most recognizable symbols of New Delhi and modern India.',
      ticketPrice: 0
    },
    'agra-fort': {
      id: 'agra-fort',
      name: 'Agra Fort',
      city: 'Agra',
      image: '/desktop/images/agrafort.jpg',
      fallbackImage: '/images/agra-fort.jpg',
      description: 'Agra Fort is a historical fort in the city of Agra, a UNESCO World Heritage site located about 2.5 km northwest of the Taj Mahal.',
      history: 'Agra Fort was built by the Mughal Emperor Akbar between 1565 and 1573. The fort was built primarily as a military structure, but was later transformed into a palace during Shah Jahan\'s era, and eventually became his prison when his son Aurangzeb seized power in 1658. The fort was originally built with brick in the inner core with sandstone on external surfaces. Shah Jahan later demolished some of the earlier buildings and replaced them with white marble structures. The fort complex includes numerous impressive structures like the Jahangir Palace, Khas Mahal, Diwan-i-Khas, Diwan-i-Am, Machchhi Bhawan, Moti Masjid, and Shish Mahal. Before the British took over, the fort was invaded and held by various rulers including Mahmud of Ghazni, the Qarmatians, the Ghurids, and the Delhi Sultanate. After India\'s independence in 1947, the fort was taken over by the Indian government and is today a major tourist attraction managed by the Archaeological Survey of India.',
      significance: 'Agra Fort represents the pinnacle of Mughal architecture and military design, showcasing the evolution of Indian architecture from the robustly defensive structures of Akbar\'s reign to the more refined and delicate marble palaces of Shah Jahan\'s era. The fort\'s strategic position along the Yamuna River made it a key military installation and an important center of Mughal governance for nearly a century. The architectural synthesis found within the fort exemplifies the cultural blending that characterized the Mughal period, with elements of Islamic, Persian, and Hindu design seamlessly integrated. As a UNESCO World Heritage Site since 1983, the fort is recognized for its outstanding universal value and historical significance. The fort\'s position offering views of the Taj Mahal highlights the connection between these two magnificent structures, both part of Shah Jahan\'s legacy. The fort bears witness to the opulence of the Mughal court, as well as their administrative systems, as evidenced by structures like the Diwan-i-Am (Hall of Public Audience) and Diwan-i-Khas (Hall of Private Audience). The fort also has significant emotional resonance as the place where Shah Jahan spent his final years as a prisoner, gazing at the Taj Mahal, the monument he had built for his beloved wife.',
      ticketPrice: 50
    },
    'fatehpur-sikri': {
      id: 'fatehpur-sikri',
      name: 'Fatehpur Sikri',
      city: 'Agra',
      image: '/desktop/images/fatehpursikri.jpg',
      fallbackImage: '/images/fatehpur-sikri.jpg',
      description: 'Fatehpur Sikri is a city in the Agra District of Uttar Pradesh, built by Emperor Akbar as the capital of the Mughal Empire.',
      history: 'Fatehpur Sikri was founded by the Mughal Emperor Akbar in 1569 to honor the Sufi saint Salim Chishti, who had predicted the birth of Akbar\'s son and heir, Jahangir. The city was meticulously planned and constructed between 1571 and 1585 and served as the Mughal capital for approximately 14 years before being abandoned in 1610 due to insufficient water supply. The imperial complex was constructed in a predominantly red sandstone architectural style, with elements of Persian and local designs. The city includes several remarkable structures, including the Jama Masjid, Buland Darwaza (the tallest gateway in the world), Diwan-i-Khas, Diwan-i-Am, Panch Mahal, Jodha Bai\'s Palace, and the tomb of Salim Chishti. After being abandoned, the city remained remarkably well-preserved and was largely untouched for over 400 years, providing a frozen-in-time glimpse into Mughal architecture and urban planning. The city was declared a UNESCO World Heritage Site in 1986 and is now a popular tourist destination managed by the Archaeological Survey of India.',
      significance: 'Fatehpur Sikri stands as one of the finest examples of Mughal architecture, representing Emperor Akbar\'s vision of combining Islamic, Persian, and Hindu architectural elements to create a distinctive style that embodied his policy of religious tolerance. The city\'s layout and design reflect Akbar\'s philosophical and religious ideas, particularly his concept of "Divine Faith" (Din-i-Ilahi), which sought to synthesize elements from various religions. As a complete imperial capital built from scratch, the city offers unique insights into 16th-century Mughal urban planning, administrative structures, and court life. The Buland Darwaza (Victory Gate), standing 55 meters tall, is one of the largest gateways in the world and symbolizes Akbar\'s victory over Gujarat. The marble tomb of Salim Chishti within the complex remains an important place of pilgrimage, where people of all faiths come to seek blessings. The complex demonstrates advanced engineering and architectural techniques of the period, including sophisticated water management systems (though ultimately insufficient) and innovative structural designs. As a UNESCO World Heritage Site, Fatehpur Sikri is recognized for its outstanding cultural importance and the way it represents a crucial phase in Mughal history. The city\'s remarkably preserved state offers modern visitors and scholars a unique window into the past, allowing for detailed study of Mughal court life, governance, and artistic expression.',
      ticketPrice: 40
    },
    'itimad-ud-daulah': {
      id: 'itimad-ud-daulah',
      name: 'Itimad-ud-daulah',
      city: 'Agra',
      image: '/desktop/images/itimaddaulah.jpg',
      fallbackImage: '/images/itimad-ud-daulah.jpg',
      description: 'Often called the "Baby Taj," Itimad-ud-daulah\'s Tomb is a Mughal mausoleum in the city of Agra, known for its intricate marble work.',
      history: 'Itimad-ud-daulah\'s Tomb was built between 1622 and 1628 by Nur Jahan, the wife of Emperor Jahangir, for her father Mirza Ghiyas Beg, who had been given the title of Itimad-ud-daulah (Pillar of the State). Mirza Ghiyas Beg was a Persian nobleman who served as the chief treasurer and later Prime Minister (Wazir) in the Mughal court. The tomb represents a significant transition in Mughal architecture, as it was the first structure to make extensive use of white marble and pietra dura (stone inlay work), techniques that would later be used in the Taj Mahal. Before this, most Mughal buildings were primarily constructed using red sandstone. The tomb stands in a garden (char bagh) layout with water channels and pathways dividing it into four sections, symbolizing the Islamic paradise. The mausoleum itself is positioned on a platform in the center of the garden, measuring 23 meters square and 8 meters high. The tomb houses the remains of Itimad-ud-daulah and his wife, as well as other family members. The building was restored in the early 20th century by the Archaeological Survey of India and continues to be maintained as an important historical monument.',
      significance: 'Itimad-ud-daulah\'s Tomb represents a pivotal moment in the evolution of Mughal architecture, marking the transition from the primarily red sandstone constructions of Akbar\'s era to the white marble buildings associated with Shah Jahan\'s time. It is often considered a draft for the Taj Mahal, which was built a decade later, and has earned the nickname "Baby Taj" for its similar aesthetic qualities and architectural features. The tomb introduced several innovative design elements to Mughal architecture in India, particularly the extensive use of pietra dura (stone inlay work), which would become a hallmark of later Mughal buildings. The structure is one of the finest examples of Persian influence on Mughal architecture, reflecting the Persian origins of both Mirza Ghiyas Beg and his daughter Nur Jahan. As the first Mughal tomb built entirely in marble for a non-royal, the monument represents the elevated status that Itimad-ud-daulah achieved in the Mughal court, as well as the political influence of his daughter, Empress Nur Jahan. The delicate marble screens (jalis), intricate inlay work, and fine calligraphy showcase the superior craftsmanship of the period and the patronage of arts under the Mughals. The char bagh garden layout, with its quadrilateral design divided by water channels, represents the Islamic concept of paradise and demonstrates continuity with earlier Mughal tomb gardens while prefiguring the more elaborate designs to come.',
      ticketPrice: 30
    },
    'amber-fort': {
      id: 'amber-fort',
      name: 'Amber Fort',
      city: 'Jaipur',
      image: '/desktop/images/amberfort.jpg', 
      fallbackImage: '/images/amber-fort.jpg',
      description: 'Amber Fort (also known as Amer Fort) is a majestic fort overlooking Maota Lake in Jaipur, known for its artistic Hindu style elements.',
      history: 'Amber Fort was built by Raja Man Singh I, one of Emperor Akbar\'s most trusted generals, in 1592 and expanded by successive rulers until the 18th century. The fort\'s name derives from "Amba," the name of the goddess Durga. The fort complex sits on a high hill and was the original capital of the Rajputs before Jaipur city was established. The construction blends Hindu and Rajput elements with several impressive structures including the Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), Sheesh Mahal (Palace of Mirrors), and the Sukh Niwas (Hall of Pleasure). The fort was built using red sandstone and marble, featuring large ramparts, series of gates, and cobbled paths. The palace complex within is divided into four main sections, each with its own courtyard. The fort was further enhanced by Raja Jai Singh I and Sawai Jai Singh II in the 17th and early 18th centuries before the capital was shifted to the newly built Jaipur city in 1727. After India\'s independence, the fort was taken over by the Rajasthan government and has since been maintained as a major tourist attraction and an important historical monument.',
      significance: 'Amber Fort represents the pinnacle of Rajput architecture and military design, showcasing the artistic sensibilities and engineering prowess of the Rajput kingdoms. The fort\'s strategic position atop a high hill with views of Maota Lake demonstrates the Rajput understanding of defensive architecture and their ability to incorporate natural features into their fortifications. The fort complex exemplifies the sophisticated lifestyle of the Rajput royalty, with its luxurious palaces, gardens, temples, and public spaces illustrating their wealth and cultural refinements. The Sheesh Mahal (Palace of Mirrors) within the fort is a marvel of artistic ingenuity, designed so that a single candle flame would be reflected in thousands of embedded mirrors, illuminating the entire hall. The fort\'s architectural style represents a successful synthesis of Hindu and Mughal elements, reflecting the political and cultural exchanges between the Rajputs and the Mughals during this period. The intricate carvings, painted frescoes, and inlay work throughout the fort showcase the high level of craftsmanship achieved during the period and the Rajput patronage of arts. The fort\'s water harvesting and management systems demonstrate advanced engineering techniques that allowed for comfortable living in a semi-arid region. As a UNESCO World Heritage Site (as part of the "Hill Forts of Rajasthan"), Amber Fort is recognized for its outstanding universal value and as an excellent example of Rajput military architecture. Today, the fort stands as a symbol of Rajasthan\'s rich cultural heritage and a living monument to the glory of the Rajput era.',
      ticketPrice: 55
    },
    'city-palace': {
      id: 'city-palace',
      name: 'City Palace',
      city: 'Jaipur',
      image: '/desktop/images/citypalace.jpg',
      fallbackImage: '/images/city-palace.jpg',
      description: 'City Palace is a palace complex in Jaipur that was the seat of the Maharaja of Jaipur, combining Rajput and Mughal architectural styles.',
      history: 'City Palace was established in 1727 by Maharaja Sawai Jai Singh II, the ruler of Amber who founded the planned city of Jaipur. The palace complex was built progressively over time, with additions by various rulers continuing until the 20th century. The complex integrates Rajput architectural elements with Mughal and European influences, reflecting Jaipur\'s evolving cultural landscape. The palace was not only the residence of the royal family but also the center of art, culture, and administration for the kingdom of Jaipur. Major structures within the complex include the Chandra Mahal (a seven-story building with panoramic views), Mubarak Mahal (the welcome palace, now a textile museum), Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), and various temples and gardens. After India\'s independence in 1947 and the integration of Jaipur state into the Indian Union, the royal family continued to reside in a portion of the palace (part of Chandra Mahal). Since then, most of the complex has been converted into museums that showcase royal artifacts, textiles, armory, manuscripts, and paintings. The palace has been maintained and restored over the years to preserve its architectural and historical significance while making it accessible to the public.',
      significance: 'City Palace stands as a remarkable example of architectural synthesis, blending Rajput, Mughal, and European design elements to create a style that is uniquely associated with Jaipur. As the seat of the Maharajas of Jaipur, the palace was at the center of the region\'s political, cultural, and artistic developments for nearly 300 years, making it a repository of historical significance. The palace complex illustrates the sophisticated urban planning principles that guided the development of Jaipur, which was one of India\'s first planned cities and is recognized for its grid layout and architectural uniformity. The various museums within the palace house an extraordinary collection of textiles, manuscripts, paintings, and weapons that provide valuable insights into the royal lifestyle, artistic traditions, and military history of Rajasthan. The continued residence of the royal descendants in a portion of the palace represents the ongoing cultural legacy of the monarchy, even after the political transitions following India\'s independence. The palace\'s intricate decorations, including carved marble panels, floral wall paintings, mirror work, and glass mosaics, showcase the high level of craftsmanship achieved under royal patronage. The complex reflects the progressive attitudes of the rulers of Jaipur, who were known for embracing new ideas while maintaining their cultural traditions, as evidenced by the incorporation of various architectural styles. As one of Jaipur\'s most visited landmarks, City Palace plays a crucial role in the region\'s tourism economy and in preserving and promoting Rajasthan\'s cultural heritage. The palace continues to function as a cultural center, hosting various events, exhibitions, and ceremonies that maintain its relevance in contemporary Indian society.',
      ticketPrice: 45
    },
    'jantar-mantar': {
      id: 'jantar-mantar',
      name: 'Jantar Mantar',
      city: 'Jaipur',
      image: '/desktop/images/jantarmantar.jpg',
      fallbackImage: '/images/jantar-mantar.jpg',
      description: 'Jantar Mantar is an astronomical observation site built in the early 18th century, featuring architectural and scientific instruments.',
      history: 'Jantar Mantar was built by Maharaja Sawai Jai Singh II, the founder of Jaipur, between 1728 and 1734. The name "Jantar Mantar" derives from the Sanskrit words "yantra" (instrument) and "mantra" (formula). This observatory was one of five built by Jai Singh II across northern India (in Delhi, Jaipur, Ujjain, Mathura, and Varanasi), with the one in Jaipur being the largest and best preserved. Jai Singh II was a scholar king with keen interest in mathematics, architecture, and astronomy. He built these observatories after Emperor Muhammad Shah tasked him with revising the calendar and astronomical tables. Before constructing the stone instruments, Jai Singh II studied the works of Islamic astronomers and European astronomical tables, even sending scholars to Europe to study Western astronomical advances. The observatory contains 19 astronomical instruments or "yantras" made primarily of local stone and marble, each designed for specific astronomical measurements. These include the Samrat Yantra (a giant sundial), Jai Prakash Yantra (a hemispherical sundial), Ram Yantra (for measuring altitudes), and Rashivalaya Yantra (for tracking zodiac signs). After Jai Singh II\'s death in 1743, the observatory fell into disuse for many years. During the British Raj, some attempts at restoration were made, but comprehensive restoration only began after India\'s independence. In 1948, the observatory was declared a national monument, and in 2010, it was inscribed as a UNESCO World Heritage Site.',
      significance: 'Jantar Mantar represents one of the most significant achievements in pre-modern astronomical science, combining architectural innovation with mathematical precision to create instruments capable of measuring time, predicting eclipses, tracking star locations, and ascertaining celestial coordinates with remarkable accuracy. The observatory demonstrates the impressive scientific knowledge of 18th-century India and stands as a testament to Maharaja Jai Singh II\'s intellectual pursuits and his commitment to scientific advancement. As the largest and best-preserved historic observatory in India, the complex provides valuable insights into the historical development of astronomy in the subcontinent and the cross-cultural scientific exchanges that influenced its evolution. The massive scale of the instruments represents a unique approach to astronomical measurement—instead of increasing the precision of small instruments (as was being done in Europe with telescopes), Jai Singh II chose to build massive structures that reduced error through sheer size. The observatory\'s instruments showcase an impressive integration of astronomy, architecture, and art, with each instrument not only scientifically functional but also aesthetically striking in design. The complex reflects the importance of astronomy in Indian culture, where celestial observations were used not only for scientific purposes but also for timekeeping, calendar-making, and astrological predictions that influenced many aspects of daily life. As a UNESCO World Heritage Site, Jantar Mantar is recognized for its outstanding universal value and exceptional testimony to scientific, technical, and cultural traditions. The observatory continues to function as an educational site, demonstrating principles of astronomy and the movement of celestial bodies to modern visitors. The instruments remain reasonably accurate even today, with the Samrat Yantra (the giant sundial) capable of telling time to within 2 seconds.',
      ticketPrice: 40
    },
    // New Kolkata monuments
    'victoriamemorial': {
      id: 'victoriamemorial',
      name: 'Victoria Memorial',
      city: 'Kolkata',
      image: 'C:/Users/Aaditya yadav/Desktop/images/victoriamemorial.jpg',
      fallbackImage: '/images/home-hero.jpg',
      description: 'The Victoria Memorial is a large marble building in Kolkata, built between 1906 and 1921. It is dedicated to the memory of Queen Victoria.',
      history: 'The Victoria Memorial was built between 1906 and 1921 to commemorate Queen Victoria\'s 25-year reign in India. The monument was designed by British architect William Emerson in the Indo-Saracenic revivalist style, using white Makrana marble. The memorial was funded by Indian states, individuals of the British Raj and the British government in London. Lord Curzon, the Viceroy of India, conceived the idea after the death of Queen Victoria in 1901, laying the foundation stone in 1906. The building was opened to the public in 1921. The garden was designed by Lord Redesdale and Sir David Prain, covering 64 acres of land. The memorial features a 16 ft statue of the Queen, with bronze statues of Art, Architecture, Justice, and Charity surrounding the main statue.',
      significance: 'The Victoria Memorial stands as one of the most impressive examples of British colonial architecture in India, showcasing the Indo-Saracenic style that blends British, Mughal, Islamic, Venetian, and Egyptian architectural elements. As a museum, it houses one of the largest collections of colonial and post-colonial artifacts in India, with over 28,000 items including paintings, sculptures, arms, textiles, and rare books that provide valuable insights into the history of the region. The memorial serves as an important historical document, symbolizing the complex relationship between Britain and India during the colonial period.',
      ticketPrice: 30
    },
    'golkonda-fort': {
      id: 'golkonda-fort',
      name: 'Golkonda Fort',
      city: 'Kolkata',
      image: 'C:/Users/Aaditya yadav/Desktop/images/golcondafort.jpg',
      fallbackImage: '/images/home-hero.jpg',
      description: 'Golkonda Fort is a magnificent fortress located in Kolkata, known for its acoustic features, ingenious water supply system, and beautiful palaces.',
      history: 'Golkonda Fort was originally constructed in the 12th century as part of the Western Chalukya Empire but rose to prominence during the Kakatiya Dynasty in the 13th century. The fort was further strengthened during the 16th and 17th centuries under the Qutb Shahi dynasty, becoming the capital of their kingdom. The name "Golkonda" means "Shepherd\'s Hill" in Telugu, referring to a legend about a shepherd boy who discovered an idol on the hill. The fort complex expanded over time to include four distinct forts with a 10 km outer wall, 87 semicircular bastions, eight gateways, and four drawbridges.',
      significance: 'Golkonda Fort stands as one of the most impressive examples of military architecture in the Indian subcontinent, demonstrating advanced understanding of defensive structures, acoustics, and water management systems of its time. The fort is renowned for its remarkable acoustic design, where a handclap at the entrance dome can be heard clearly at the hilltop pavilion, almost one kilometer away—a feature that served as a warning system against intruders. The ingenious water supply system is a marvel of medieval engineering, featuring sophisticated methods of water collection, storage, and distribution.',
      ticketPrice: 35
    },
    'howrahbridge': {
      id: 'howrahbridge',
      name: 'Howrah Bridge',
      city: 'Kolkata',
      image: 'C:/Users/Aaditya yadav/Desktop/images/howrahbridge.jpg',
      fallbackImage: '/images/home-hero.jpg',
      description: 'Howrah Bridge is a cantilever bridge over the Hooghly River in Kolkata. It is one of the most iconic landmarks of the city and a symbol of Kolkata.',
      history: 'Howrah Bridge was commissioned in 1943, replacing a pontoon bridge constructed in 1874 at the same location. The bridge was needed to connect the city of Howrah to Kolkata across the Hooghly River. The bridge was originally named the New Howrah Bridge as it replaced the older pontoon bridge. In 1965, it was renamed Rabindra Setu after the great Bengali poet Rabindranath Tagore, the first Asian Nobel laureate, though it is still popularly known as Howrah Bridge.',
      significance: 'Howrah Bridge stands as one of the most iconic symbols of Kolkata and is often depicted in literature, art, films, and photographs representing the city. The engineering achievement of the bridge is remarkable—constructed entirely with rivets (approximately 2.6 million of them) rather than nuts and bolts, without any piers in the river, it exemplifies advanced cantilever construction techniques of the 1940s. The bridge plays a crucial role in the city\'s infrastructure and economy, carrying approximately 100,000 vehicles and more than 150,000 pedestrians daily.',
      ticketPrice: 0
    },
    'hussain-sagar': {
      id: 'hussain-sagar',
      name: 'Hussain Sagar',
      city: 'Kolkata',
      image: 'C:/Users/Aaditya yadav/Desktop/images/hussainsagar.jpg',
      fallbackImage: '/images/home-hero.jpg',
      description: 'Hussain Sagar is a heart-shaped lake in Kolkata known for its massive Buddha statue in the middle of the lake, and is a popular recreational spot.',
      history: 'Hussain Sagar was built in 1563 during the reign of Ibrahim Quli Qutb Shah, who was the fourth sultan of the Qutb Shahi dynasty of Golconda. The lake was named after Hussain Shah Wali, who helped design it. It was built to solve the water scarcity problem in the region and was the main source of water supply to Hyderabad before Osman Sagar and Himayat Sagar were built. The lake was excavated across a natural river valley by constructing a dam and was connected to water channels from the River Musi.',
      significance: 'Hussain Sagar is one of the largest man-made lakes in India, showcasing impressive 16th-century engineering and water management skills. The heart-shaped lake connects the twin cities of Hyderabad and Secunderabad, serving both as a physical link and a shared cultural heritage between the two urban centers. The monolithic Buddha statue in the middle of the lake is one of the tallest of its kind in the world and has become an iconic symbol of the region, representing religious tolerance and cultural diversity.',
      ticketPrice: 10
    },
    // Add more monuments here as needed
  }), []);

  // Combine all monuments data
  const allMonuments = useMemo(() => {
    return { ...monumentsData, ...additionalMonuments };
  }, [monumentsData, additionalMonuments]);

  // Find the monument using various approaches
  useEffect(() => {
    // Direct lookup
    let foundMonument = allMonuments[monumentId];

    // If not found directly, try normalizing the ID
    if (!foundMonument) {
      // Try to find the monument by comparing normalized IDs
      const normalizedId = monumentId.toLowerCase().replace(/\s+/g, '-');
      
      Object.keys(allMonuments).forEach(key => {
        const monument = allMonuments[key];
        // Check if monument name matches the ID
        const monumentNameNormalized = monument.name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
        if (monumentNameNormalized === normalizedId || monument.id === normalizedId) {
          foundMonument = monument;
        }
      });
    }

    // Use default if still not found
    if (!foundMonument) {
      foundMonument = {
        id: monumentId,
        name: 'Unknown Monument',
        city: 'Unknown City',
        image: '/images/home-hero.jpg',
        description: 'Information about this monument is not available.',
        history: 'No historical information available.',
        significance: 'No significance information available.',
        ticketPrice: 0
      };
      console.warn(`Monument not found for ID: ${monumentId}`);
    } else {
      console.log(`Found monument: ${foundMonument.name}`);
    }

    // Get the current monument's image from the MonumentImageUtil
    const mainImage = getMainImage(foundMonument.id);
    if (mainImage && mainImage !== '/images/home-hero.jpg') {
      foundMonument.image = mainImage;
    }

    setMonument(foundMonument);
  }, [monumentId, allMonuments]);

  // Return loading state if monument data is not yet available
  if (!monument) {
    return (
      <div className="monument-page">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading monument information...</p>
        </div>
      </div>
    );
  }

  // Process the image URL to ensure it's correct
  // Use the background image from navigation state if available, otherwise use the monument's image
  const heroImageUrl = getImageUrl(backgroundImage || monument.image);

  return (
    <div className="monument-page">
      {/* Hero Section with Background Image */}
      <div 
        className="monument-hero" 
        style={{ 
          backgroundImage: `url(${heroImageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="monument-hero-overlay">
          <div className="monument-hero-content">
            <h1 className="monument-hero-title">{monument.name}</h1>
            <p className="monument-hero-subtitle">{monument.city}, India</p>
          </div>
        </div>
      </div>

      <div className="monument-container">
        <div className="monument-content-wrapper">
          {/* Sidebar */}
          <div className="monument-sidebar">
            <div className="sidebar-container">
              <h3 className="sidebar-title">Explore {monument.name}</h3>
              <nav className="sidebar-nav">
                <Link 
                  to={`/monument/${monumentId}/artifacts`}
                  className="sidebar-link"
                >
                  Artifacts
                </Link>
                <Link 
                  to={`/monument/${monumentId}/geotagging`}
                  className="sidebar-link"
                >
                  Geotagging
                </Link>
                <Link 
                  to={`/monument/${monumentId}/excavations`}
                  className="sidebar-link"
                >
                  Excavations
                </Link>
                <Link 
                  to={`/monument/${monumentId}/events`}
                  className="sidebar-link"
                >
                  Events
                </Link>
                <Link 
                  to={`/monument/${monumentId}/guides`}
                  className="sidebar-link"
                >
                  Guides Available
                </Link>
                <Link 
                  to={`/monument/${monumentId}/tour-services`}
                  state={{ monument: monument }}
                  className="sidebar-link tour-services-link"
                >
                  Tour Services
                </Link>
                <Link 
                  to={`/monument/${monumentId}/book-ticket`}
                  className="sidebar-link book-ticket"
                >
                  Book Ticket
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="monument-main-content">
            {/* Monument Description Card */}
            <div className="content-card">
              <h2 className="content-card-title">About {monument.name}</h2>
              <p className="content-card-text">{monument.description}</p>
              <div className="info-grid">
                <div className="info-box">
                  <h3 className="info-box-title">Entry Fee</h3>
                  <p className="info-box-text">
                    {monument.ticketPrice === 0 
                      ? 'Free Entry' 
                      : `₹${monument.ticketPrice} per person`}
                  </p>
                </div>
                <div className="info-box">
                  <h3 className="info-box-title">Timings</h3>
                  <p className="info-box-text">9:00 AM - 5:00 PM, Open all days</p>
                </div>
              </div>
            </div>

            {/* History Card */}
            <div className="content-card">
              <h2 className="content-card-title">History</h2>
              <p className="content-card-text">{monument.history}</p>
            </div>

            {/* Significance Card */}
            <div className="content-card">
              <h2 className="content-card-title">Significance</h2>
              <p className="content-card-text">{monument.significance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monument;