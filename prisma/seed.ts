import {
  ApplicationStatus,
  CountryDocType,
  LeadStatus,
  NeetStatus,
  UserRole,
} from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import * as bcrypt from "bcryptjs";

const SHOULD_SEED_SAMPLE_LEADS =
  (process.env.SEED_SAMPLE_LEADS || "false").toLowerCase() === "true";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function upsertByWhere(
  delegate: any,
  where: Record<string, unknown>,
  data: Record<string, unknown>,
) {
  const existing = await delegate.findFirst({ where });
  if (existing) {
    return delegate.update({ where: { id: existing.id }, data });
  }
  return delegate.create({ data });
}

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined");
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.upsert({
    where: { email },
    update: { name: "Super Admin", role: UserRole.admin, password: hashedPassword, designation: "Administrator", description: "Platform administrator for MBBS in Russia.", status: true },
    create: { name: "Super Admin", email, role: UserRole.admin, password: hashedPassword, designation: "Administrator", description: "Platform administrator for MBBS in Russia.", status: true },
  });
}

async function seedWebsiteSettings() {
  const settings = [
    { key: "site_name", value: "MBBS in Russia", type: "text", group: "general" },
    { key: "support_email", value: "admissions@mbbsinrussia.com", type: "text", group: "contact" },
    { key: "support_phone", value: "+91-11-2410-2161", type: "text", group: "contact" },
    { key: "stats_total_students", value: "5000+", type: "text", group: "stats" },
    { key: "stats_total_universities", value: "15+", type: "text", group: "stats" },
    { key: "stats_total_scholarships", value: "30+", type: "text", group: "stats" },
    { key: "stats_annual_aid", value: "$2.5M+", type: "text", group: "stats" },
    { key: "stats_admission_support", value: "100%", type: "text", group: "stats" },
    { key: "stats_merit_label", value: "Merit", type: "text", group: "stats" },
    { key: "stats_verified_label", value: "NMC / WHO", type: "text", group: "stats" },
  ];
  for (const item of settings) {
    await prisma.websiteSetting.upsert({ where: { key: item.key }, update: item, create: item });
  }
}
async function seedReferenceData() {
  for (const name of ["Public / State", "Private", "Federal University"]) {
    await upsertByWhere(prisma.instituteType, { name }, { name, status: true });
  }
  const provinceNames = [
    "Moscow", "Saint Petersburg", "Tatarstan Republic", "Bashkortostan Republic",
    "Novosibirsk Oblast", "Sverdlovsk Oblast", "Volgograd Oblast",
    "Rostov Oblast", "Saratov Oblast", "Krasnoyarsk Krai",
  ];
  const provinceIds = new Map<string, number>();
  for (const name of provinceNames) {
    const p = await upsertByWhere(prisma.province, { name }, { name, status: true });
    provinceIds.set(name, p.id);
  }
  const cities = [
    { name: "Moscow", province: "Moscow" },
    { name: "Saint Petersburg", province: "Saint Petersburg" },
    { name: "Kazan", province: "Tatarstan Republic" },
    { name: "Ufa", province: "Bashkortostan Republic" },
    { name: "Novosibirsk", province: "Novosibirsk Oblast" },
    { name: "Yekaterinburg", province: "Sverdlovsk Oblast" },
    { name: "Volgograd", province: "Volgograd Oblast" },
    { name: "Rostov-on-Don", province: "Rostov Oblast" },
    { name: "Saratov", province: "Saratov Oblast" },
    { name: "Krasnoyarsk", province: "Krasnoyarsk Krai" },
  ];
  for (const item of cities) {
    const provinceId = provinceIds.get(item.province);
    if (!provinceId) continue;
    await upsertByWhere(prisma.city, { name: item.name, provinceId }, { name: item.name, provinceId, status: true });
  }
  for (const item of [
    { name: "Undergraduate", slug: "undergraduate", description: "Bachelor-level programs including MBBS / MD.", status: true },
    { name: "Postgraduate", slug: "postgraduate", description: "Advanced clinical and research pathways.", status: true },
  ]) {
    await prisma.level.upsert({ where: { slug: item.slug }, update: item, create: item });
  }
  for (const name of ["Indian Mess", "Multicultural Food Court", "24x7 Campus Security", "Simulation Labs", "On-campus Hostel"]) {
    await upsertByWhere(prisma.facility, { name }, { name, status: true });
  }
  const hospitals = [
    { name: "Sechenov First Moscow State Medical University Hospital", city: "Moscow", beds: 2500 },
    { name: "Pirogov Russian National Research Medical University Hospital", city: "Moscow", beds: 1800 },
    { name: "Pavlov First Saint Petersburg State Medical University Hospital", city: "Saint Petersburg", beds: 2100 },
    { name: "Kazan State Medical University Hospital", city: "Kazan", beds: 1200 },
    { name: "Bashkir State Medical University Hospital", city: "Ufa", beds: 900 },
    { name: "Volgograd State Medical University Hospital", city: "Volgograd", beds: 1000 },
  ];
  for (const item of hospitals) {
    const slug = slugify(item.name);
    await prisma.hospital.upsert({
      where: { slug },
      update: { ...item, slug, state: "Russia", status: true },
      create: { ...item, slug, state: "Russia", status: true },
    });
  }
  for (const studyMode of ["Full-time", "On-campus", "English Medium"]) {
    await upsertByWhere(prisma.studyMode, { studyMode }, { studyMode });
  }
}

