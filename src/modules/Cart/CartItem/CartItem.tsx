import { Product } from '../../../types/Product';
import { SpriteIcon } from '../../Shared/SpriteIcon';
import { Title } from '../../Shared/Title';
import styles from './CartItem.module.scss';

const MAX_QUANTITY_PER_ITEM = 99;

interface Props {
  product: Product;
  addToCart: (id: number) => void;
  removeFromCart: (id: number, removeItem?: boolean) => void;
}

export const CartItem: React.FC<Props> = ({
  product,
  addToCart,
  removeFromCart,
}) => {
  const { image, name, price, quantity, id } = product;

  return (
    <li className={styles.productItem}>
      <div className={styles.productDescription}>
        <button onClick={() => removeFromCart(id, true)}>
          <SpriteIcon className={styles.closeIcon} iconName="icon-Close" />
        </button>

        <img className={styles.productImage} src={image} alt={name} />
        <Title titleTag="h5">{name}</Title>
      </div>

      <div className={styles.productPrice}>
        <div className={styles.quantityButtons}>
          <button
            onClick={() => removeFromCart(id)}
            className={styles.quantityButton}
            disabled={quantity === 1}
          >
            <SpriteIcon iconName="icon-Minus" />
          </button>

          <span className={styles.quantityCounter}>{quantity}</span>

          <button
            disabled={quantity === MAX_QUANTITY_PER_ITEM}
            onClick={() => addToCart(id)}
            className={styles.quantityButton}
          >
            <SpriteIcon iconName="icon-Plus" />
          </button>
        </div>
        <Title titleTag="h3">{`$${price}`}</Title>
      </div>
    </li>
  );
};
