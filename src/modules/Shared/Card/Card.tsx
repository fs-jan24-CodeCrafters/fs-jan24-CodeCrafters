import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useFavorites } from '../../../context/FavoritesContext';
import { useCart } from '../../../context/CartContext';
import { Button } from '../Button';
import { SpriteIcon } from '../SpriteIcon';
import { Title } from '../Title';
import { Product } from '../../../types/Product';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';

import styles from './Card.module.scss';

interface Props {
  product: Product;
  hasDiscountPrice?: boolean;
  isLazy?: boolean;
}

export const Card: React.FC<Props> = ({
  product,
  hasDiscountPrice = true,
  isLazy = false,
}) => {
  const {
    id,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    category,
    itemId,
  } = product;
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { cart, dispatch } = useCart();

  const isProductInCart = cart.some((item) => item.id === id);
  const isFavoriteProd = isFavorite(product);

  const addToCartHandler = (productItem: Product) => {
    if (!isProductInCart) {
      dispatch({ type: 'cart/addItem', payload: productItem });
      toast.success(t(`common:toast.addedToCart`));
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    if (isFavoriteProd) {
      toast.success(t(`common:toast.favoritesRemoved`));
    } else {
      toast.success(t(`common:toast.favoritesAdded`));
    }
  };

  const buttonText = isProductInCart
    ? t(`common:product.addedToCart`)
    : t(`common:product.addToCart`);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <article className={styles.card}>
      <Link className={styles.imgLink} to={`/${category}/${itemId}`}>
        {!isLoading && <Loader className={styles.loader} />}
        <img
          className={styles.image}
          loading={isLazy ? 'lazy' : 'eager'}
          height={220}
          src={image}
          alt={name}
          onLoad={() => setIsLoading(true)}
          style={{ opacity: isLoading ? 1 : 0 }}
        />
      </Link>
      <div className={styles.cardBody}>
        <Link to={`/${category}/${itemId}`} className={styles.titleLink}>
          <Title titleTag="h5">{name}</Title>
        </Link>
        <div className={styles.priceContainer}>
          <Title titleTag="h3">{`$${price}`}</Title>
          {hasDiscountPrice && (
            <Title titleTag="h3" className={styles.salePrice}>
              {`$${fullPrice}`}
            </Title>
          )}
        </div>
        <div className={styles.detailsContainer}>
          <p className={styles.details}>
            <span className={styles.detailsText}>
              {t(`common:card.screen`)}
            </span>
            <span>{screen}</span>
          </p>
          <p className={styles.details}>
            <span className={styles.detailsText}>
              {t(`common:card.capacity`)}
            </span>
            <span>{capacity}</span>
          </p>
          <p className={styles.details}>
            <span className={styles.detailsText}>{t(`common:card.ram`)}</span>
            <span>{ram}</span>
          </p>
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
            selected={isFavoriteProd}
            maxWidth={40}
            onClick={handleToggleFavorite}
          >
            {!isFavoriteProd ? (
              <SpriteIcon iconName="icon-Favorites" />
            ) : (
              <SpriteIcon iconName="icon-Favorites-Filled-Heart-Like" />
            )}
          </Button>
        </div>
      </div>
    </article>
  );
};