async function seedCountryAndEducationPages() {
  const data = {
    name: "Russia",
    tagline: "World-Class Medical Education at Affordable Costs in Eastern Europe",
    capital: "Moscow",
    population: "144 Million+",
    languages: "Russian, English (Academic)",
    currency: "RUB",
    location: "Eastern Europe and Northern Asia",
    timezone: "UTC+3 (Moscow Time)",
    independenceDay: new Date("1991-06-12"),
    highestPeak: "Mount Elbrus",
    highestPeakHeight: "5,642 m",
    whoRecognized: true,
    englishMedium: true,
    mbbsAffordableEducation: "Russia offers one of the most affordable MBBS programs globally with NMC-recognized degrees and world-class university infrastructure.",
    academicExcellence: "Russian medical universities follow a rigorous 6-year MD/MBBS curriculum with strong pre-clinical, simulation, and hospital clinical training.",
    studentLife: "Students enjoy a rich cultural experience with safe campuses, Indian communities, affordable living, and dedicated peer support.",
    visaConnectivity: "Straightforward student visa process with dedicated international advisory support and Russian embassy coordination.",
    publicHealthcare: "Russia has a well-developed public healthcare system (CHI) offering comprehensive medical services for residents and students.",
    privateHealthcare: "Top-tier private hospitals and research institutes with advanced equipment and experienced medical specialists.",
    studentHealthcare: "On-campus health centers, insurance coverage, and student health programs at all major Russian universities.",
    tourismGrowth: "Russia is a culturally rich destination with Moscow, St. Petersburg, Trans-Siberian Railway, Lake Baikal, and UNESCO heritage sites.",
    bannerImage: "/uploads/about-country/russia-banner.jpg",
  };
  const aboutCountry = await prisma.aboutCountryPage.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } });

  for (const item of [
    { cityName: "Moscow", description: "Russia premier medical hub with top federal universities Sechenov and Pirogov RNRMU.", population: "12.5 Million+" },
    { cityName: "Saint Petersburg", description: "Cultural capital with world-renowned Pavlov First State Medical University.", population: "5.4 Million+" },
    { cityName: "Kazan", description: "Multicultural university city famous for Kazan State Medical University.", population: "1.3 Million+" },
    { cityName: "Volgograd", description: "Home to Volgograd State Medical University, popular among Indian MBBS students.", population: "1.0 Million+" },
  ]) {
    await upsertByWhere(prisma.countryMajorCity, { pageId: aboutCountry.id, cityName: item.cityName }, { ...item, pageId: aboutCountry.id });
  }

  for (const item of [
    { dishName: "Borscht", dishDescription: "Traditional Russian beetroot soup, rich in vitamins.", dishImage: "/uploads/about-country/borscht.jpg" },
    { dishName: "Pelmeni", dishDescription: "Classic Russian meat-filled dumplings, popular as a wholesome student meal.", dishImage: "/uploads/about-country/pelmeni.jpg" },
    { dishName: "Blini", dishDescription: "Thin Russian pancakes served with sour cream or honey.", dishImage: "/uploads/about-country/blini.jpg" },
  ]) {
    await upsertByWhere(prisma.countryCuisineLifestyle, { pageId: aboutCountry.id, dishName: item.dishName }, { ...item, pageId: aboutCountry.id });
  }

  for (const item of [
    { title: "Safe University Campuses", description: "Russian universities provide secure hostels with 24x7 security and Indian mess facilities." },
    { title: "Rich Cultural Environment", description: "Students enjoy world-class museums, performing arts, historical monuments, and vibrant student communities." },
    { title: "Affordable Cost of Living", description: "Monthly living expenses for Indian students range from Rs.10,000-15,000, making Russia one of the most affordable MBBS destinations." },
  ]) {
    await upsertByWhere(prisma.countryLifestyleCulture, { pageId: aboutCountry.id, title: item.title }, { ...item, pageId: aboutCountry.id });
  }

  for (const item of [
    { attractionName: "Red Square and Kremlin", description: "UNESCO World Heritage Site and the iconic heart of Moscow.", ordering: 1, isActive: true },
    { attractionName: "Saint Petersburg City Tour", description: "Known as Russia Venice with canals, palaces, and the Hermitage Museum.", ordering: 2, isActive: true },
    { attractionName: "Trans-Siberian Railway", description: "The world longest railway journey crossing 9 time zones.", ordering: 3, isActive: true },
    { attractionName: "Lake Baikal", description: "The world deepest freshwater lake and a UNESCO World Heritage Site in Siberia.", ordering: 4, isActive: true },
  ]) {
    await upsertByWhere(prisma.countryTouristAttraction, { pageId: aboutCountry.id, attractionName: item.attractionName }, { ...item, pageId: aboutCountry.id });
  }

  const edData = {
    title: "Education System in Russia",
    description: "Russia follows a structured 6-year MD/MBBS program combining strong pre-clinical foundations with extensive clinical rotations.",
    introductionTitle: "A Globally Recognized Medical Education Framework",
    introductionDescription: "Russian medical universities are recognized by WHO, NMC India, and other global bodies.",
    literacyRate: 99.7,
    officialLanguage: "Russian",
    officialLanguagePercentage: 100,
    officialLanguageNote: "National language with English-medium MBBS tracks for international students",
    foreignLanguage: "English",
    foreignLanguagePercentage: 75,
    foreignLanguageNote: "Used in international MBBS tracks, medical journals, and global conferences",
    universitiesCount: 60,
    universitiesNote: "NMC-recognized federal and regional medical universities",
    higherEducationDescription: "Russia has 60+ NMC-recognized medical universities offering MD/MBBS degrees globally acknowledged for quality and affordability.",
  };
  const educationSystem = await prisma.educationSystem.upsert({ where: { id: 1 }, update: edData, create: { id: 1, ...edData } });

  for (const item of [
    { examName: "USE (Unified State Exam)", gradeLevel: "Grade 11", type: "National", subjects: "Biology; Chemistry; Russian; Mathematics" },
    { examName: "NEET", gradeLevel: "Grade 12", type: "India - Mandatory", subjects: "Physics; Chemistry; Biology" },
  ]) {
    await upsertByWhere(prisma.educationExamination, { pageId: educationSystem.id, examName: item.examName }, { ...item, pageId: educationSystem.id });
  }

  for (const item of [
    { level: "Primary", ageRange: "6-10", durationYears: 4, isCompulsory: true, title: "Primary School" },
    { level: "Secondary", ageRange: "10-17", durationYears: 7, isCompulsory: true, title: "Basic General and Secondary School" },
    { level: "Tertiary", ageRange: "17+", durationYears: 6, isCompulsory: false, title: "Medical University MD/MBBS" },
  ]) {
    await upsertByWhere(prisma.educationSchoolLevel, { pageId: educationSystem.id, level: item.level }, { ...item, pageId: educationSystem.id });
  }

  for (const item of [
    { degree: "MD / MBBS (General Medicine)", duration: "6 Years", recognition: "WHO, NMC India, ECFMG recognized" },
    { degree: "Pediatrics", duration: "6 Years", recognition: "Specialized medical degree" },
    { degree: "Dentistry (BDS)", duration: "5 Years", recognition: "Globally recognized dental program" },
  ]) {
    await upsertByWhere(prisma.educationDegree, { pageId: educationSystem.id, degree: item.degree }, { ...item, pageId: educationSystem.id });
  }

  for (const item of [
    { field: "General Medicine (MD/MBBS)", description: "The most popular track for Indian MBBS aspirants in Russia.", numberOfInstitutions: "60+", durationYears: "6" },
    { field: "Pediatrics", description: "Specialized track focusing on child healthcare and development.", numberOfInstitutions: "20+", durationYears: "6" },
    { field: "Dentistry", description: "Growing dental education options at affordable costs.", numberOfInstitutions: "15+", durationYears: "5" },
  ]) {
    await upsertByWhere(prisma.educationPopularField, { pageId: educationSystem.id, field: item.field }, { ...item, pageId: educationSystem.id });
  }

  const auData = {
    heroTitle: "Your Trusted MBBS in Russia Advisory Team",
    heroDescription: "We guide students from profile assessment to admission, visa, and pre-departure support for Russia.",
    partnerUniversities: 15, studentsPlaced: 5000, channelPartners: 50, yearsExperience: 12,
    mission: "Ethical and transparent MBBS counseling for students and parents seeking education in Russia.",
    vision: "To be the most trusted Russia MBBS admission support platform for Indian students.",
    contact1: "+91-11-2410-2161", contact2: "+7-495-123-4567",
    email1: "admissions@mbbsinrussia.com", email2: "support@mbbsinrussia.com",
    address: "New Delhi, India and Moscow, Russia",
  };
  await prisma.aboutUs.upsert({ where: { id: 1 }, update: auData, create: { id: 1, ...auData } });

  await upsertByWhere(prisma.educationSystemPage, { title: "MBBS Curriculum Overview" }, {
    title: "MBBS Curriculum Overview", subtitle: "Pre-clinical to internship progression",
    description: "A structured 6-year progression from foundation sciences to full clinical rotations in Russian teaching hospitals.",
    highlights: ["Anatomy", "Physiology", "Pathology", "Pharmacology", "Clinical postings", "Internship"],
    position: 1, status: true,
  });
}

