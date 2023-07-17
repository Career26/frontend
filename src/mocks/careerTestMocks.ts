import {
  CardInformation,
  TestResultCard,
} from '../features/careerTest/components/choiceRefinement/choiceRefinementTypes';

const blahBlahBlah = 'blah blah blah blah blah blah blah blah blah';

export const mockCardData: CardInformation[] = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  id: String(i),
  header: `Indudstry ${i}`,
  info: `Info about industry ${i} ${blahBlahBlah}`,
}));

export const mockTestResultData: TestResultCard[] = mockCardData.map((card) => ({
  ...card,
  reason: `You like STEM and have a background in ${card.id} ${blahBlahBlah}`,
  salary: `£1${card.id},000 - £2${card.id},000`,
}));
