import { useState, useEffect } from 'react';
import { getImages } from '../services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ImageGallery/ImageGallery.styled';

export const App = () => {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [findByKeyword, setFindByKeyword] = useState(true);

  // Отримуємо доступ до ключового слова / скидаємо прапорці в початковий стан
  const searchByKeyword = key => {
    const keywordValue = Object.values(key);
    setKeyword(keywordValue);
    setPage(1);
    setLoading(false);
    setTotal(1);
    setFindByKeyword(true);
  };

  // При кліку на кнопку змінюємо сторінку для пошуку
  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!keyword) {
      return;
    }

    getImages(keyword, page)
      .then(resp => resp.json())
      .then(response => {
        // console.log(response);
        // якщо нічого не знайдено - скидаємо всі прапорці та масив зображень
        if (response.total === 0) {
          setImages([]);
          setLoading(false);
          setFindByKeyword(false);
        }
        // Якщо отриманий масив не порожній то перезаписуємо масив зображень/вимикаємо спінер/
        // встановлюєм прапорець findByKeyword/ записуємо заг кількість результатів
        else {
          setImages(prevImages => [...prevImages, ...response.hits]);
          setLoading(false);
          setFindByKeyword(true);
          setTotal(response.total);
        }
      })
      .catch(error => console.error(error));
  }, [keyword, page]);

  return (
    <div>
      <Searchbar onSubmit={searchByKeyword} />

      {/* Перевіряємо чи знайшли фото по запиту - показуємо галерею/повідомлення про невдалий пошук */}
      {findByKeyword ? (
        <ImageGallery images={images} />
      ) : (
        <ErrorMessage>
          Sorry, we can't find photo by tag "{keyword}"
        </ErrorMessage>
      )}

      {/* Перевіряємо стан loading та показуємо спінер*/}
      {loading && <Loader />}

      {/* Перевіряємо кількість сторінок та показуємо кнопку "завантажити ще" */}
      {total / 12 > page && <Button onClick={onLoadMoreClick} />}
    </div>
  );
};