async function seedContentAndMisc(adminId: number) {
  for (const item of [
    { page: "home", metaTitle: "Study MBBS in Russia 2026 | NMC Approved Universities", metaDescription: "Admission guidance, fee insights, and university comparison for MBBS in Russia." },
    { page: "about-us", metaTitle: "About MBBS in Russia Team | Expert Counselors", metaDescription: "Meet the counselors and operations team supporting students for MBBS in Russia." },
    { page: "about-russia", metaTitle: "About Russia for Indian MBBS Students", metaDescription: "Understand lifestyle, safety, culture, and healthcare ecosystem in Russia." },
    { page: "education-system", metaTitle: "Education System in Russia | MBBS Degree Structure", metaDescription: "Academic structure, 6-year MBBS curriculum, and clinical training overview in Russia." },
    { page: "universities", metaTitle: "NMC Approved Medical Universities in Russia 2026", metaDescription: "Compare colleges, tuition fees, and support facilities for MBBS in Russia." },
    { page: "blog", metaTitle: "MBBS Russia Blog | Guides for Indian Students", metaDescription: "Expert guides for MBBS admission, student visa Russia, and student life." },
    { page: "news", metaTitle: "MBBS Russia News | Latest Education Updates", metaDescription: "Latest education and policy updates for Indian MBBS aspirants going to Russia." },
    { page: "articles", metaTitle: "MBBS Russia Articles | In-depth Planning Guides", metaDescription: "Long-form practical planning guides for studying MBBS in Russia." },
    { page: "contact-us", metaTitle: "Contact MBBS Russia Advisors | Free Counseling", metaDescription: "Book free counseling with our India and Russia-based admission teams." },
    { page: "scholarships", metaTitle: "MBBS Scholarships in Russia 2026 | Merit Aid", metaDescription: "Merit and tuition support scholarship opportunities for MBBS in Russia." },
  ]) {
    await prisma.staticPageSeo.upsert({ where: { page: item.page }, update: { ...item, status: true, ogImagePath: "/og-default.jpg" }, create: { ...item, status: true, ogImagePath: "/og-default.jpg" } });
  }

  for (const item of ["universities/[slug]", "blog/[categorySlug]/[blogSlug]", "news/[categorySlug]/[slug]", "articles/[categorySlug]/[slug]", "scholarships/[slug]"]) {
    await prisma.dynamicPageSeo.upsert({ where: { page: item }, update: { page: item, metaTitle: "MBBS in Russia", metaDescription: "Dynamic page SEO for Russia MBBS content.", status: true }, create: { page: item, metaTitle: "MBBS in Russia", metaDescription: "Dynamic page SEO for Russia MBBS content.", status: true } });
  }

  await upsertByWhere(prisma.defaultOgImage, { name: "Russia Default OG" }, { name: "Russia Default OG", imageName: "og-default.jpg", imagePath: "/og-default.jpg", status: true });

  const faqCat = await prisma.faqCategory.upsert({ where: { slug: "homepage" }, update: { name: "Homepage", slug: "homepage", status: true }, create: { name: "Homepage", slug: "homepage", status: true } });
  for (const faq of [
    { question: "Is MBBS in Russia valid in India?", answer: "Yes, MBBS degrees from NMC-recognized Russian universities are valid in India. Graduates must clear the NEXT exam to practice medicine in India.", position: 1 },
    { question: "What is the total cost of MBBS in Russia?", answer: "The total cost of MBBS in Russia including tuition, accommodation, and living is approximately Rs.25-40 lakhs over 6 years.", position: 2 },
    { question: "Is NEET required for MBBS in Russia?", answer: "Yes, NEET qualification is mandatory for Indian students who wish to pursue MBBS in Russia, as per NMC guidelines.", position: 3 },
    { question: "What is the medium of instruction for MBBS in Russia?", answer: "Most Russian medical universities offer MBBS in English medium for international students.", position: 4 },
    { question: "What is the duration of MBBS in Russia?", answer: "MBBS/MD in Russia is a 6-year program including 5 years of academic study and 1 year of clinical internship.", position: 5 },
    { question: "Which are the top NMC-approved universities in Russia?", answer: "Top NMC-approved Russian universities include Sechenov University Moscow, Pirogov RNRMU, Pavlov University St. Petersburg, Kazan State Medical University, and Volgograd State Medical University.", position: 6 },
  ]) {
    await upsertByWhere(prisma.faq, { question: faq.question }, { ...faq, categoryId: faqCat.id, status: true });
  }

  await upsertByWhere(prisma.office, { name: "India Head Office" }, { name: "India Head Office", address: "EP-41, Jesus and Mary Marg, Chanakyapuri", city: "New Delhi", state: "Delhi", country: "India", phone: "+91-11-2410-2161", email: "india@mbbsinrussia.com", mapEmbed: "https://maps.google.com/?q=Chanakyapuri+New+Delhi", imageName: "office-india.jpg", imagePath: "/uploads/offices/india-head-office.jpg", position: 1, status: true });
  await upsertByWhere(prisma.office, { name: "Russia Support Office" }, { name: "Russia Support Office", address: "Leninsky Prospekt, 55", city: "Moscow", state: "Moscow", country: "Russia", phone: "+7-495-123-4567", email: "russia@mbbsinrussia.com", mapEmbed: "https://maps.google.com/?q=Leninsky+Prospekt+Moscow", imageName: "office-russia.jpg", imagePath: "/uploads/offices/russia-office.jpg", position: 2, status: true });

  await upsertByWhere(prisma.expertTeam, { name: "Dr. Meera Nair" }, { name: "Dr. Meera Nair", designation: "Senior Admission Counselor", description: "Over 10 years helping Indian students secure MBBS seats in top Russian universities.", photoName: "dr-meera-nair.jpg", photoPath: "/uploads/experts/dr-meera-nair.jpg", position: 1, status: true });

  for (const item of [
    { name: "World Health Organization (WHO)", url: "https://www.who.int", category: "global-health", position: 1 },
    { name: "National Medical Commission (NMC) - India", url: "https://www.nmc.org.in", category: "india-regulatory", position: 2 },
    { name: "Ministry of Health of the Russian Federation", url: "https://minzdrav.gov.ru", category: "russia-government", position: 3 },
    { name: "Ministry of Science and Higher Education of Russia", url: "https://minobrnauki.gov.ru", category: "russia-government", position: 4 },
  ]) {
    await upsertByWhere(prisma.officialGovernmentLink, { name: item.name }, { ...item, description: "Official reference link.", status: true });
  }

  await upsertByWhere(prisma.countryDocument, { country: "Russia", type: CountryDocType.embassy_letter }, { country: "Russia", type: CountryDocType.embassy_letter, title: "Russian Embassy Student Letter Template", fileName: "russia-embassy-student-letter.pdf", filePath: "/uploads/country-documents/russia-embassy-student-letter.pdf", isActive: true });
  await upsertByWhere(prisma.countryDocument, { country: "Russia", type: CountryDocType.nmc_guidelines }, { country: "Russia", type: CountryDocType.nmc_guidelines, title: "NMC Guidelines for MBBS in Russia", fileName: "nmc-russia-guidelines.pdf", filePath: "/uploads/country-documents/nmc-russia-guidelines.pdf", isActive: true });
  await upsertByWhere(prisma.pageContent, { pageSlug: "about-us", title: "Why Russia" }, { pageSlug: "about-us", title: "Why Russia", content: "Affordable medical education, NMC-recognized degrees, English-medium instruction, and extensive hospital clinical training.", position: 1, status: true });

  const blogCat = await prisma.blogCategory.upsert({ where: { slug: "admission-guides" }, update: { name: "Admission Guides", slug: "admission-guides", status: true }, create: { name: "Admission Guides", slug: "admission-guides", status: true } });
  const blog = await upsertByWhere(prisma.blog, { slug: "mbbs-in-russia-admission-roadmap-2026" }, { categoryId: blogCat.id, authorId: adminId, title: "MBBS in Russia Admission Roadmap 2026", slug: "mbbs-in-russia-admission-roadmap-2026", shortnote: "A practical timeline from counseling to student visa Russia.", description: "Stepwise checklist for profile review, documents, application, and travel readiness for MBBS in Russia.", status: true, homeView: true, trending: true });
  await upsertByWhere(prisma.blogContent, { blogId: blog.id, slug: "profile-review" }, { blogId: blog.id, title: "Profile Review", slug: "profile-review", description: "Start with NEET eligibility checks and shortlist NMC-recognized Russian universities.", position: 1 });
  await upsertByWhere(prisma.blogFaq, { blogId: blog.id, question: "When should I start applying for MBBS in Russia?" }, { blogId: blog.id, question: "When should I start applying for MBBS in Russia?", answer: "Start planning at least 6-8 months before your target intake.", position: 1, status: true });

  const newsCat = await prisma.newsCategory.upsert({ where: { slug: "policy-and-admissions" }, update: { name: "Policy and Admissions", slug: "policy-and-admissions", status: true }, create: { name: "Policy and Admissions", slug: "policy-and-admissions", status: true } });
  const news = await upsertByWhere(prisma.news, { slug: "russia-mbbs-intake-advisory-2026" }, { categoryId: newsCat.id, authorId: adminId, title: "Russia MBBS Intake Advisory for 2026 Applicants", slug: "russia-mbbs-intake-advisory-2026", description: "Indian MBBS applicants advised to complete document verification and NMC compliance checks early for 2026 Russia intake.", status: true, homeView: true });
  await upsertByWhere(prisma.newsContent, { newsId: news.id, slug: "russia-2026-timeline-advisory" }, { newsId: news.id, title: "2026 Intake Timeline Advisory", slug: "russia-2026-timeline-advisory", description: "Shortlist NMC-approved Russian universities and prepare NEET scorecard and 10+2 transcripts well in advance.", position: 1 });
  await upsertByWhere(prisma.newsFaq, { newsId: news.id, question: "Do all Russian universities have the same intake schedule?" }, { newsId: news.id, question: "Do all Russian universities have the same intake schedule?", answer: "No, intake windows vary. Most accept applications between April and August for September intake.", position: 1, status: true });

  const artCat = await prisma.articleCategory.upsert({ where: { slug: "mbbs-planning" }, update: { name: "MBBS Planning", slug: "mbbs-planning", status: true }, create: { name: "MBBS Planning", slug: "mbbs-planning", status: true } });
  const article = await upsertByWhere(prisma.article, { slug: "realistic-cost-breakdown-mbbs-russia" }, { categoryId: artCat.id, authorId: adminId, title: "Realistic Cost Breakdown for MBBS in Russia 2026", slug: "realistic-cost-breakdown-mbbs-russia", description: "Understand tuition fees, hostel costs, living expenses, and annual budget planning for MBBS in Russia.", status: true, homeView: true });
  await upsertByWhere(prisma.articleContent, { articleId: article.id, slug: "russia-tuition-and-living" }, { articleId: article.id, title: "Tuition and Living Costs in Russia", slug: "russia-tuition-and-living", description: "Annual tuition for MBBS in Russia ranges from $3,000-$6,000. Monthly living including hostel, food, transport is approximately $200-$350.", position: 1 });
  await upsertByWhere(prisma.articleFaq, { articleId: article.id, question: "Is on-campus hostel available in Russian universities?" }, { articleId: article.id, question: "Is on-campus hostel available in Russian universities?", answer: "Yes, most Russian medical universities provide affordable on-campus hostel for international students at $50-$100 per month.", position: 1, status: true });

  const scholarship = await prisma.scholarship.upsert({
    where: { slug: "russia-merit-scholarship-mbbs" },
    update: { title: "Russia Merit Scholarship for MBBS", slug: "russia-merit-scholarship-mbbs", scholarshipType: "Merit-based", amountMin: 1000, amountMax: 3000, discountPercentage: 25, availableSeats: 50, program: "MBBS", applicationMode: "Online", shortnote: "Partial tuition support for high-performing NEET qualifiers seeking MBBS in Russia.", isActive: true },
    create: { title: "Russia Merit Scholarship for MBBS", slug: "russia-merit-scholarship-mbbs", scholarshipType: "Merit-based", amountMin: 1000, amountMax: 3000, discountPercentage: 25, availableSeats: 50, program: "MBBS", applicationMode: "Online", shortnote: "Partial tuition support for high-performing NEET qualifiers seeking MBBS in Russia.", isActive: true },
  });
  await upsertByWhere(prisma.scholarshipFaq, { scholarshipId: scholarship.id, question: "Can I apply for Russia MBBS scholarship before final admission?" }, { scholarshipId: scholarship.id, question: "Can I apply for Russia MBBS scholarship before final admission?", answer: "You can initiate eligibility review, but award confirmation follows after university admission compliance.", position: 1, status: true });

  await upsertByWhere(prisma.testimonial, { name: "Arjun Sharma", designation: "MBBS Student, Russia" }, { name: "Arjun Sharma", designation: "MBBS Student, Russia", description: "Smooth admission process and excellent visa guidance. Now studying at Kazan State Medical University.", rating: 4.9, position: 1, status: true });
  await upsertByWhere(prisma.testimonial, { name: "Priya Verma", designation: "MBBS Student, Moscow" }, { name: "Priya Verma", designation: "MBBS Student, Moscow", description: "Secured admission at Sechenov University. Campus life in Moscow is amazing and very affordable.", rating: 4.8, position: 2, status: true });
  await upsertByWhere(prisma.gallery, { imagePath: "/uploads/gallery/campus-orientation.jpg" }, { title: "Campus Orientation - Russia", imageName: "campus-orientation.jpg", imagePath: "/uploads/gallery/campus-orientation.jpg", position: 1, status: true });
  await upsertByWhere(prisma.partnerInquiry, { email: "partners@globalcareerpathways.com" }, { name: "Global Career Pathways", email: "partners@globalcareerpathways.com", phone: "+91-98100-45678", company: "Global Career Pathways", city: "Ahmedabad", partnerType: "Counseling Partner", message: "Interested in channel partnership for MBBS Russia counseling.", status: "converted", studentsPlaced: 280, experience: 8, rating: 4.7 });
}

