export default function slugify(str) {
  if (!str || typeof str !== 'string') {
    return;
  }

  // noinspection NonAsciiCharacters
  const ru = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'j',
    з: 'z',
    и: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'e',
    ю: 'u',
    я: 'ya',
  };
  const nStr = [];

  str = str.toLowerCase();
  str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str
    .replace(/[^\w\sа-яё]/gi, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  for (let i = 0; i < str.length; ++i) {
    nStr.push(ru[str[i]] || str[i]);
  }

  return nStr.join('');
}
