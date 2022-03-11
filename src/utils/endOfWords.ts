interface IStrings {
  one: string,
  many: string
}

export const endOfWords = (obj, strings: IStrings, lang: string) => {
  if ([...obj.toString()].length >= 2) {
    if (
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] ===
        '11' ||
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] ===
        '12' ||
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] ===
        '13' ||
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] === '14'
    ) {
      return strings.many;
    }
  }
  if ([...obj.toString()][[...obj.toString()].length - 1] === '1') {
    return strings.one;
  }
  if (
    [...obj.toString()][[...obj.toString()].length - 1] === '2' ||
    [...obj.toString()][[...obj.toString()].length - 1] === '3' ||
    [...obj.toString()][[...obj.toString()].length - 1] === '4'
  ) {
    return lang.startsWith('ru') ? `${strings.one}а` : strings.many;
  }
  return strings.many;
};
