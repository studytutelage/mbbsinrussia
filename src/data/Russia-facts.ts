/**
 * Static data for Russia Quick Facts.
 * Kept in a separate module to keep components lean.
 */
import {
  Building,
  Users,
  Languages,
  DollarSign,
  MapPin,
  Clock,
  Flag,
  Mountain,
  Stethoscope,
  Plane,
  Globe,
  Sun,
  Calendar,
  TreePine,
  Heart,
  Car,
  Wifi,
  Award,
  Compass,
  Landmark,
  Snowflake,
  SunMedium,
} from "lucide-react";

export const essentialFacts = [
  { icon: Building, color: "blue", label: "Capital", value: "Moscow" },
  { icon: Users, color: "green", label: "Population", value: "144 Million+" },
  {
    icon: Languages,
    color: "purple",
    label: "Languages",
    value: "Russian, English",
  },
  {
    icon: DollarSign,
    color: "orange",
    label: "Currency",
    value: "Russian Ruble (RUB)",
  },
  { icon: MapPin, color: "red", label: "Location", value: "Eastern Europe & North Asia" },
  { icon: Clock, color: "teal", label: "Timezone", value: "UTC+3 (Moscow Time)" },
  {
    icon: Flag,
    color: "yellow",
    label: "National Day",
    value: "June 12 (Russia Day)",
  },
  {
    icon: Mountain,
    color: "indigo",
    label: "Highest Peak",
    value: "Mount Elbrus (5,642 m)",
  },
];

export const geographyPoints = [
  {
    icon: Mountain,
    color: "text-red-600",
    text: "Largest country in the world spanning Eastern Europe and Northern Asia across 11 time zones",
  },
  {
    icon: TreePine,
    color: "text-green-600",
    text: "Vast natural wonders including Lake Baikal (deepest freshwater lake), Ural Mountains, and taiga",
  },
  {
    icon: Landmark,
    color: "text-purple-600",
    text: "Home to 30+ UNESCO World Heritage sites, historic kremlins, and imperial architectural landmarks",
  },
  {
    icon: Globe,
    color: "text-cyan-600",
    text: "Major scientific, medical, and educational destination with centuries-old academic traditions",
  },
];

export const climateZones = [
  {
    icon: SunMedium,
    color: "text-orange-500",
    text: "Pleasant, warm summers ideal for travel and orientation (20°C – 28°C)",
  },
  {
    icon: Snowflake,
    color: "text-red-500",
    text: "Snowy winters with 24/7 centrally heated campuses and student hostels (-5°C – -15°C)",
  },
  {
    icon: Calendar,
    color: "text-green-500",
    text: "Four distinct seasons with stunning golden autumns and vibrant spring blooms",
  },
  {
    icon: Sun,
    color: "text-red-600",
    text: "Well-insulated modern facilities ensure comfortable year-round student life",
  },
];

export const attractions = [
  {
    icon: Landmark,
    color: "text-slate-600",
    name: "Red Square & Kremlin",
    desc: "Iconic historical and political heart of Moscow and Russia",
  },
  {
    icon: Landmark,
    color: "text-green-200",
    name: "The State Hermitage Museum",
    desc: "World-famous museum of art and culture located in Saint Petersburg",
  },
  {
    icon: Compass,
    color: "text-purple-200",
    name: "Lake Baikal",
    desc: "UNESCO World Heritage site containing 20% of the world's unfrozen freshwater",
  },
  {
    icon: Mountain,
    color: "text-red-600",
    name: "Mount Elbrus & Caucasus",
    desc: "The highest mountain in Europe offering breathtaking alpine landscapes",
  },
];

export const majorCities = [
  {
    name: "Moscow",
    gradient: " ",
    textMain: "text-slate-600",
    textSub: "text-slate-600",
    desc: "The bustling capital city and primary hub of premier medical universities like Sechenov and Pirogov, clinical research centers, and global culture.",
    pop: "13,000,000+",
    highlight: "Capital & Premier Medical Hub",
  },
  {
    name: "Saint Petersburg",
    gradient: " ",
    textMain: "text-green-100",
    textSub: "text-green-200",
    desc: "Russia's cultural capital and second-largest metropolis, home to Pavlov First Medical University and historic clinical faculties.",
    pop: "5,600,000+",
    highlight: "Cultural & Academic Center",
  },
  {
    name: "Kazan",
    gradient: " ",
    textMain: "text-orange-100",
    textSub: "text-orange-200",
    desc: "Vibrant educational hub blending European and Asian cultures, home to Kazan Federal University and centuries of medical scholarship.",
    pop: "1,300,000+",
    highlight: "University City & Heritage Hub",
  },
];

