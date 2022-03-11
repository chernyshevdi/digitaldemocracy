import green from 'src/icons/pictures/carouselImageFrame/green.png';
import second_green from 'src/icons/pictures/carouselImageFrame/second_green.png';
import gray from 'src/icons/pictures/carouselImageFrame/gray.png';
import red from 'src/icons/pictures/carouselImageFrame/red.png';
import second_red from 'src/icons/pictures/carouselImageFrame/second_red.png';

export const avatarColorChanger = (percent) => {
  // const number = [...percent]
  //   .filter((it) => !!parseInt(it, 10) || parseInt(it, 10) === 0)
  //   .reduce((acc, rec, index, array) => {
  //     return acc * 10 + parseInt(rec, 10);
  //   }, 0);
  if (!!percent && percent >= 0 && percent <= 20) {
    return red;
  }
  if (!!percent && percent > 20 && percent <= 40) {
    return second_red;
  }
  if (!!percent && percent > 40 && percent <= 60) {
    return gray;
  }
  if (!!percent && percent > 60 && percent <= 80) {
    return second_green;
  }
  if (!!percent && percent > 80 && percent <= 100) {
    return green;
  }
  return gray;
};

export default avatarColorChanger;
