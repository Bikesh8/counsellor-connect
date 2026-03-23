export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  gpa: string;
  qualification: string;
  year: string;
  testScore: string;
  createdDate: string;
  country: string;
  program: string;
  source: string;
  counsellor: string;
  counsellorInitials: string;
  status: "New" | "Prospect";
  stage: "New Lead" | "Contacted" | "Interested" | "Counselling" | "Application Started" | "Applied" | "Offer Received" | "Visa Process" | "Converted" | "Lost";
  priority: "High" | "Medium" | "Low";
  branch: string;
  callDetails: string;
  nextFollowUp?: string;
  isOverdue?: boolean;
  notes?: Note[];
}

export interface Note {
  id: number;
  text: string;
  createdAt: string;
  author: string;
}

export const COUNSELLOR_NAME = "Sarah Mitchell";
export const COUNSELLOR_INITIALS = "SM";

export const mockLeads: Lead[] = [
  {
    id: 1, name: "John Doe", phone: "+1 555-0101", email: "john.doe@email.com",
    gpa: "3.7", qualification: "Bachelor's", year: "2023", testScore: "IELTS: 7.5 (L: 6.5)",
    createdDate: "Jan 15, 2025", country: "Canada", program: "MBA", source: "Website",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "Prospect",
    stage: "Interested", priority: "High", branch: "Main Branch",
    callDetails: "Student is keen on Fall intake. W...", nextFollowUp: "2025-03-14",
    isOverdue: true,
    notes: [
      { id: 1, text: "Student is very interested in Fall 2025 intake at UofT", createdAt: "Jan 16, 2025", author: "Sarah Mitchell" },
      { id: 2, text: "Called and discussed scholarship options", createdAt: "Feb 02, 2025", author: "Sarah Mitchell" },
    ],
  },
  {
    id: 2, name: "Sara Khan", phone: "+44 7700 900001", email: "sara.khan@email.com",
    gpa: "3.4", qualification: "Higher Secondary", year: "2024", testScore: "IELTS: 7.5 (L: 7.0)",
    createdDate: "Feb 01, 2025", country: "Australia", program: "Bachelor of Nursing", source: "Referral",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "Prospect",
    stage: "Application Started", priority: "Medium", branch: "Downtown Office",
    callDetails: "No calls",
    notes: [{ id: 1, text: "Interested in nursing programs in Melbourne", createdAt: "Feb 02, 2025", author: "Sarah Mitchell" }],
  },
  {
    id: 3, name: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul.sharma@email.com",
    gpa: "8.5/10", qualification: "Bachelor's", year: "2024", testScore: "PTE: 72 (L: 65)",
    createdDate: "Jan 20, 2025", country: "UK", program: "MSc Computer Science", source: "Social Media",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "Prospect",
    stage: "Counselling", priority: "High", branch: "Westside Branch",
    callDetails: "No calls",
    notes: [],
  },
  {
    id: 4, name: "Maria Garcia", phone: "+34 612 345 678", email: "maria.garcia@email.com",
    gpa: "3.9", qualification: "Bachelor's", year: "2022", testScore: "IELTS: 8.0 (L: 7.5)",
    createdDate: "Mar 10, 2025", country: "USA", program: "MBA", source: "Education Fair",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "New",
    stage: "New Lead", priority: "Medium", branch: "Main Branch",
    callDetails: "No calls",
    notes: [],
  },
  {
    id: 5, name: "Ahmed Hassan", phone: "+20 100 123 4567", email: "ahmed.hassan@email.com",
    gpa: "3.2", qualification: "Bachelor's", year: "2023", testScore: "IELTS: 6.5 (L: 6.0)",
    createdDate: "Feb 28, 2025", country: "Germany", program: "MSc Engineering", source: "Google Ads",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "New",
    stage: "Contacted", priority: "Low", branch: "North Campus",
    callDetails: "No calls",
    notes: [],
  },
  {
    id: 6, name: "Priya Patel", phone: "+91 87654 32100", email: "priya.patel@email.com",
    gpa: "3.6", qualification: "Bachelor's", year: "2024", testScore: "IELTS: 7.0 (L: 7.0)",
    createdDate: "Mar 05, 2025", country: "Canada", program: "MSc Data Science", source: "Website",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "Prospect",
    stage: "Applied", priority: "High", branch: "Main Branch",
    callDetails: "Application submitted", nextFollowUp: "2025-03-20",
    notes: [],
  },
  {
    id: 7, name: "Li Wei", phone: "+86 138 0001 2345", email: "li.wei@email.com",
    gpa: "3.8", qualification: "Bachelor's", year: "2023", testScore: "IELTS: 7.0 (L: 6.5)",
    createdDate: "Jan 05, 2025", country: "Australia", program: "Master of IT", source: "Referral",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "Prospect",
    stage: "Offer Received", priority: "Medium", branch: "Downtown Office",
    callDetails: "Offer from UniMelb", nextFollowUp: "2025-03-25",
    notes: [],
  },
  {
    id: 8, name: "Fatima Al-Rashid", phone: "+971 50 123 4567", email: "fatima.alrashid@email.com",
    gpa: "3.5", qualification: "Bachelor's", year: "2024", testScore: "IELTS: 6.5 (L: 6.0)",
    createdDate: "Feb 15, 2025", country: "UK", program: "MBA", source: "Social Media",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "New",
    stage: "New Lead", priority: "Low", branch: "Westside Branch",
    callDetails: "No calls",
    notes: [],
  },
  {
    id: 9, name: "Carlos Rodriguez", phone: "+52 55 1234 5678", email: "carlos.r@email.com",
    gpa: "3.3", qualification: "Bachelor's", year: "2023", testScore: "PTE: 68 (L: 62)",
    createdDate: "Mar 18, 2025", country: "USA", program: "MS Finance", source: "Education Fair",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "Prospect",
    stage: "Visa Process", priority: "High", branch: "Main Branch",
    callDetails: "Visa docs submitted", nextFollowUp: "2025-03-22", isOverdue: true,
    notes: [],
  },
  {
    id: 10, name: "Aiko Tanaka", phone: "+81 90 1234 5678", email: "aiko.tanaka@email.com",
    gpa: "3.9", qualification: "Master's", year: "2022", testScore: "IELTS: 8.0 (L: 8.0)",
    createdDate: "Dec 20, 2024", country: "Canada", program: "PhD Computer Science", source: "Website",
    counsellor: "Sarah Mitchell", counsellorInitials: "SM", status: "Prospect",
    stage: "Converted", priority: "Medium", branch: "North Campus",
    callDetails: "Enrolled at UofT",
    notes: [{ id: 1, text: "Successfully enrolled at University of Toronto", createdAt: "Dec 28, 2024", author: "Sarah Mitchell" }],
  },
];