async function seedUniversityDependentData() {
  const university = await prisma.university.findFirst({ where: { status: true }, orderBy: { id: "asc" } });
  if (!university) {
    console.log("No university records found. Skipping university-dependent supplemental tables.");
    return { universityProgramId: null as number | null };
  }
  await upsertByWhere(prisma.universityFaq, { universityId: university.id, question: "Is clinical training provided in affiliated hospitals?" }, { universityId: university.id, question: "Is clinical training provided in affiliated hospitals?", answer: "Yes, students receive extensive clinical exposure in affiliated teaching hospitals from year 3 onwards.", position: 1, status: true });
  await upsertByWhere(prisma.universityReview, { universityId: university.id, name: "Student Review - Batch 2025" }, { universityId: university.id, name: "Student Review - Batch 2025", designation: "MBBS Student", description: "World-class faculty, affordable fees, and great hospital training experience in Russia.", rating: 4.7, position: 1, status: true });
  await upsertByWhere(prisma.universityTestimonial, { universityId: university.id, name: "Parent Testimonial - 2025" }, { universityId: university.id, name: "Parent Testimonial - 2025", designation: "Parent of MBBS Student", description: "Very transparent process. Our child is safely studying MBBS in Russia with full team support.", rating: 4.8, position: 1, status: true });
  await upsertByWhere(prisma.universityStudent, { universityId: university.id, email: "intl.batch@mbbsinrussia.com" }, { universityId: university.id, name: "International Student Cohort - India", email: "intl.batch@mbbsinrussia.com", phone: "+7-495-555-0101", country: "India", numberOfStudents: 250, course: "MBBS / MD", year: "2026", status: true });
  const simulationLab = await prisma.facility.findFirst({ where: { name: "Simulation Labs" }, orderBy: { id: "asc" } });
  if (simulationLab) {
    await upsertByWhere(prisma.universityFacility, { universityId: university.id, facilityId: simulationLab.id }, { universityId: university.id, facilityId: simulationLab.id, description: "Advanced simulation-driven practical training modules for MBBS students.", status: true });
  }
  const hospital = await prisma.hospital.findFirst({ where: { status: true }, orderBy: { id: "asc" } });
  if (hospital) {
    await upsertByWhere(prisma.universityHospital, { universityId: university.id, hospitalId: hospital.id }, { universityId: university.id, hospitalId: hospital.id });
  }
  const program = await prisma.universityProgram.findFirst({ where: { universityId: university.id, isActive: true }, orderBy: { id: "asc" } });
  return { universityProgramId: program?.id ?? null };
}

