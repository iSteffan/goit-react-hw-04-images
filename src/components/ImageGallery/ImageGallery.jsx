import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

// Транзитний елемент, слугує для передачі пропсів в li
export const ImageGallery = images => {
  return (
    <GalleryList>
      {images.images.map(item => (
        <ImageGalleryItem key={item.id} images={item} />
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
