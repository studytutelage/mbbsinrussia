import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('🌱 Seeding 5 Top Russian Medical Universities with Accurate Russian Coordinates...');

  const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const universities = [
    {
      name: 'Sechenov First Moscow State Medical University',
      uniqueId: 'RUS-SEC-001',
      city: 'Moscow',
      establishedYear: 1758,
      students: '19,000+',
      tuitionFee: '$7,500',
      globalRanking: 'Top 250 in Medicine (QS)',
      nationalRanking: '1',
      shortnote: 'Russia’s oldest and largest prestigious medical academy with centuries of clinical distinction.',
      aboutNote: 'Sechenov First Moscow State Medical University is the pioneer of medical education in Russia. It operates a massive clinical center with over 3,000 hospital beds, robotic surgery units, and extensive research institutes recognized worldwide by NMC, WHO, and ECFMG.',
      tuitionFeeAnnual: '$7,500',
      courseDuration: '6 Years (General Medicine)',
      mediumOfInstruction: 'English & Russian',
      eligibility: '12th Grade with PCB (50%+), NEET Qualified (for Indian students)',
      status: true,
      isFeatured: true,
      provinceId: 1, // Moscow
      cityId: 1, // Moscow
      instituteTypeId: 1, // Public / State
      latitude: 55.7303,
      longitude: 37.5750,
    },
    {
      name: 'Pirogov Russian National Research Medical University',
      uniqueId: 'RUS-PIR-002',
      city: 'Moscow',
      establishedYear: 1906,
      students: '12,000+',
      tuitionFee: '$7,000',
      globalRanking: 'Top 300 Globally',
      nationalRanking: '2',
      shortnote: 'Premier national research medical university known for advanced clinical clerkships and pediatrics.',
      aboutNote: 'Pirogov Russian National Research Medical University (RNRMU) is among the largest medical institutions in Europe. Renowned for its scientific excellence, modern simulation centers, and direct affiliations with major Moscow tertiary hospitals.',
      tuitionFeeAnnual: '$7,000',
      courseDuration: '6 Years',
      mediumOfInstruction: 'English & Russian',
      eligibility: '12th Grade with PCB (50%+), NEET Qualified',
      status: true,
      isFeatured: true,
      provinceId: 1, // Moscow
      cityId: 1, // Moscow
      instituteTypeId: 1, // Public / State
      latitude: 55.6496,
      longitude: 37.4988,
    },
    {
      name: 'Pavlov First Saint Petersburg State Medical University',
      uniqueId: 'RUS-PAV-003',
      city: 'Saint Petersburg',
      establishedYear: 1897,
      students: '11,000+',
      tuitionFee: '$6,500',
      globalRanking: 'Top 400 Globally',
      nationalRanking: '3',
      shortnote: 'Historic medical university in Russia’s cultural capital Saint Petersburg with extensive clinics.',
      aboutNote: 'Pavlov First Saint Petersburg State Medical University combines a rich imperial heritage with contemporary medical technology. It offers an internationally approved 6-year English-medium MBBS program with bedside patient rotations.',
      tuitionFeeAnnual: '$6,500',
      courseDuration: '6 Years',
      mediumOfInstruction: 'English & Russian',
      eligibility: '12th Grade with PCB (50%+), NEET Qualified',
      status: true,
      isFeatured: true,
      provinceId: 2, // Saint Petersburg
      cityId: 2, // Saint Petersburg
      instituteTypeId: 1, // Public / State
      latitude: 59.9675,
      longitude: 30.3184,
    },
    {
      name: 'Kazan Federal University Institute of Fundamental Medicine',
      uniqueId: 'RUS-KFU-004',
      city: 'Kazan',
      establishedYear: 1804,
      students: '50,000+',
      tuitionFee: '$5,800',
      globalRanking: 'Top 350 World Universities (QS)',
      nationalRanking: '4',
      shortnote: 'One of Russia’s oldest federal universities featuring high-tech biomedical simulation hospital centers.',
      aboutNote: 'Kazan Federal University Institute of Fundamental Medicine and Biology is a modern powerhouse of medical education. International students train in the university’s own 800-bed university clinic and state-of-the-art simulation medical center.',
      tuitionFeeAnnual: '$5,800',
      courseDuration: '6 Years',
      mediumOfInstruction: 'English & Russian',
      eligibility: '12th Grade with PCB (50%+), NEET Qualified',
      status: true,
      isFeatured: false,
      provinceId: 3, // Tatarstan
      cityId: 3, // Kazan
      instituteTypeId: 3, // Federal University
      latitude: 55.7903,
      longitude: 49.1221,
    },
    {
      name: 'Volgograd State Medical University',
      uniqueId: 'RUS-VOL-005',
      city: 'Volgograd',
      establishedYear: 1935,
      students: '10,000+',
      tuitionFee: '$4,800',
      globalRanking: 'Leading Regional Medical Institute',
      nationalRanking: '5',
      shortnote: 'Highly popular destination for Indian medical students with affordable fees and English-medium instruction.',
      aboutNote: 'Volgograd State Medical University has trained thousands of foreign doctors for over 50 years. Recognized by WHO, NMC, and UNESCO, it provides a warm international student community with on-campus Indian mess and facilities.',
      tuitionFeeAnnual: '$4,800',
      courseDuration: '6 Years',
      mediumOfInstruction: 'English & Russian',
      eligibility: '12th Grade with PCB (50%+), NEET Qualified',
      status: true,
      isFeatured: false,
      provinceId: 7, // Volgograd Oblast
      cityId: 7, // Volgograd
      instituteTypeId: 1, // Public / State
      latitude: 48.7071,
      longitude: 44.5169,
    },
  ];

  for (const u of universities) {
    const slug = slugify(u.name);

    const university = await prisma.university.upsert({
      where: { slug },
      update: {
        name: u.name,
        uniqueId: u.uniqueId,
        city: u.city,
        establishedYear: u.establishedYear,
        students: u.students,
        tuitionFee: u.tuitionFee,
        globalRanking: u.globalRanking,
        nationalRanking: u.nationalRanking,
        shortnote: u.shortnote,
        aboutNote: u.aboutNote,
        courseDuration: u.courseDuration,
        mediumOfInstruction: u.mediumOfInstruction,
        eligibility: u.eligibility,
        status: u.status,
        isFeatured: u.isFeatured,
        provinceId: u.provinceId,
        cityId: u.cityId,
        instituteTypeId: u.instituteTypeId,
        latitude: u.latitude,
        longitude: u.longitude,
      },
      create: {
        name: u.name,
        slug,
        uniqueId: u.uniqueId,
        city: u.city,
        establishedYear: u.establishedYear,
        students: u.students,
        tuitionFee: u.tuitionFee,
        globalRanking: u.globalRanking,
        nationalRanking: u.nationalRanking,
        shortnote: u.shortnote,
        aboutNote: u.aboutNote,
        courseDuration: u.courseDuration,
        mediumOfInstruction: u.mediumOfInstruction,
        eligibility: u.eligibility,
        status: u.status,
        isFeatured: u.isFeatured,
        provinceId: u.provinceId,
        cityId: u.cityId,
        instituteTypeId: u.instituteTypeId,
        latitude: u.latitude,
        longitude: u.longitude,
      },
    });

    console.log(`✅ Seeded University: ${university.name} (${u.city}) [${u.latitude}, ${u.longitude}]`);
  }

  console.log('🎉 5 Russian Universities with Real Coordinates seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding universities:', e);
    process.exit(1);
  });