async function seedOptionalLeadData(adminId: number, universityProgramId: number | null) {
  if (!SHOULD_SEED_SAMPLE_LEADS) { console.log("Skipping sample leads. Set SEED_SAMPLE_LEADS=true to include them."); return; }
  const lead = await prisma.lead.upsert({
    where: { email: "ravi.kumar@studentmail.com" },
    update: { name: "Ravi Kumar", phone: "9876501234", city: "Pune", state: "Maharashtra", source: "website", sourcePath: "/contact-us", status: LeadStatus.active, country: "India", interestedProgram: "MBBS", neetQualificationStatus: NeetStatus.qualified, neetScore: 545, assignedTo: adminId, emailVerified: true, emailVerifiedAt: new Date() },
    create: { name: "Ravi Kumar", email: "ravi.kumar@studentmail.com", phone: "9876501234", city: "Pune", state: "Maharashtra", source: "website", sourcePath: "/contact-us", status: LeadStatus.active, country: "India", interestedProgram: "MBBS", neetQualificationStatus: NeetStatus.qualified, neetScore: 545, assignedTo: adminId, emailVerified: true, emailVerifiedAt: new Date() },
  });
  await upsertByWhere(prisma.studentSchool, { leadId: lead.id, institutionName: "St. Xavier Higher Secondary School" }, { leadId: lead.id, levelOfEducation: "Higher Secondary", countryOfEducation: "India", institutionName: "St. Xavier Higher Secondary School", gradeAverage: "82%" });
  await upsertByWhere(prisma.studentDocument, { leadId: lead.id, documentType: "passport" }, { leadId: lead.id, documentType: "passport", fileName: "ravi-passport.pdf", filePath: "/uploads/student-documents/ravi-passport.pdf", isVerified: true });
  await upsertByWhere(prisma.leadInquiry, { leadId: lead.id, source: "website", message: "Need counseling for Russia MBBS September intake." }, { leadId: lead.id, universityName: "Russia MBBS options", message: "Need counseling for Russia MBBS September intake.", source: "website", status: "pending", agentId: adminId });
  if (universityProgramId) {
    await upsertByWhere(prisma.studentApplication, { leadId: lead.id, universityProgramId }, { leadId: lead.id, universityProgramId, status: ApplicationStatus.applied, notes: "Sample dashboard application record generated by seed for Russia MBBS." });
  } else {
    console.log("No university program found. Skipping sample StudentApplication seed.");
  }
}

async function main() {
  console.log("Starting Russia MBBS baseline database seed...");
  const admin = await seedAdminUser();
  await seedWebsiteSettings();
  await seedReferenceData();
  await seedCountryAndEducationPages();
  await seedContentAndMisc(admin.id);
  const { universityProgramId } = await seedUniversityDependentData();
  await seedOptionalLeadData(admin.id, universityProgramId);
  console.log("Russia MBBS baseline seed completed successfully.");
}

main()
  .catch((error) => { console.error("Seed failed.", error); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
