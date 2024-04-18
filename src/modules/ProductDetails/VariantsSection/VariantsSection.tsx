import { useState } from 'react';
import classNames from 'classnames';

import styles from './VariantsSection.module.scss';
import { ProductDetails } from '../../../types/ProductDetails';

interface Props {
  product: ProductDetails;
}

export const VariantsSection: React.FC<Props> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <section className={styles.variantsSection}>
      <div className={styles.imagesBlock}>
        <div className={styles.squareImagesContainer}>
          {product.images.map((image) => (
            <button key={image} className={styles.squareImageWrapper}>
              <img
                className={classNames(styles.squareImage, {
                  [styles['selectedSquareImage']]: selectedImage === image,
                })}
                src={image}
                alt="Product image"
                onClick={() => setSelectedImage(image)}
              />
            </button>
          ))}
        </div>

        <div className={styles.selectedImageWrapper}>
          <img
            src={selectedImage}
            alt="Product image"
            className={styles.selectedImage}
          />
        </div>
      </div>
    </section>
  );
};
