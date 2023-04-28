import { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalShown: false,
    modalImg: '',
    modalAlt: '',
  };

  // При натисненні на картинку зберігаємо її дані для модалки
  onSave = (img, alt) => {
    this.setState({
      isModalShown: true,
      modalImg: img,
      modalAlt: alt,
    });
  };

  // При натисненні виставляєм прапорець не показувати модалку
  onClose = () => {
    this.setState({
      isModalShown: false,
    });
  };

  render() {
    const { images } = this.props;
    const { isModalShown, modalImg, modalAlt } = this.state;

    return (
      <>
        <ListItem>
          <Image
            loading="lazy"
            src={images.webformatURL}
            alt={images.tags}
            onClick={() => {
              this.onSave(images.largeImageURL, images.tags);
            }}
          />
          {isModalShown && (
            <Modal alt={modalAlt} img={modalImg} onClose={this.onClose} />
          )}
        </ListItem>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.object,
};