export interface Task {
  id: number;
  leadName: string;
  type: "Follow-up" | "Document Review" | "Counselling Session" | "Application Check";
  dueDate: string;
  status: "today" | "upcoming" | "overdue";
  description: string;
  completed?: boolean;
}

export const mockTasks: Task[] = [
  { id: 1, leadName: "John Doe", type: "Follow-up", dueDate: "Today", status: "today", description: "Follow up on Fall intake interest", completed: false },
  { id: 2, leadName: "Carlos Rodriguez", type: "Document Review", dueDate: "Today", status: "today", description: "Review visa documents", completed: false },
  { id: 3, leadName: "Sara Khan", type: "Counselling Session", dueDate: "Tomorrow", status: "upcoming", description: "Discuss nursing program options", completed: false },
  { id: 4, leadName: "Priya Patel", type: "Application Check", dueDate: "Mar 25", status: "upcoming", description: "Check application status at UBC", completed: false },
  { id: 5, leadName: "Li Wei", type: "Follow-up", dueDate: "Mar 25", status: "upcoming", description: "Discuss offer acceptance", completed: false },
  { id: 6, leadName: "John Doe", type: "Follow-up", dueDate: "Mar 14", status: "overdue", description: "Was supposed to follow up about intake", completed: false },
  { id: 7, leadName: "Carlos Rodriguez", type: "Follow-up", dueDate: "Mar 22", status: "overdue", description: "Visa document follow-up overdue", completed: false },
];
