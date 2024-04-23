import { CSSTransition, TransitionGroup } from 'react-transition-group';
import toast from 'react-hot-toast';

import { Action } from '../../../context/CartContext';
import { SpriteIcon } from '../../Shared/SpriteIcon';
import { Title } from '../../Shared/Title';
import { Product } from '../../../types/Product';

import styles from './CartItems.module.scss';

const MAX_QUANTITY_PER_ITEM = 99;

interface Props {
  cart: Product[];
  dispatch: React.Dispatch<Action>;
}

export const CartItems: React.FC<Props> = ({ dispatch, cart }) => {
  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'cart/removeItem', payload: id });
    toast.success('Product successfully removed from cart!');
  };

  return (
    <ul>
      <TransitionGroup>
        {cart.map((item) => {
          const { image, name, price, quantity, id } = item;

          return (
            <CSSTransition
              key={id}
              timeout={300}
              classNames={{
                exit: styles.cartItemExit,
                exitActive: styles.cartItemExitActive,
              }}
            >
              <li className={styles.productItem}>
                <div className={styles.productDescription}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveItem(id)}
                  >
                    <SpriteIcon
                      className={styles.closeIcon}
                      iconName="icon-Close"
                    />
                  </button>

                  <img className={styles.productImage} src={image} alt={name} />
                  <Title titleTag="h5">{name}</Title>
                </div>

                <div className={styles.productPrice}>
                  <div className={styles.quantityButtons}>
                    <button
                      onClick={() =>
                        dispatch({
                          type: 'cart/decreaseQuantity',
                          payload: id,
                        })
                      }
                      className={styles.quantityButton}
                      disabled={quantity === 1}
                    >
                      <SpriteIcon iconName="icon-Minus" />
                    </button>

                    <span className={styles.quantityCounter}>{quantity}</span>

                    <button
                      disabled={quantity === MAX_QUANTITY_PER_ITEM}
                      onClick={() =>
                        dispatch({
                          type: 'cart/increaseQuantity',
                          payload: id,
                        })
                      }
                      className={styles.quantityButton}
                    >
                      <SpriteIcon iconName="icon-Plus" />
                    </button>
                  </div>
                  <Title titleTag="h3">{`$${price}`}</Title>
                </div>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </ul>
  );
};
