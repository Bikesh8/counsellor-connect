export interface Agency {
  id: number;
  name: string;
  branches: AgencyBranch[];
}

export interface AgencyBranch {
  id: number;
  name: string;
  location: string;
}

export const mockAgencies: Agency[] = [
  {
    id: 1,
    name: "Global Education Partners",
    branches: [
      { id: 1, name: "Main Branch", location: "New York, USA" },
      { id: 2, name: "Downtown Office", location: "Manhattan, USA" },
      { id: 3, name: "Westside Branch", location: "Brooklyn, USA" },
    ],
  },
  {
    id: 2,
    name: "Study World Consultancy",
    branches: [
      { id: 4, name: "Head Office", location: "London, UK" },
      { id: 5, name: "North Campus", location: "Manchester, UK" },
    ],
  },
];

export const CURRENT_AGENCY_ID = 1;
export const CURRENT_BRANCH_ID = 1;
