import { useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { Title } from '../../Shared/Title';
import { Button } from '../../Shared/Button';
import { SpriteIcon } from '../../Shared/SpriteIcon';
import { ColorRadioButton } from './ColorRadioButton';
import { CapacityRadioButton } from './CapacityRadioButton';
import { ProductDetails } from '../../../types/ProductDetails';
import { Product } from '../../../types/Product';
import { Loader } from '../../Shared/Loader';
import { getProductByItemId } from '../../../api/products';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import 'swiper/css';
import styles from './VariantsSection.module.scss';

interface Props {
  productDetails: ProductDetails;
  categoryName: string;
  isLoading: boolean;
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
  isLoading,
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
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [swiperRef, setSwiperRef] = useState<null | SwiperClass>(null);

  const { data: product } = useQuery({
    queryKey: ['product', itemId],
    queryFn: () => getProductByItemId(itemId),
    placeholderData: keepPreviousData,
  });

  const { cart, dispatch } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = () => {
    toggleFavorite(product!);
    if (isFavoriteProd) {
      toast.success(t(`common:toast.favoritesRemoved`));
    } else {
      toast.success(t(`common:toast.favoritesRemoved`));
    }
  };

  const isProductInCart = cart.some((item) => item.id === product?.id);
  const isFavoriteProd = isFavorite(product!);

  const isAccessories = categoryName === 'Accessories';

  const addToCartHandler = (productItem: Product) => {
    if (!isProductInCart) {
      dispatch({ type: 'cart/addItem', payload: productItem });
      toast.success(t(`common:toast.addedToCart`));
    }
  };

  const slideTo = (index: number) => {
    swiperRef?.slideTo(index, 300);
  };

  const buttonText = isProductInCart
    ? t(`common:product.addedToCart`)
    : t(`common:product.addToCart`);

  useEffect(() => {
    slideTo(0);
  }, [product]);

  return (
    <section className={`${styles.variantsSection} section`}>
      <div className={styles.imagesBlock}>
        <div className={styles.squareImagesContainer}>
          {images.map((image, index) => (
            <button
              key={image}
              className={styles.squareImageWrapper}
              onClick={() => {
                slideTo(index);
              }}
            >
              {isLoading ? (
                <Loader />
              ) : (
                <img
                  className={classNames(styles.squareImage, {
                    [styles['selectedSquareImage']]: selectedImage === image,
                  })}
                  src={image}
                  alt={product?.name}
                />
              )}
            </button>
          ))}
        </div>

        <div className={styles.selectedImageWrapper}>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => {
              setSelectedImage(images[swiper.realIndex]);
            }}
          >
            {images.map((image) => (
              <SwiperSlide key={image}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <img
                    key={`${image}_image`}
                    src={image}
                    alt={product?.name}
                    className={styles.selectedImage}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className={styles.mobileContainer}></div>
      <div className={styles.availableVariantsWrapper}>
        <div className={styles.categoryText}>
          <p>{t(`common:product.availableColors`)}</p>

          {/* <span>ID: {product?.id}</span> */}
        </div>

        <div className={styles.colorRadioWrapper}>
          {colorsAvailable.map((color) => {
            const type = 'color';
            const normalizedColor = color.split(' ').join('-');
            const normalizedCurrentColor = currentColor.split(' ').join('-');
            const colorIndex = itemId.split('-').length - 1;

            const link =
              `/${category}/` +
              getNewLinkByVariant(itemId, colorIndex, normalizedColor, type);

            return (
              <ColorRadioButton
                key={normalizedColor}
                currentColor={normalizedCurrentColor}
                color={normalizedColor}
                link={link}
              />
            );
          })}
        </div>

        <div className={styles.capacityContainer}>
          <p
            className={styles.categoryText}
          >{`${t(`common:product.select`)} ${isAccessories ? t(`common:product.size`) : t(`common:product.capacity`)}`}</p>

          <div className={styles.capacityRadioWrapper}>
            {capacityAvailable.map((capacity) => {
              const type = 'capacity';
              const capacityIndex = itemId.split('-').length - 2;
              const link =
                `/${category}/` +
                getNewLinkByVariant(
                  itemId,
                  capacityIndex,
                  capacity.toLowerCase(),
                  type,
                );

              return (
                <CapacityRadioButton
                  key={capacity}
                  currentCapacity={currentCapacity}
                  link={link}
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
              onClick={() => addToCartHandler(product!)}
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
              <span className={styles.detailsText}>
                {t(`common:product.screen`)}
              </span>
              <span>{screen}</span>
            </p>

            <p className={styles.details}>
              <span className={styles.detailsText}>
                {t(`common:product.resolution`)}
              </span>
              <span>{resolution}</span>
            </p>

            <p className={styles.details}>
              <span className={styles.detailsText}>
                {t(`common:product.processor`)}
              </span>
              <span>{processor}</span>
            </p>

            <p className={styles.details}>
              <span className={styles.detailsText}>
                {t(`common:product.ram`)}
              </span>
              <span>{ram}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
