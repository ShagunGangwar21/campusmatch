require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const College = require("../models/College");
const Deadline = require("../models/Deadline");

const collegesData = [
  {
    name: "National Institute of Technology Tiruchirappalli (NIT Trichy)",
    shortName: "NITT",
    type: "NIT",
    officialWebsite: "https://www.nitt.edu",
    location: "Tiruchirappalli, Tamil Nadu",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    courses: ["B.Tech", "M.Tech", "MCA"],
    branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Mechanical Engineering", "Electrical & Electronics"],
    exams: ["JEE Main"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 155000,
    feesDisplay: "₹1.55 Lakh/year",
    hostelFees: "₹45,000/year",
    closingRank: 18420,
    openingRank: 1100,
    seats: 120,
    eligibility: "Top rankers in JEE Main with minimum 75% in Class 12 (or Top 20 percentile).",
    admissionProcess: "Centralized counselling conducted by JoSAA and CSAB based on JEE Main CRL.",
    accreditation: "NIRF #1 among NITs, NAAC A++ Accredited",
    placements: {
      averagePackage: "₹27.2 LPA (CSE)",
      highestPackage: "₹52.8 LPA",
      placementRate: "98.2%"
    },
    importantDates: [
      { title: "JoSAA Round 1 Seat Allotment", date: "June 20, 2026", status: "Upcoming" },
      { title: "CSAB Special Round 1", date: "July 28, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://josaa.admissions.nic.in/",
    sourceName: "JoSAA Official Cutoff Archive & NITT Official Portal",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  },
  {
    name: "Indian Institute of Information Technology Allahabad (IIIT Allahabad)",
    shortName: "IIITA",
    type: "IIIT",
    officialWebsite: "https://www.iiita.ac.in",
    location: "Prayagraj, Uttar Pradesh",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    courses: ["B.Tech", "M.Tech", "Dual Degree"],
    branches: ["Information Technology", "Computer Science & Engineering", "Electronics & Communication"],
    exams: ["JEE Main"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 180000,
    feesDisplay: "₹1.80 Lakh/year",
    hostelFees: "₹50,000/year",
    closingRank: 22810,
    openingRank: 4200,
    seats: 275,
    eligibility: "JEE Main rank holder with 75% aggregate marks in PCM in Class 12 board exams.",
    admissionProcess: "JoSAA / CSAB counselling based on JEE Main rank list.",
    accreditation: "Institute of National Importance, NAAC A Grade",
    placements: {
      averagePackage: "₹25.8 LPA",
      highestPackage: "₹1.25 CPA",
      placementRate: "97.5%"
    },
    importantDates: [
      { title: "JoSAA Registration", date: "June 10, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://josaa.nic.in",
    sourceName: "JoSAA Cutoff Database & IIIT Allahabad Portal",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  },
  {
    name: "National Institute of Technology Warangal (NIT Warangal)",
    shortName: "NITW",
    type: "NIT",
    officialWebsite: "https://www.nitw.ac.in",
    location: "Warangal, Telangana",
    city: "Warangal",
    state: "Telangana",
    courses: ["B.Tech", "M.Tech", "M.Sc"],
    branches: ["Computer Science & Engineering", "Electronics & Communication", "Electrical Engineering", "Civil Engineering"],
    exams: ["JEE Main"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 152000,
    feesDisplay: "₹1.52 Lakh/year",
    hostelFees: "₹42,000/year",
    closingRank: 26140,
    openingRank: 2500,
    seats: 130,
    eligibility: "75% in 10+2 with Physics, Mathematics, Chemistry + JEE Main score.",
    admissionProcess: "JoSAA Counselling for Home State and Other State quotas.",
    accreditation: "NIRF Top 25 Engineering Institutions in India",
    placements: {
      averagePackage: "₹21.5 LPA",
      highestPackage: "₹88.0 LPA",
      placementRate: "95.8%"
    },
    importantDates: [
      { title: "JoSAA Choice Filling", date: "June 15, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://josaa.nic.in",
    sourceName: "JoSAA Cutoff Data 2024-2025",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  },
  {
    name: "Indraprastha Institute of Information Technology Delhi (IIIT Delhi)",
    shortName: "IIITD",
    type: "IIIT",
    officialWebsite: "https://www.iiitd.ac.in",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    courses: ["B.Tech"],
    branches: ["Computer Science & Engineering", "Computer Science & Artificial Intelligence", "Electronics & Communication"],
    exams: ["JEE Main"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 425000,
    feesDisplay: "₹4.25 Lakh/year",
    hostelFees: "₹75,000/year",
    closingRank: 31000,
    openingRank: 3800,
    seats: 600,
    eligibility: "At least 70% overall in Class 12 with 70% in Mathematics + JEE Main CRL score.",
    admissionProcess: "JAC Delhi (Joint Admission Counselling Delhi) portal.",
    accreditation: "NAAC A Grade, NBA Accredited",
    placements: {
      averagePackage: "₹23.7 LPA",
      highestPackage: "₹51.0 LPA",
      placementRate: "96.2%"
    },
    importantDates: [
      { title: "JAC Delhi Registration", date: "May 25, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://jacdelhi.admissions.nic.in",
    sourceName: "JAC Delhi Official Cutoff Records",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  },
  {
    name: "KIET Group of Institutions",
    shortName: "KIET",
    type: "Private",
    officialWebsite: "https://www.kiet.edu",
    location: "Ghaziabad, Uttar Pradesh",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    courses: ["B.Tech", "M.Tech", "MCA", "B.Pharm"],
    branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Mechanical Engineering"],
    exams: ["JEE Main", "CUET"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 145000,
    feesDisplay: "₹1.45 Lakh/year",
    hostelFees: "₹92,000/year",
    closingRank: 120000,
    openingRank: 45000,
    seats: 480,
    eligibility: "Passed 10+2 with minimum 45% aggregate in Physics and Mathematics.",
    admissionProcess: "UPTAC (AKTU) Counselling based on JEE Main rank / Direct admission.",
    accreditation: "NAAC A+ Grade, Autonomous status by UGC",
    placements: {
      averagePackage: "₹7.2 LPA",
      highestPackage: "₹48.4 LPA",
      placementRate: "91.4%"
    },
    importantDates: [
      { title: "UPTAC Choice Filling", date: "July 10, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://uptac.admissions.nic.in",
    sourceName: "UPTAC Official Counselling Portal",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  },
  {
    name: "Ajay Kumar Garg Engineering College (AKGEC)",
    shortName: "AKGEC",
    type: "Private",
    officialWebsite: "https://www.akgec.ac.in",
    location: "Ghaziabad, Uttar Pradesh",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    courses: ["B.Tech", "M.Tech"],
    branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Civil Engineering"],
    exams: ["JEE Main"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 135000,
    feesDisplay: "₹1.35 Lakh/year",
    hostelFees: "₹95,000/year",
    closingRank: 95000,
    openingRank: 38000,
    seats: 420,
    eligibility: "10+2 with 45% marks in PCM; valid JEE Main rank.",
    admissionProcess: "AKTU UPTAC State Counselling.",
    accreditation: "NAAC Accredited, Affiliated to Dr. A.P.J. Abdul Kalam Technical University",
    placements: {
      averagePackage: "₹6.8 LPA",
      highestPackage: "₹33.8 LPA",
      placementRate: "89.0%"
    },
    importantDates: [
      { title: "UPTAC Round 1 Seat Allotment", date: "July 18, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://uptac.admissions.nic.in",
    sourceName: "AKTU UPTAC Counselling Seat Allotment Matrix",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  },
  {
    name: "Jaypee Institute of Information Technology (JIIT Noida)",
    shortName: "JIIT",
    type: "Deemed",
    officialWebsite: "https://www.jiit.ac.in",
    location: "Noida, Uttar Pradesh",
    city: "Noida",
    state: "Uttar Pradesh",
    courses: ["B.Tech", "M.Tech", "Integrated M.Tech"],
    branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
    exams: ["JEE Main"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 285000,
    feesDisplay: "₹2.85 Lakh/year",
    hostelFees: "₹1,80,000/year",
    closingRank: 75000,
    openingRank: 22000,
    seats: 600,
    eligibility: "Aggregate 60% in 10+2 with Physics and Mathematics.",
    admissionProcess: "Direct Jaypee Counselling based on JEE Main All India Rank.",
    accreditation: "NAAC Accredited Deemed-to-be-University under UGC Act",
    placements: {
      averagePackage: "₹11.2 LPA",
      highestPackage: "₹57.0 LPA",
      placementRate: "94.5%"
    },
    importantDates: [
      { title: "JIIT Application Deadline", date: "June 10, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://www.jiit.ac.in/admissions",
    sourceName: "JIIT Official Admission Office",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  },
  {
    name: "GL Bajaj Institute of Technology and Management",
    shortName: "GLBITM",
    type: "Private",
    officialWebsite: "https://www.glbitm.org",
    location: "Greater Noida, Uttar Pradesh",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
    branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
    exams: ["JEE Main", "CUET"],
    categories: ["General", "OBC-NCL", "SC", "ST", "EWS"],
    fees: 140000,
    feesDisplay: "₹1.40 Lakh/year",
    hostelFees: "₹88,000/year",
    closingRank: 110000,
    openingRank: 42000,
    seats: 360,
    eligibility: "Class 12 with 45% aggregate in PCM.",
    admissionProcess: "UPTAC Counselling & Management Quota Direct Admissions.",
    accreditation: "NAAC A+ Grade, NBA Accredited CSE & IT",
    placements: {
      averagePackage: "₹7.5 LPA",
      highestPackage: "₹58.0 LPA",
      placementRate: "92.0%"
    },
    importantDates: [
      { title: "UPTAC Choice Lock", date: "July 12, 2026", status: "Upcoming" }
    ],
    sourceUrl: "https://uptac.admissions.nic.in",
    sourceName: "UPTAC Cutoffs",
    lastUpdated: new Date(),
    verifiedAt: new Date()
  }
];

const deadlinesData = [
  {
    title: "JEE Main 2026 Session 2 Registration",
    category: "Exam",
    exam: "JEE Main",
    startDate: "February 02, 2026",
    endDate: "March 04, 2026",
    status: "Closed",
    description: "Official registration for NTA JEE Main Session 2 exam.",
    officialUrl: "https://jeemain.nta.ac.in",
    sourceName: "National Testing Agency (NTA)",
  },
  {
    title: "JoSAA 2026 Choice Filling & Locking",
    category: "Counselling",
    exam: "JEE Main",
    startDate: "June 10, 2026",
    endDate: "June 19, 2026",
    status: "Upcoming",
    description: "Centralized choice filling for 23 IITs, 32 NITs, 26 IIITs and GFTIs.",
    officialUrl: "https://josaa.nic.in",
    sourceName: "Joint Seat Allocation Authority (JoSAA)",
  },
  {
    title: "JAC Delhi Counselling Registration",
    category: "Counselling",
    exam: "JEE Main",
    startDate: "May 20, 2026",
    endDate: "June 25, 2026",
    status: "Upcoming",
    description: "Admission to DTU, NSUT, IIIT-D, and IGDTUW.",
    officialUrl: "https://jacdelhi.admissions.nic.in",
    sourceName: "JAC Delhi Authority",
  },
  {
    title: "UPTAC AKTU B.Tech Counselling Registration",
    category: "Counselling",
    exam: "JEE Main",
    startDate: "June 25, 2026",
    endDate: "July 15, 2026",
    status: "Upcoming",
    description: "State counselling for top engineering institutions across Uttar Pradesh.",
    officialUrl: "https://uptac.admissions.nic.in",
    sourceName: "Dr. A.P.J. Abdul Kalam Technical University",
  }
];

const seedDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) throw new Error("MONGODB_URI environment variable missing!");

    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB for seeding...");

    await College.deleteMany({});
    console.log("Cleared existing colleges collection.");

    const createdColleges = await College.insertMany(collegesData);
    console.log(`Successfully seeded ${createdColleges.length} colleges into MongoDB.`);

    await Deadline.deleteMany({});
    console.log("Cleared existing deadlines collection.");

    const createdDeadlines = await Deadline.insertMany(deadlinesData);
    console.log(`Successfully seeded ${createdDeadlines.length} admission deadlines.`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB. Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
