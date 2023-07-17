import { CardInformation } from '../features/careersTest/careersTestTypes';

const blahBlahBlah = 'blah blah blah blah blah blah blah blah blah';

export const mockCardData: CardInformation[] = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  id: String(i),
  jobTitle: `Job Title ${i}`,
  industry: `Industry ${i} ${blahBlahBlah}`,
  info: `A career ${i} ${blahBlahBlah}`,
  reason: `Your interest in ${i} ${blahBlahBlah}`,
  salary: `£1${i},000 - £2${i},000`,
}));