export const defaultCuisines = [
  {
    id: 0,
    iconClass: "🥣",
    dishName: "Borscht",
    dishDescription:
      "Nutritious traditional beetroot soup served hot with a dollop of sour cream (smetana)",
    dishImage: null,
  },
  {
    id: 1,
    iconClass: "🥟",
    dishName: "Pelmeni",
    dishDescription:
      "Tender handmade dumplings filled with minced meat or vegetables, seasoned with fresh herbs",
    dishImage: null,
  },
  {
    id: 2,
    iconClass: "🥞",
    dishName: "Blini",
    dishDescription:
      "Traditional thin golden pancakes served with honey, berries, cottage cheese, or butter",
    dishImage: null,
  },
  {
    id: 3,
    iconClass: "🍲",
    dishName: "Beef Stroganoff",
    dishDescription:
      "Classic dish of sautéed beef strips served in a rich sour cream sauce with rice or pasta",
    dishImage: null,
  },
];

export const transportOptions = [
  {
    icon: Plane,
    color: "text-red-600",
    text: "Major international aviation hubs: Sheremetyevo (SVO), Domodedovo (DME), and Pulkovo (LED)",
  },
  {
    icon: MapPin,
    color: "text-orange-600",
    text: "Sapsan high-speed express trains connecting Moscow and St. Petersburg in 3.5 hours",
  },
  {
    icon: Car,
    color: "text-purple-600",
    text: "Moscow and St. Petersburg Metro — architectural masterpieces and world-class rapid transit",
  },
  {
    icon: Wifi,
    color: "text-green-600",
    text: "Troika smart card and Yandex Go integration for seamless rides across Russian cities",
  },
];

export const visaFacts = [
  {
    icon: Award,
    color: "text-green-600",
    text: "Official Russian Student Visa issued via Ministry of Internal Affairs invitation letter",
  },
  {
    icon: Calendar,
    color: "text-orange-600",
    text: "Direct embassy processing with support from university international offices",
  },
  {
    icon: Plane,
    color: "text-red-600",
    text: "Migration card and temporary registration issued promptly upon arrival in Russia",
  },
  {
    icon: Heart,
    color: "text-red-600",
    text: "International students allowed to work part-time in compliance with Russian labor regulations",
  },
];

export const mbbsHighlights = [
  {
    icon: Stethoscope,
    label: "International Recognition",
    desc: "Degrees recognized by NMC, WHO (WDOMS), ECFMG, FAIMER, and global medical licensing bodies.",
  },
  {
    icon: DollarSign,
    label: "Affordable High-Quality Education",
    desc: "Subsidized government tuition starting from $3,500/year with world-class clinical infrastructure.",
  },
  {
    icon: Languages,
    label: "Medium of Instruction",
    desc: "Complete 6-year English-medium curriculum designed specifically for international medical aspirants.",
  },
];

export const economyStats = [
  { label: "Stability", value: "Top Global Emerging Economy" },
  { label: "Main Industries", value: "Energy, Aerospace, Pharmaceuticals, Medical Technology" },
  { label: "Health Hub", value: "Pioneering Center for Medical Research & Vaccines" },
  { label: "Quality of Life", value: "High Safety Index, Subsidized Public Services & Low Cost of Living" },
];

export const quickFacts = [
  {
    icon: Calendar,
    label: "National Day",
    value: "June 12, 1990",
    color: "text-indigo-200",
  },
  {
    icon: Mountain,
    label: "Land Area",
    value: "17,098,242 km²",
    color: "text-slate-600",
  },
  {
    icon: Globe,
    label: "Region",
    value: "Eastern Europe / North Asia",
    color: "text-green-200",
  },
  {
    icon: Award,
    label: "Healthcare System",
    value: "Top Tier Medical Training System",
    color: "text-red-600",
  },
];

export const healthcare = [
  {
    title: "Compulsory Medical Insurance (VMS)",
    desc: "International students receive comprehensive voluntary medical insurance covering clinical checkups and emergencies.",
    color: "border-gray-200",
  },
  {
    title: "World-Class Tertiary Teaching Hospitals",
    desc: "Direct clinical training at Sechenov University Clinics, Pirogov Center, Pavlov Hospital, and regional health institutes.",
    color: "border-green-200",
  },
  {
    title: "Centuries of Surgical & Clinical Excellence",
    desc: "Hands-on exposure to high-volume patient wards, modern simulation centers, and advanced biomedical labs.",
    color: "border-purple-200",
  },
];

export const mbbsWhyStats = [
  { val: "6 Years", label: "Course Duration" },
  { val: "NMC + WHO", label: "Recognition" },
  { val: "Top Tier", label: "Hospital Infrastructure" },
  { val: "English", label: "Instruction Medium" },
];

export const studentLifeCards = [
  {
    icon: Heart,
    label: "Exceptional Safety",
    desc: "Russia provides safe student campuses, 24/7 security, and welcoming communities for international students.",
  },
  {
    icon: Building,
    label: "Historic & Modern Campuses",
    desc: "Centuries of academic legacy combined with digital libraries, smart lecture halls, and comfortable student hostels.",
  },
  {
    icon: Users,
    label: "Global Community",
    desc: "Over 300,000 international students, including 20,000+ Indian medical students with active Indian mess and festivals.",
  },
];
