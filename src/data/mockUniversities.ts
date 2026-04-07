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
    description: "One of Canada's top research universities, offering world-class education across diverse disciplines with a vibrant campus life in the heart of Toronto.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop",
    ranking: 21,
    contact: { email: "admissions@utoronto.ca", phone: "+1 416-978-2011", address: "27 King's College Circle, Toronto, ON" },
    scholarships: [
      { id: "s1", name: "Lester B. Pearson Scholarship", amount: "Full Tuition + Living", eligibility: "International students with exceptional academics", deadline: "2026-11-30" },
      { id: "s2", name: "President's Scholars of Excellence", amount: "$10,000/year", eligibility: "Outstanding academic achievement", deadline: "2026-12-15" },
    ],
    programs: [
      { id: "p1", universityId: "uni-1", universityName: "University of Toronto", name: "Computer Science", degree: "Bachelor", duration: "4 years", tuitionFee: 58680, currency: "CAD", ieltsRequirement: 6.5, intake: ["September", "January"], description: "A comprehensive program covering algorithms, AI, systems, and software engineering." },
      { id: "p2", universityId: "uni-1", universityName: "University of Toronto", name: "Data Science", degree: "Master", duration: "2 years", tuitionFee: 52400, currency: "CAD", ieltsRequirement: 7.0, intake: ["September"], description: "Advanced study in statistical learning, machine learning, and big data analytics." },
      { id: "p3", universityId: "uni-1", universityName: "University of Toronto", name: "Business Administration", degree: "Bachelor", duration: "4 years", tuitionFee: 55200, currency: "CAD", ieltsRequirement: 6.5, intake: ["September"], description: "Rotman Commerce program covering finance, accounting, and management." },
    ],
  },
  {
    id: "uni-2",
    name: "University of Melbourne",
    city: "Melbourne",
    country: "Australia",
    countryId: "AU",
    website: "https://unimelb.edu.au",
    description: "Australia's leading university, renowned for research excellence and graduate outcomes with beautiful parkland campus in Melbourne's cultural precinct.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop",
    ranking: 14,
    contact: { email: "admissions@unimelb.edu.au", phone: "+61 3 9035 5511", address: "Grattan Street, Parkville VIC 3010" },
    scholarships: [
      { id: "s3", name: "Melbourne International Scholarship", amount: "50% Fee Remission", eligibility: "High-achieving international students", deadline: "2026-10-31" },
    ],
    programs: [
      { id: "p4", universityId: "uni-2", universityName: "University of Melbourne", name: "Information Technology", degree: "Master", duration: "2 years", tuitionFee: 47200, currency: "AUD", ieltsRequirement: 6.5, intake: ["February", "July"], description: "Covers software development, AI, cybersecurity, and distributed systems." },
      { id: "p5", universityId: "uni-2", universityName: "University of Melbourne", name: "Engineering", degree: "Bachelor", duration: "3 years", tuitionFee: 49500, currency: "AUD", ieltsRequirement: 6.5, intake: ["February"], description: "Broad engineering foundation with specializations in civil, mechanical, and electrical." },
      { id: "p6", universityId: "uni-2", universityName: "University of Melbourne", name: "Finance", degree: "Master", duration: "1.5 years", tuitionFee: 45800, currency: "AUD", ieltsRequirement: 7.0, intake: ["February", "July"], description: "Advanced financial theory, investment analysis, and risk management." },
    ],
  },
  {
    id: "uni-3",
    name: "University of British Columbia",
    city: "Vancouver",
    country: "Canada",
    countryId: "CA",
    website: "https://ubc.ca",
    description: "A global center for teaching, learning and research, consistently ranked among the top 20 public universities in the world.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=400&fit=crop",
    ranking: 34,
    contact: { email: "international@ubc.ca", phone: "+1 604-822-2211", address: "2329 West Mall, Vancouver, BC" },
    scholarships: [
      { id: "s4", name: "International Leader of Tomorrow", amount: "Full Tuition", eligibility: "Demonstrated leadership & academic excellence", deadline: "2026-12-01" },
      { id: "s5", name: "Outstanding International Student Award", amount: "$5,000–$10,000", eligibility: "Academic merit", deadline: "2026-01-15" },
    ],
    programs: [
      { id: "p7", universityId: "uni-3", universityName: "University of British Columbia", name: "Computer Science", degree: "Master", duration: "2 years", tuitionFee: 9131, currency: "CAD", ieltsRequirement: 7.0, intake: ["September", "January"], description: "Research-oriented program in systems, theory, AI and HCI." },
      { id: "p8", universityId: "uni-3", universityName: "University of British Columbia", name: "Electrical Engineering", degree: "Bachelor", duration: "4 years", tuitionFee: 54540, currency: "CAD", ieltsRequirement: 6.5, intake: ["September"], description: "Comprehensive program covering circuits, signals, communications, and power systems." },
    ],
  },
  {
    id: "uni-4",
    name: "King's College London",
    city: "London",
    country: "United Kingdom",
    countryId: "UK",
    website: "https://kcl.ac.uk",
    description: "One of the world's top universities, located in the heart of London with outstanding reputation in health, humanities, law, and social sciences.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=400&fit=crop",
    ranking: 40,
    contact: { email: "international@kcl.ac.uk", phone: "+44 20 7836 5454", address: "Strand, London WC2R 2LS" },
    scholarships: [
      { id: "s6", name: "King's International Scholarship", amount: "£5,000/year", eligibility: "International postgraduate students", deadline: "2026-03-31" },
    ],
    programs: [
      { id: "p9", universityId: "uni-4", universityName: "King's College London", name: "Artificial Intelligence", degree: "Master", duration: "1 year", tuitionFee: 33400, currency: "GBP", ieltsRequirement: 7.0, intake: ["September"], description: "Cutting-edge AI program covering deep learning, NLP, computer vision, and robotics." },
      { id: "p10", universityId: "uni-4", universityName: "King's College London", name: "International Relations", degree: "Bachelor", duration: "3 years", tuitionFee: 22350, currency: "GBP", ieltsRequirement: 7.0, intake: ["September"], description: "Study global politics, diplomacy, security, and international organizations." },
      { id: "p11", universityId: "uni-4", universityName: "King's College London", name: "Law", degree: "Bachelor", duration: "3 years", tuitionFee: 24500, currency: "GBP", ieltsRequirement: 7.0, intake: ["September"], description: "Prestigious law program with strong focus on international and commercial law." },
    ],
  },
  {
    id: "uni-5",
    name: "Monash University",
    city: "Melbourne",
    country: "Australia",
    countryId: "AU",
    website: "https://monash.edu",
    description: "Australia's largest university with a global presence, known for impactful research and industry partnerships across six continents.",
    type: "Public",
    assessmentLevel: "Tier 2",
    logo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=400&fit=crop",
    ranking: 42,
    contact: { email: "study@monash.edu", phone: "+61 3 9902 6000", address: "Wellington Road, Clayton VIC 3800" },
    scholarships: [
      { id: "s7", name: "Monash International Merit Scholarship", amount: "$10,000/year", eligibility: "High academic achievers", deadline: "2026-08-31" },
    ],
    programs: [
      { id: "p12", universityId: "uni-5", universityName: "Monash University", name: "Cybersecurity", degree: "Master", duration: "2 years", tuitionFee: 44400, currency: "AUD", ieltsRequirement: 6.5, intake: ["February", "July"], description: "Advanced program covering network security, cryptography, and digital forensics." },
      { id: "p13", universityId: "uni-5", universityName: "Monash University", name: "Pharmacy", degree: "Bachelor", duration: "4 years", tuitionFee: 46000, currency: "AUD", ieltsRequirement: 6.5, intake: ["February"], description: "Comprehensive pharmacy program with clinical placements and research opportunities." },
    ],
  },
  {
    id: "uni-6",
    name: "Technical University of Munich",
    city: "Munich",
    country: "Germany",
    countryId: "DE",
    website: "https://tum.de",
    description: "Germany's top technical university, a powerhouse of engineering, natural sciences, and technology with strong industry connections.",
    type: "Public",
    assessmentLevel: "Tier 1",
    logo: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=100&h=100&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1597090297963-ef852bae1c58?w=800&h=400&fit=crop",
    ranking: 37,
    contact: { email: "studium@tum.de", phone: "+49 89 289 01", address: "Arcisstraße 21, 80333 München" },
    scholarships: [
      { id: "s8", name: "Deutschlandstipendium", amount: "€300/month", eligibility: "Talented students regardless of nationality", deadline: "2026-07-15" },
    ],
    programs: [
      { id: "p14", universityId: "uni-6", universityName: "Technical University of Munich", name: "Mechanical Engineering", degree: "Master", duration: "2 years", tuitionFee: 258, currency: "EUR", ieltsRequirement: 6.5, intake: ["October", "April"], description: "World-class engineering program with focus on automotive, aerospace, and robotics." },
      { id: "p15", universityId: "uni-6", universityName: "Technical University of Munich", name: "Computer Science", degree: "Bachelor", duration: "3 years", tuitionFee: 258, currency: "EUR", ieltsRequirement: 6.0, intake: ["October"], description: "Strong theoretical and practical CS education with opportunities in research and industry." },
    ],
  },
];

export const allPrograms: Program[] = mockUniversities.flatMap(u => u.programs);
