export type CareerPath = {
  companies: string[];
  industry: string;
  reason: string;
  role: string;
  skills: string[];
  startingSalary: string;
  title: string;
};

export type CareerResult = {
  careerPaths: { [key: string]: CareerPath };
  identifier: string;
};
