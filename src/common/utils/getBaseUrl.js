export default function getBaseUrl() {
  if (window.origin.includes('the-beat.cc')) {
    return 'https://tbb.the-beat.cc/';
  }
  if (__DEV__) {
    return 'http://localhost:5000';
  }
  return window.origin;
}
