export interface CareerPath {
  title: string;
  industry: string;
  startingSalary: string;
  role: string;
  selected: boolean;
}

export interface CareerResult {
  careerPaths: { [key: string]: CareerPath };
  identifier: string;
}
