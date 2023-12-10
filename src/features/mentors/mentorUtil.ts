import femaleImg from '@assets/noImageFemale.png';
import maleImg from '@assets/noImageMale.png';
import otherImg from '@assets/noImageOther.png';
import { Gender } from '@datatypes/profile';

export const getSrc = (img: string, gender: Gender) => {
  if (img) {
    return img;
  }
  if (gender === Gender.Male) {
    return maleImg;
  }
  return gender === Gender.Female ? femaleImg : otherImg;
};
