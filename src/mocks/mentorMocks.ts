import { ExperienceType, Gender } from '@datatypes/profile';
import type { Mentor } from '@datatypes/mentor';

export const mentorList: Mentor[] = [1, 2, 3, 4, 5, 6].map((id) => ({
  id: `mentor-${id}`,
  name: `Mentor Name ${id}`,
  email: `mentor-${id}@something.com`,
  degree: {
    name: `Course Name ${id}`,
    university: `University Name ${id}`,
    level: 'MA',
  },
  experience: {
    experienceName: `Company Name ${id}`,
    experienceType: ExperienceType.Company,
    role: `Role Name ${id}`,
  },
  gender: id % 2 === 0 ? Gender.Male : Gender.Female,
  img: '',
  industry: `Industry ${id}`,
  reason:
    "X's experience in blah aligns with your passion for blah. You share similar backgrounds, being the first generation in your family to go to university. Their work in blah also provides opportunities for you to explore blah, something which we believe suits your career path X.",
}));
