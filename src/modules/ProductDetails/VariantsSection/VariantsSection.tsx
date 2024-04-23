import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import classNames from 'classnames';

import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { getProductByItemId } from '../../../helpers/getProductByItemId';
import { Title } from '../../Shared/Title';
import { Button } from '../../Shared/Button';
import { SpriteIcon } from '../../Shared/SpriteIcon';
import { ColorRadioButton } from './ColorRadioButton';
import { CapacityRadioButton } from './CapacityRadioButton';
import { ProductDetails } from '../../../types/ProductDetails';
import { Product } from '../../../types/Product';

import styles from './VariantsSection.module.scss';

interface Props {
  productDetails: ProductDetails;
  categoryName: string;
}

const getNewLinkByVariant = (
  id: string,
  index: number,
  param: string,
  type: string,
): string => {
  let link: string | string[] = id.split('-');
  const isTrickyColor =
    !link[link.length - 2].includes('mm') &&
    !link[link.length - 2].includes('gb') &&
    !link[link.length - 2].includes('tb');

  if (isTrickyColor && type === 'color') {
    link.splice(index - 1, 2, param);
  } else if (isTrickyColor) {
    link.splice(index - 1, 1, param);
  } else {
    link.splice(index, 1, param);
  }

  link = link.join('-');

  return link;
};

export const VariantsSection: React.FC<Props> = ({
  productDetails,
  categoryName,
}) => {
  const {
    id: itemId,
    images,
    color: currentColor,
    colorsAvailable,
    capacity: currentCapacity,
    screen,
    processor,
    resolution,
    ram,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    category,
  } = productDetails;

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const product = getProductByItemId(itemId) as Product;

  const { cart, dispatch } = useCart();

  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    if (isFavoriteProd) {
      toast.success('Product successfully removed from favorite!');
    } else {
      toast.success('Product successfully added to favorite!');
    }
  };

  const isProductInCart = cart.some((item) => item.id === product?.id);
  const isFavoriteProd = isFavorite(product);

  const isAccessories = categoryName === 'Accessories';

  const addToCartHandler = (productItem: Product) => {
    if (!isProductInCart) {
      dispatch({ type: 'cart/addItem', payload: productItem });
      toast.success('Product successfully added to cart!');
    }
  };

  const buttonText = isProductInCart ? 'Added to cart' : 'Add to cart';

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [product]);

  return (
    <section className={`${styles.variantsSection} section`}>
      <div className={styles.imagesBlock}>
        <div className={styles.squareImagesContainer}>
          {images.map((image) => (
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

      <div className={styles.mobileContainer}></div>
      <div className={styles.availableVariantsWrapper}>
        <div className={styles.categoryText}>
          <p>Available colors</p>

          <span>ID: 802390</span>
          {/* STATIC */}
        </div>

        <div className={styles.colorRadioWrapper}>
          {colorsAvailable.map((color) => {
            const TYPE = 'color';
            const normalizedColor = color.split(' ').join('-');
            const normalizedCurrentColor = currentColor.split(' ').join('-');
            const COLOR_INDEX = itemId.split('-').length - 1;

            const LINK =
              `/${category}/` +
              getNewLinkByVariant(itemId, COLOR_INDEX, normalizedColor, TYPE);

            return (
              <ColorRadioButton
                key={normalizedColor}
                currentColor={normalizedCurrentColor}
                color={normalizedColor}
                LINK={LINK}
              />
            );
          })}
        </div>

        <div className={styles.capacityContainer}>
          <p
            className={styles.categoryText}
          >{`Select ${isAccessories ? 'size' : 'capacity'}`}</p>

          <div className={styles.capacityRadioWrapper}>
            {capacityAvailable.map((capacity) => {
              const TYPE = 'capacity';
              const CAPACITY_INDEX = itemId.split('-').length - 2;
              const LINK =
                `/${category}/` +
                getNewLinkByVariant(
                  itemId,
                  CAPACITY_INDEX,
                  capacity.toLowerCase(),
                  TYPE,
                );

              return (
                <CapacityRadioButton
                  key={capacity}
                  currentCapacity={currentCapacity}
                  LINK={LINK}
                  capacity={capacity}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.priceContainer}>
            <Title
              titleTag="h3"
              className={styles.newPrice}
            >{`$${priceDiscount}`}</Title>

            <Title titleTag="h3" className={styles.salePrice}>
              {`$${priceRegular}`}
            </Title>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => addToCartHandler(product)}
              selected={isProductInCart}
            >
              {buttonText}
            </Button>

            <Button
              variant="favorites"
              maxWidth={40}
              selected={isFavoriteProd}
              onClick={handleToggleFavorite}
            >
              {!isFavoriteProd ? (
                <SpriteIcon iconName="icon-Favorites" />
              ) : (
                <SpriteIcon iconName="icon-Favorites-Filled-Heart-Like" />
              )}
            </Button>
          </div>

          <div className={styles.detailsContainer}>
            <p className={styles.details}>
              <span className={styles.detailsText}>Screen</span>
              <span>{screen}</span>
            </p>

            <p className={styles.details}>
              <span className={styles.detailsText}>Resolution</span>
              <span>{resolution}</span>
            </p>

            <p className={styles.details}>
              <span className={styles.detailsText}>Processor</span>
              <span>{processor}</span>
            </p>

            <p className={styles.details}>
              <span className={styles.detailsText}>RAM</span>
              <span>{ram}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
