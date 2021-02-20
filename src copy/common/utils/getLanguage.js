export default function getLanguage(lang) {
  if (lang === 'ru' || lang === 'ua') {
    return lang;
  }
  return 'en';
}
