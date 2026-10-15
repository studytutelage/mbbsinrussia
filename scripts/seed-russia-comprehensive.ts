import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('🌱 Starting Comprehensive Russia Database Seeding...');

  // 1. Seed Institute Types
  const instituteTypes = ['Public / State', 'Private', 'Federal University'];
  for (const name of instituteTypes) {
    await prisma.instituteType.upsert({
      where: { id: instituteTypes.indexOf(name) + 1 },
      update: { name },
      create: { name },
    });
  }
  console.log('✅ Institute types seeded.');

  // 3. Seed Provinces / Federal Subjects of Russia
  const provinces = [
    'Moscow',
    'Saint Petersburg',
    'Tatarstan Republic',
    'Bashkortostan Republic',
    'Novosibirsk Oblast',
    'Sverdlovsk Oblast',
    'Volgograd Oblast',
    'Rostov Oblast',
    'Saratov Oblast',
    'Krasnoyarsk Krai',
  ];

  for (const name of provinces) {
    await prisma.province.upsert({
      where: { id: provinces.indexOf(name) + 1 },
      update: { name },
      create: { name },
    });
  }
  console.log('✅ Provinces seeded.');

  // 4. Seed Cities
  const cities = [
    { name: 'Moscow', provinceId: 1 },
    { name: 'Saint Petersburg', provinceId: 2 },
    { name: 'Kazan', provinceId: 3 },
    { name: 'Ufa', provinceId: 4 },
    { name: 'Novosibirsk', provinceId: 5 },
    { name: 'Yekaterinburg', provinceId: 6 },
    { name: 'Volgograd', provinceId: 7 },
    { name: 'Rostov-on-Don', provinceId: 8 },
    { name: 'Saratov', provinceId: 9 },
    { name: 'Krasnoyarsk', provinceId: 10 },
  ];

  for (const [index, city] of cities.entries()) {
    await prisma.city.upsert({
      where: { id: index + 1 },
      update: { name: city.name, provinceId: city.provinceId },
      create: { name: city.name, provinceId: city.provinceId },
    });
  }
  console.log('✅ Cities seeded.');

  // 5. Seed About Country Page
  const aboutRussia = await prisma.aboutCountryPage.upsert({
    where: { id: 1 },
    update: {
      name: 'Russia',
      tagline: 'World-Class Medical Education at Affordable Costs in Russia',
      capital: 'Moscow',
      population: '144 Million+',
      languages: 'Russian, English',
      currency: 'RUB',
      location: 'Eastern Europe & Northern Asia',
      timezone: 'UTC+3 (MSK)',
      independenceDay: new Date('1990-06-12'),
      highestPeak: 'Mount Elbrus',
      highestPeakHeight: '5,642 m',
      whoRecognized: true,
      mbbsAffordableEducation: 'World-renowned medical training, subsidized tuition fees starting from $3,500/year, and NMC/WHO recognized medical degrees.',
      englishMedium: true,
      academicExcellence: 'Russia boasts prestigious state and federal medical universities equipped with modern simulation hospitals and centuries of academic prestige.',
      studentLife: 'Safe, welcoming, and culturally rich student environment with modern university hostels, Indian mess options, and active campus communities.',
      visaConnectivity: 'Official Russian student visa issued via Ministry invitation letter, with direct flight connectivity from major Indian metros.',
      publicHealthcare: 'Comprehensive student medical insurance (VMS) providing access to high-standard clinical care and university hospitals.',
      tourismGrowth: 'Rich imperial architecture, Red Square, Lake Baikal, Caucasus mountains, and famous cultural theaters.',
    },
    create: {
      id: 1,
      name: 'Russia',
      tagline: 'World-Class Medical Education at Affordable Costs in Russia',
      capital: 'Moscow',
      population: '144 Million+',
      languages: 'Russian, English',
      currency: 'RUB',
      location: 'Eastern Europe & Northern Asia',
      timezone: 'UTC+3 (MSK)',
      independenceDay: new Date('1990-06-12'),
      highestPeak: 'Mount Elbrus',
      highestPeakHeight: '5,642 m',
      whoRecognized: true,
      mbbsAffordableEducation: 'World-renowned medical training, subsidized tuition fees starting from $3,500/year, and NMC/WHO recognized medical degrees.',
      englishMedium: true,
      academicExcellence: 'Russia boasts prestigious state and federal medical universities equipped with modern simulation hospitals and centuries of academic prestige.',
      studentLife: 'Safe, welcoming, and culturally rich student environment with modern university hostels, Indian mess options, and active campus communities.',
      visaConnectivity: 'Official Russian student visa issued via Ministry invitation letter, with direct flight connectivity from major Indian metros.',
      publicHealthcare: 'Comprehensive student medical insurance (VMS) providing access to high-standard clinical care and university hospitals.',
      tourismGrowth: 'Rich imperial architecture, Red Square, Lake Baikal, Caucasus mountains, and famous cultural theaters.',
    },
  });

  // Seed Major Cities in About Country
  const majorCitiesAbout = [
    { cityName: 'Moscow', description: 'The bustling capital and premier medical hub featuring Sechenov, Pirogov, and world-class tertiary clinical centers.', population: '13 Million+' },
    { cityName: 'Saint Petersburg', description: 'Russia’s cultural capital and historic medical education center, home to Pavlov First Medical University.', population: '5.6 Million+' },
    { cityName: 'Kazan', description: 'Russia’s major educational and scientific hub featuring Kazan Federal University and state-of-the-art simulation facilities.', population: '1.3 Million+' },
  ];

  for (const city of majorCitiesAbout) {
    await prisma.countryMajorCity.upsert({
      where: { id: majorCitiesAbout.indexOf(city) + 1 },
      update: { ...city, pageId: aboutRussia.id },
      create: { ...city, pageId: aboutRussia.id },
    });
  }

  // Seed Cuisines
  const cuisines = [
    { dishName: 'Borscht', dishDescription: 'Nutritious traditional beetroot soup served hot with sour cream (smetana) and fresh herbs.' },
    { dishName: 'Pelmeni', dishDescription: 'Delicious handmade dumplings filled with minced meat or vegetables, seasoned with black pepper.' },
    { dishName: 'Blini', dishDescription: 'Traditional thin golden crepes served with honey, berries, butter, or cottage cheese.' },
  ];

  for (const cuisine of cuisines) {
    await prisma.countryCuisineLifestyle.upsert({
      where: { id: cuisines.indexOf(cuisine) + 1 },
      update: { ...cuisine, pageId: aboutRussia.id },
      create: { ...cuisine, pageId: aboutRussia.id },
    });
  }

  // Seed Attractions
  const attractions = [
    { attractionName: 'Red Square & Moscow Kremlin', description: 'The historic and political heart of Moscow and Russia, featuring iconic architecture.' },
    { attractionName: 'The State Hermitage Museum', description: 'World-famous museum of art and culture located in the Winter Palace in Saint Petersburg.' },
    { attractionName: 'Lake Baikal & Siberia', description: 'UNESCO World Natural Heritage site and the oldest and deepest freshwater lake on Earth.' },
  ];

  for (const attraction of attractions) {
    await prisma.countryTouristAttraction.upsert({
      where: { id: attractions.indexOf(attraction) + 1 },
      update: { ...attraction, pageId: aboutRussia.id },
      create: { ...attraction, pageId: aboutRussia.id },
    });
  }

  // Seed Lifestyles/Culture
  const lifestyles = [
    { title: 'Safe & Welcoming Campuses', description: '24/7 security in university hostels, safe public transit, and a supportive international student ecosystem.' },
    { title: 'Historic Academic Legacy', description: 'Nobel-prize-winning medical research, vast academic libraries, and state-of-the-art hospital laboratories.' },
    { title: 'Vibrant Indian Student Community', description: 'Over 20,000 Indian medical students studying across Russia with active Indian mess and Diwali/Holi celebrations.' },
  ];

  for (const lifestyle of lifestyles) {
    await prisma.countryLifestyleCulture.upsert({
      where: { id: lifestyles.indexOf(lifestyle) + 1 },
      update: { ...lifestyle, pageId: aboutRussia.id },
      create: { ...lifestyle, pageId: aboutRussia.id },
    });
  }
  console.log('✅ About Russia content seeded.');

  // 6. Seed Education System
  const eduSystem = await prisma.educationSystem.upsert({
    where: { id: 1 },
    update: {
      title: 'Education System in Russia',
      description: 'The Russian medical education framework follows rigorous European and international standards aligned with WHO, NMC, and global medical licensing councils.',
      introductionTitle: 'Centuries of Excellence in Medical Training',
      introductionDescription: 'Russia provides world-class medical higher education with extensive practical clinical rotations, state-of-the-art simulation centers, and globally recognized MD/MBBS qualifications.',
      literacyRate: 99.7,
      higherEducationDescription: 'The medical education sector includes prestigious federal and state medical universities offering 100% English-medium General Medicine programs.',
      universitiesCount: 60,
      universitiesNote: 'Including 60+ accredited medical universities and hundreds of affiliated clinical teaching hospitals.',
      officialLanguage: 'Russian',
      officialLanguageNote: 'Primary language of the country, with complete 6-year English-medium medical tracks for international students.',
      foreignLanguage: 'English',
      foreignLanguageNote: 'Standard medium of instruction for international MBBS students and scientific research papers.',
    },
    create: {
      id: 1,
      title: 'Education System in Russia',
      description: 'The Russian medical education framework follows rigorous European and international standards aligned with WHO, NMC, and global medical licensing councils.',
      introductionTitle: 'Centuries of Excellence in Medical Training',
      introductionDescription: 'Russia provides world-class medical higher education with extensive practical clinical rotations, state-of-the-art simulation centers, and globally recognized MD/MBBS qualifications.',
      literacyRate: 99.7,
      higherEducationDescription: 'The medical education sector includes prestigious federal and state medical universities offering 100% English-medium General Medicine programs.',
      universitiesCount: 60,
      universitiesNote: 'Including 60+ accredited medical universities and hundreds of affiliated clinical teaching hospitals.',
      officialLanguage: 'Russian',
      officialLanguageNote: 'Primary language of the country, with complete 6-year English-medium medical tracks for international students.',
      foreignLanguage: 'English',
      foreignLanguageNote: 'Standard medium of instruction for international MBBS students and scientific research papers.',
    },
  });

  // Seed School Levels
  const schoolLevels = [
    { level: 'Pre-clinical Medical Sciences', ageRange: '17-20', durationYears: 3, title: 'Anatomy, Physiology, Biochemistry, Histology & Pathology' },
    { level: 'Clinical Medicine & Clerkship', ageRange: '20-23', durationYears: 3, title: 'Internal Medicine, Surgery, Pediatrics, Obstetrics & Gynecology' },
    { level: 'Clinical Internship / Residency (Ordinatura)', ageRange: '23+', durationYears: 2, title: 'Specialized Hospital-based Residency & Licensure Preparation' },
  ];

  for (const level of schoolLevels) {
    await prisma.educationSchoolLevel.upsert({
      where: { id: schoolLevels.indexOf(level) + 1 },
      update: { ...level, pageId: eduSystem.id },
      create: { ...level, pageId: eduSystem.id },
    });
  }

  // Seed Degrees
  const degrees = [
    { degree: 'MD / MBBS General Medicine (Lechebnoe Delo)', duration: '6 Years', recognition: 'Recognized by NMC (India), WHO (WDOMS), ECFMG (USA), and GMC (UK)' },
    { degree: 'Doctor of Dental Medicine (Stomatology)', duration: '5 Years', recognition: 'Global Dental Council Accreditation' },
    { degree: 'Pharmacy & Clinical Pharmacology', duration: '5 Years', recognition: 'Recognized Pharmaceutical Degree' },
  ];

  for (const deg of degrees) {
    await prisma.educationDegree.upsert({
      where: { id: degrees.indexOf(deg) + 1 },
      update: { ...deg, pageId: eduSystem.id },
      create: { ...deg, pageId: eduSystem.id },
    });
  }

  // Seed Popular Fields
  const fields = [
    { field: 'General Medicine (MBBS / MD)', description: 'Core 6-year medical program with direct hospital bedside rotations and clinical training.', durationYears: '6 Years', numberOfInstitutions: '60+ Medical Universities' },
    { field: 'Surgery & Specialized Therapeutics', description: 'Advanced surgical rotations in multi-specialty trauma, cardiovascular, and neurosurgery centers.', durationYears: 'Specialization Track', numberOfInstitutions: 'Top Clinical Hospitals' },
    { field: 'Pediatrics & Preventative Care', description: 'Specialized clinical tracks focusing on child healthcare, immunology, and infectious disease management.', durationYears: '6 Years', numberOfInstitutions: 'State Medical Academies' },
  ];

  for (const field of fields) {
    await prisma.educationPopularField.upsert({
      where: { id: fields.indexOf(field) + 1 },
      update: { ...field, pageId: eduSystem.id },
      create: { ...field, pageId: eduSystem.id },
    });
  }

  console.log('✅ Education system content seeded.');
  console.log('🎉 Comprehensive Russia Seeding Finished Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  });
