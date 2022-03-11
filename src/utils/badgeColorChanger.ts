export const badgeColorChanger = (percent) => {
  if (!!percent && percent >= 0 && percent <= 20) {
    return '#BE3B21';
  }
  if (!!percent && percent > 20 && percent <= 40) {
    return '#EB4335';
  }
  if (!!percent && percent > 40 && percent <= 60) {
    return '#9F9F9F';
  }
  if (!!percent && percent > 60 && percent <= 80) {
    return '#34A853';
  }
  if (!!percent && percent > 80 && percent <= 100) {
    return '#248232';
  }
  return '#B0B0B0';
};

export default badgeColorChanger;
