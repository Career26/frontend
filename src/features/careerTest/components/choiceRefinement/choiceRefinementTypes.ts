export type CardInformation = {
  header: string;
  info: string;
  id: string;
};

export type TestResultCard = CardInformation & { reason: string; salary: string };
