import { useState } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ images }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  // При натисненні на картинку зберігаємо її дані для модалки
  const onSave = (img, alt) => {
    setIsModalShown(true);
    setModalImg(img);
    setModalAlt(alt);
  };

  // При натисненні виставляєм прапорець не показувати модалку
  const onClose = () => {
    setIsModalShown(false);
  };

  return (
    <>
      <ListItem>
        <Image
          loading="lazy"
          src={images.webformatURL}
          alt={images.tags}
          onClick={() => {
            onSave(images.largeImageURL, images.tags);
          }}
        />
        {isModalShown && (
          <Modal alt={modalAlt} img={modalImg} onClose={onClose} />
        )}
      </ListItem>
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.object,
};
