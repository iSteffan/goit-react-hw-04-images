import { Component } from 'react';
import { getImages } from '../services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ImageGallery/ImageGallery.styled';

export class App extends Component {
  state = {
    keyword: '',
    images: [],
    page: 1,
    loading: false,
    total: 1,
    findByKeyword: true,
  };

  // Отримуємо доступ до ключового слова / скидаємо прапорці в початковий стан
  searchByKeyword = key => {
    const keywordValue = Object.values(key);
    this.setState({
      keyword: keywordValue,
      page: 1,
      loading: false,
      total: 1,
      findByKeyword: true,
    });
  };

  // При кліку на кнопку змінюємо сторінку для пошуку
  onLoadMoreClick = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1,
    }));
  };

  setImages = (keyword, page) => {
    getImages(keyword, page)
      .then(resp => resp.json())
      .then(response => {
        // console.log(response);
        // якщо нічого не знайдено - скидаємо всі прапорці та масив зображень
        if (response.total === 0) {
          this.setState({
            images: [],
            loading: false,
            findByKeyword: false,
          });
        }
        // Якщо отриманий масив не порожній то перезаписуємо масив зображень/вимикаємо спінер/
        // встановлюєм прапорець findByKeyword/ записуємо заг кількість результатів
        else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            loading: false,
            findByKeyword: true,
            total: response.total,
          }));
        }
      })
      .catch(error => console.error(error));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      prevState.keyword !== this.state.keyword
        ? this.setState({ loading: true, images: [] })
        : this.setState({ loading: true });

      this.setImages(this.state.keyword, this.state.page);
    }
  }

  render() {
    const { images, keyword, loading, total, findByKeyword, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.searchByKeyword} />

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
        {total / 12 > page && <Button onClick={this.onLoadMoreClick} />}
      </div>
    );
  }
}
