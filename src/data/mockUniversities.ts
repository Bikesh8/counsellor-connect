export interface University {
  id: string;
  name: string;
  city: string;
  country: string;
  countryId: string;
  website: string;
  description: string;
  type: "Public" | "Private";
  assessmentLevel: string;
  logo: string;
  coverImage: string;
  ranking?: number;
  founded?: number;
  studentCount?: string;
  acceptanceRate?: string;
  internationalStudents?: string;
  campusSize?: string;
  gallery: string[];
  highlights: string[];
  facilities: string[];
  scholarships: Scholarship[];
  programs: Program[];
  contact: { email: string; phone: string; address: string };
}

export interface Program {
  id: string;
  universityId: string;
  universityName: string;
  name: string;
  degree: "Bachelor" | "Master" | "PhD" | "Diploma";
  duration: string;
  tuitionFee: number;
  currency: string;
  ieltsRequirement: number;
  intake: string[];
  description: string;
  gpaRequirement?: number;
  applicationFee?: number;
  languageOfInstruction?: string;
  modeOfStudy?: string;
  department?: string;
  curriculum?: string[];
  careerOutcomes?: string[];
  eligibilityCriteria?: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
}

export const mockUniversities: University[] = [
  {
    id: "uni-1",
    name: "University of Toronto",
    city: "Toronto",
    country: "Canada",
    countryId: "CA",
    website: "https://utoronto.ca",
    description: "One of Canada's top research universities, offering world-class education across diverse disciplines with a vibrant campus life in the heart of Toronto. Founded in 1827, the University of Toronto has evolved into a leading global institution recognized for groundbreaking research, innovative teaching methods, and a diverse community of scholars from over 160 countries.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop",
    ranking: 21,
    founded: 1827,
    studentCount: "97,000+",
    acceptanceRate: "43%",
    internationalStudents: "27%",
    campusSize: "71 hectares",
    gallery: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1597090297963-ef852bae1c58?w=600&h=400&fit=crop",
    ],
    highlights: ["QS World Rank #21", "3 Campuses across GTA", "700+ Undergraduate Programs", "Top Employer Reputation"],
    facilities: ["Research Libraries", "Sports Complex", "Student Housing", "Innovation Hub", "Health & Wellness Centre", "Career Services"],
    contact: { email: "admissions@utoronto.ca", phone: "+1 416-978-2011", address: "27 King's College Circle, Toronto, ON" },
    scholarships: [
      { id: "s1", name: "Lester B. Pearson Scholarship", amount: "Full Tuition + Living", eligibility: "International students with exceptional academics", deadline: "2026-11-30" },
      { id: "s2", name: "President's Scholars of Excellence", amount: "$10,000/year", eligibility: "Outstanding academic achievement", deadline: "2026-12-15" },
    ],
    programs: [
      { id: "p1", universityId: "uni-1", universityName: "University of Toronto", name: "Computer Science", degree: "Bachelor", duration: "4 years", tuitionFee: 58680, currency: "CAD", ieltsRequirement: 6.5, intake: ["September", "January"], description: "A comprehensive program covering algorithms, AI, systems, and software engineering with hands-on projects and co-op opportunities.", gpaRequirement: 3.5, applicationFee: 180, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Department of Computer Science", curriculum: ["Data Structures & Algorithms", "Operating Systems", "Machine Learning", "Software Engineering", "Database Systems", "Computer Networks", "Capstone Project"], careerOutcomes: ["Software Engineer", "Data Scientist", "Systems Architect", "Product Manager"], eligibilityCriteria: ["High school diploma with minimum 85% average", "IELTS 6.5 or equivalent", "Mathematics prerequisite"] },
      { id: "p2", universityId: "uni-1", universityName: "University of Toronto", name: "Data Science", degree: "Master", duration: "2 years", tuitionFee: 52400, currency: "CAD", ieltsRequirement: 7.0, intake: ["September"], description: "Advanced study in statistical learning, machine learning, and big data analytics with research thesis component.", gpaRequirement: 3.7, applicationFee: 125, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Faculty of Information", curriculum: ["Statistical Learning", "Deep Learning", "Big Data Systems", "Natural Language Processing", "Research Methods", "Thesis"], careerOutcomes: ["ML Engineer", "Research Scientist", "Data Architect", "Quantitative Analyst"], eligibilityCriteria: ["Bachelor's in CS, Math, or related field", "Minimum GPA 3.7/4.0", "IELTS 7.0", "GRE recommended"] },
      { id: "p3", universityId: "uni-1", universityName: "University of Toronto", name: "Business Administration", degree: "Bachelor", duration: "4 years", tuitionFee: 55200, currency: "CAD", ieltsRequirement: 6.5, intake: ["September"], description: "Rotman Commerce program covering finance, accounting, and management with real-world case studies.", gpaRequirement: 3.3, applicationFee: 180, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Rotman School of Management", curriculum: ["Financial Accounting", "Managerial Economics", "Marketing Management", "Corporate Finance", "Strategic Management"], careerOutcomes: ["Financial Analyst", "Management Consultant", "Marketing Manager", "Entrepreneur"], eligibilityCriteria: ["High school diploma with 80%+ average", "IELTS 6.5", "Supplementary application required"] },
    ],
  },
  {
    id: "uni-2",
    name: "University of Melbourne",
    city: "Melbourne",
    country: "Australia",
    countryId: "AU",
    website: "https://unimelb.edu.au",
    description: "Australia's leading university, renowned for research excellence and graduate outcomes with beautiful parkland campus in Melbourne's cultural precinct. Established in 1853, it consistently ranks among the top universities globally and is a member of the prestigious Group of Eight.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop",
    ranking: 14,
    founded: 1853,
    studentCount: "53,000+",
    acceptanceRate: "70%",
    internationalStudents: "42%",
    campusSize: "22.5 hectares",
    gallery: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop",
    ],
    highlights: ["QS World Rank #14", "Group of Eight Member", "42% International Students", "200+ Student Clubs"],
    facilities: ["Baillieu Library", "Melbourne Sports Centre", "On-campus Residences", "Entrepreneurship Hub", "Student Counselling"],
    contact: { email: "admissions@unimelb.edu.au", phone: "+61 3 9035 5511", address: "Grattan Street, Parkville VIC 3010" },
    scholarships: [
      { id: "s3", name: "Melbourne International Scholarship", amount: "50% Fee Remission", eligibility: "High-achieving international students", deadline: "2026-10-31" },
    ],
    programs: [
      { id: "p4", universityId: "uni-2", universityName: "University of Melbourne", name: "Information Technology", degree: "Master", duration: "2 years", tuitionFee: 47200, currency: "AUD", ieltsRequirement: 6.5, intake: ["February", "July"], description: "Covers software development, AI, cybersecurity, and distributed systems.", gpaRequirement: 3.0, applicationFee: 100, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "School of Computing", curriculum: ["Software Development", "Artificial Intelligence", "Cybersecurity", "Cloud Computing", "Capstone Project"], careerOutcomes: ["IT Consultant", "Software Developer", "Security Analyst"], eligibilityCriteria: ["Bachelor's degree in any discipline", "IELTS 6.5 overall (6.0 each band)", "Statement of purpose"] },
      { id: "p5", universityId: "uni-2", universityName: "University of Melbourne", name: "Engineering", degree: "Bachelor", duration: "3 years", tuitionFee: 49500, currency: "AUD", ieltsRequirement: 6.5, intake: ["February"], description: "Broad engineering foundation with specializations in civil, mechanical, and electrical.", gpaRequirement: 3.2, applicationFee: 100, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Melbourne School of Engineering", curriculum: ["Engineering Mathematics", "Physics", "Materials Science", "Design Thinking", "Engineering Project"], careerOutcomes: ["Civil Engineer", "Mechanical Engineer", "Project Manager"], eligibilityCriteria: ["High school with advanced math & physics", "IELTS 6.5"] },
      { id: "p6", universityId: "uni-2", universityName: "University of Melbourne", name: "Finance", degree: "Master", duration: "1.5 years", tuitionFee: 45800, currency: "AUD", ieltsRequirement: 7.0, intake: ["February", "July"], description: "Advanced financial theory, investment analysis, and risk management.", gpaRequirement: 3.5, applicationFee: 100, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Melbourne Business School", curriculum: ["Financial Markets", "Corporate Valuation", "Risk Management", "Portfolio Theory"], careerOutcomes: ["Investment Banker", "Financial Analyst", "Fund Manager"], eligibilityCriteria: ["Bachelor's with quantitative background", "IELTS 7.0", "GMAT 650+ preferred"] },
    ],
  },
  {
    id: "uni-3",
    name: "University of British Columbia",
    city: "Vancouver",
    country: "Canada",
    countryId: "CA",
    website: "https://ubc.ca",
    description: "A global center for teaching, learning and research, consistently ranked among the top 20 public universities in the world. UBC's stunning campus on the Pacific coast provides an inspiring environment for academic excellence.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=400&fit=crop",
    ranking: 34,
    founded: 1908,
    studentCount: "72,000+",
    acceptanceRate: "52%",
    internationalStudents: "30%",
    campusSize: "402 hectares",
    gallery: [
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1597090297963-ef852bae1c58?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
    ],
    highlights: ["QS World Rank #34", "402-Hectare Campus", "Co-op Programs Available", "Sustainability Leader"],
    facilities: ["Irving K. Barber Library", "Aquatic Centre", "Student Union Building", "Research Forest", "Co-op Office"],
    contact: { email: "international@ubc.ca", phone: "+1 604-822-2211", address: "2329 West Mall, Vancouver, BC" },
    scholarships: [
      { id: "s4", name: "International Leader of Tomorrow", amount: "Full Tuition", eligibility: "Demonstrated leadership & academic excellence", deadline: "2026-12-01" },
      { id: "s5", name: "Outstanding International Student Award", amount: "$5,000–$10,000", eligibility: "Academic merit", deadline: "2026-01-15" },
    ],
    programs: [
      { id: "p7", universityId: "uni-3", universityName: "University of British Columbia", name: "Computer Science", degree: "Master", duration: "2 years", tuitionFee: 9131, currency: "CAD", ieltsRequirement: 7.0, intake: ["September", "January"], description: "Research-oriented program in systems, theory, AI and HCI.", gpaRequirement: 3.5, applicationFee: 168, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Department of Computer Science", curriculum: ["Advanced Algorithms", "Machine Learning", "Human-Computer Interaction", "Distributed Systems", "Thesis"], careerOutcomes: ["Research Scientist", "ML Engineer", "UX Researcher"], eligibilityCriteria: ["BSc in Computer Science or equivalent", "GPA 3.5+", "IELTS 7.0", "Statement of intent & references"] },
      { id: "p8", universityId: "uni-3", universityName: "University of British Columbia", name: "Electrical Engineering", degree: "Bachelor", duration: "4 years", tuitionFee: 54540, currency: "CAD", ieltsRequirement: 6.5, intake: ["September"], description: "Comprehensive program covering circuits, signals, communications, and power systems.", gpaRequirement: 3.3, applicationFee: 168, languageOfInstruction: "English", modeOfStudy: "Full-time / Co-op", department: "Faculty of Applied Science", curriculum: ["Circuit Analysis", "Signal Processing", "Electromagnetics", "Power Systems", "Senior Design Project"], careerOutcomes: ["Electrical Engineer", "Telecom Engineer", "Hardware Designer"], eligibilityCriteria: ["High school diploma with calculus & physics", "IELTS 6.5"] },
    ],
  },
  {
    id: "uni-4",
    name: "King's College London",
    city: "London",
    country: "United Kingdom",
    countryId: "UK",
    website: "https://kcl.ac.uk",
    description: "One of the world's top universities, located in the heart of London with outstanding reputation in health, humanities, law, and social sciences. Established in 1829 by King George IV, it is one of the founding colleges of the University of London.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop",
    ranking: 40,
    founded: 1829,
    studentCount: "33,000+",
    acceptanceRate: "13%",
    internationalStudents: "48%",
    campusSize: "5 campuses",
    gallery: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop",
    ],
    highlights: ["QS World Rank #40", "5 London Campuses", "Russell Group Member", "48% International Students"],
    facilities: ["Maughan Library", "Guy's Campus", "Strand Campus", "Gym & Sports", "Mental Health Support"],
    contact: { email: "international@kcl.ac.uk", phone: "+44 20 7836 5454", address: "Strand, London WC2R 2LS" },
    scholarships: [
      { id: "s6", name: "King's International Scholarship", amount: "£5,000/year", eligibility: "International postgraduate students", deadline: "2026-03-31" },
    ],
    programs: [
      { id: "p9", universityId: "uni-4", universityName: "King's College London", name: "Artificial Intelligence", degree: "Master", duration: "1 year", tuitionFee: 33400, currency: "GBP", ieltsRequirement: 7.0, intake: ["September"], description: "Cutting-edge AI program covering deep learning, NLP, computer vision, and robotics.", gpaRequirement: 3.5, applicationFee: 75, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Department of Informatics", curriculum: ["Deep Learning", "Natural Language Processing", "Computer Vision", "Robotics & Autonomous Systems", "AI Ethics", "Individual Project"], careerOutcomes: ["AI Engineer", "Research Scientist", "ML Specialist", "AI Product Manager"], eligibilityCriteria: ["2:1 (upper second-class) degree in CS or related", "IELTS 7.0 (6.5 each)", "Programming proficiency"] },
      { id: "p10", universityId: "uni-4", universityName: "King's College London", name: "International Relations", degree: "Bachelor", duration: "3 years", tuitionFee: 22350, currency: "GBP", ieltsRequirement: 7.0, intake: ["September"], description: "Study global politics, diplomacy, security, and international organizations.", gpaRequirement: 3.3, applicationFee: 75, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Department of War Studies", curriculum: ["International Security", "Global Governance", "Diplomacy & Statecraft", "Conflict Resolution", "Dissertation"], careerOutcomes: ["Diplomat", "Policy Analyst", "NGO Manager", "Journalist"], eligibilityCriteria: ["A-levels ABB or equivalent", "IELTS 7.0", "Personal statement"] },
      { id: "p11", universityId: "uni-4", universityName: "King's College London", name: "Law", degree: "Bachelor", duration: "3 years", tuitionFee: 24500, currency: "GBP", ieltsRequirement: 7.0, intake: ["September"], description: "Prestigious law program with strong focus on international and commercial law.", gpaRequirement: 3.6, applicationFee: 75, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "The Dickson Poon School of Law", curriculum: ["Contract Law", "Constitutional Law", "Criminal Law", "EU Law", "Commercial Law", "Mooting"], careerOutcomes: ["Barrister", "Solicitor", "Legal Consultant", "Judge"], eligibilityCriteria: ["A-levels AAA or equivalent", "IELTS 7.0 (7.0 each band)", "LNAT test required"] },
    ],
  },
  {
    id: "uni-5",
    name: "Monash University",
    city: "Melbourne",
    country: "Australia",
    countryId: "AU",
    website: "https://monash.edu",
    description: "Australia's largest university with a global presence, known for impactful research and industry partnerships across six continents. Named after Sir John Monash, it has grown into a world-class institution with campuses in multiple countries.",
    type: "Public",
    assessmentLevel: "Tier 2",
    logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=400&fit=crop",
    ranking: 42,
    founded: 1958,
    studentCount: "86,000+",
    acceptanceRate: "65%",
    internationalStudents: "35%",
    campusSize: "4 Australian campuses",
    gallery: [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1597090297963-ef852bae1c58?w=600&h=400&fit=crop",
    ],
    highlights: ["QS World Rank #42", "Global Campus Network", "Group of Eight Member", "High Graduate Employment"],
    facilities: ["Hargrave-Andrew Library", "Monash Sport", "Student Village", "Makerspace", "Career Connect"],
    contact: { email: "study@monash.edu", phone: "+61 3 9902 6000", address: "Wellington Road, Clayton VIC 3800" },
    scholarships: [
      { id: "s7", name: "Monash International Merit Scholarship", amount: "$10,000/year", eligibility: "High academic achievers", deadline: "2026-08-31" },
    ],
    programs: [
      { id: "p12", universityId: "uni-5", universityName: "Monash University", name: "Cybersecurity", degree: "Master", duration: "2 years", tuitionFee: 44400, currency: "AUD", ieltsRequirement: 6.5, intake: ["February", "July"], description: "Advanced program covering network security, cryptography, and digital forensics.", gpaRequirement: 3.0, applicationFee: 100, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Faculty of IT", curriculum: ["Network Security", "Cryptography", "Digital Forensics", "Ethical Hacking", "Incident Response", "Research Project"], careerOutcomes: ["Security Analyst", "Penetration Tester", "CISO", "Security Consultant"], eligibilityCriteria: ["Bachelor's in IT or related field", "IELTS 6.5 overall"] },
      { id: "p13", universityId: "uni-5", universityName: "Monash University", name: "Pharmacy", degree: "Bachelor", duration: "4 years", tuitionFee: 46000, currency: "AUD", ieltsRequirement: 6.5, intake: ["February"], description: "Comprehensive pharmacy program with clinical placements and research opportunities.", gpaRequirement: 3.2, applicationFee: 100, languageOfInstruction: "English", modeOfStudy: "Full-time", department: "Faculty of Pharmacy", curriculum: ["Pharmacology", "Medicinal Chemistry", "Clinical Pharmacy", "Therapeutics", "Professional Practice"], careerOutcomes: ["Pharmacist", "Pharmaceutical Researcher", "Clinical Consultant"], eligibilityCriteria: ["High school with chemistry & biology", "IELTS 6.5"] },
    ],
  },
  {
    id: "uni-6",
    name: "Technical University of Munich",
    city: "Munich",
    country: "Germany",
    countryId: "DE",
    website: "https://tum.de",
    description: "Germany's top technical university, a powerhouse of engineering, natural sciences, and technology with strong industry connections. TUM is one of Europe's leading research universities and a member of the TU9 alliance of prestigious German institutes of technology.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1597090297963-ef852bae1c58?w=800&h=400&fit=crop",
    ranking: 37,
    founded: 1868,
    studentCount: "50,000+",
    acceptanceRate: "8%",
    internationalStudents: "37%",
    campusSize: "3 campuses",
    gallery: [
      "https://images.unsplash.com/photo-1597090297963-ef852bae1c58?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
    ],
    highlights: ["QS World Rank #37", "Nearly Free Tuition", "TU9 Alliance Member", "Strong Industry Ties"],
    facilities: ["University Library", "Research Centres", "Maker Space", "Student Residences", "Language Centre"],
    contact: { email: "studium@tum.de", phone: "+49 89 289 01", address: "Arcisstraße 21, 80333 München" },
    scholarships: [
      { id: "s8", name: "Deutschlandstipendium", amount: "€300/month", eligibility: "Talented students regardless of nationality", deadline: "2026-07-15" },
    ],
    programs: [
      { id: "p14", universityId: "uni-6", universityName: "Technical University of Munich", name: "Mechanical Engineering", degree: "Master", duration: "2 years", tuitionFee: 258, currency: "EUR", ieltsRequirement: 6.5, intake: ["October", "April"], description: "World-class engineering program with focus on automotive, aerospace, and robotics.", gpaRequirement: 3.0, applicationFee: 0, languageOfInstruction: "English / German", modeOfStudy: "Full-time", department: "School of Engineering & Design", curriculum: ["Advanced Mechanics", "Thermodynamics", "Automotive Engineering", "Robotics", "Master's Thesis"], careerOutcomes: ["Mechanical Engineer", "Automotive Designer", "Aerospace Engineer"], eligibilityCriteria: ["BSc in Mechanical Engineering or related", "GPA 3.0+", "IELTS 6.5 or TestDaF B2"] },
      { id: "p15", universityId: "uni-6", universityName: "Technical University of Munich", name: "Computer Science", degree: "Bachelor", duration: "3 years", tuitionFee: 258, currency: "EUR", ieltsRequirement: 6.0, intake: ["October"], description: "Strong theoretical and practical CS education with opportunities in research and industry.", gpaRequirement: 3.0, applicationFee: 0, languageOfInstruction: "German / English", modeOfStudy: "Full-time", department: "School of Computation, Information & Technology", curriculum: ["Algorithms", "Databases", "Computer Architecture", "Software Engineering", "Bachelor's Thesis"], careerOutcomes: ["Software Developer", "Systems Engineer", "IT Consultant"], eligibilityCriteria: ["Abitur or equivalent", "German B2 or IELTS 6.0", "Aptitude assessment"] },
    ],
  },
];

export const allPrograms: Program[] = mockUniversities.flatMap(u => u.programs);
