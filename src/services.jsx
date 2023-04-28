const BACE_URL = 'https://pixabay.com/api';
const API_KEY = '34039766-687567eb1e3c3ba001a14a80f';

export function getImages(keyword, page) {
  return fetch(
    `${BACE_URL}/?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
