/* eslint-disable no-constant-condition */
import { Button } from '../Button';
import { SpriteIcon } from '../SpriteIcon';
import { Title } from '../Title';
import { Product } from '../../../types/Product';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

interface Props {
  product: Product;
  hasDiscountPrice?: boolean;
}

export const Card: React.FC<Props> = ({ product, hasDiscountPrice = true }) => {
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

  const { cart, dispatch } = useCart();

  const isProductInCart = cart.some((item) => item.id === id);

  const addToCartHandler = (productItem: Product) => {
    if (!isProductInCart) {
      dispatch({ type: 'cart/addItem', payload: productItem });
    }
  };

  const buttonText = isProductInCart ? 'Added to cart' : 'Add to cart';

  return (
    <article className={styles.card}>
      <Link to={`/${category}/${itemId}`}>
        <img src={image} alt={name} className={styles.image} />
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
            <span className={styles.detailsText}>Screen</span>
            <span>{screen}</span>
          </p>
          <p className={styles.details}>
            <span className={styles.detailsText}>Capacity</span>
            <span>{capacity}</span>
          </p>
          <p className={styles.details}>
            <span className={styles.detailsText}>RAM</span>
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
          <Button variant="favorites" maxWidth={40}>
            {true ? (
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
