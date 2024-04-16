import { Button } from '../Button';
import { SpriteIcon } from '../SpriteIcon';
import { Title } from '../Title';
import { Product } from '../../../types/Product';
import styles from './Card.module.scss';

interface Props {
  product: Product;
}

export const Card: React.FC<Props> = ({ product }) => {
  const { name, fullPrice, price, screen, capacity, ram, image } = product;
  return (
    <li className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt="phone" />
      </div>
      <div>
        <Title titleTag="h5" className={styles.title}>
          {name}
        </Title>
        <div className={styles.priceContainer}>
          <Title titleTag="h3">{`$${price}`}</Title>
          <Title titleTag="h3" className={styles.salePrice}>
            {`$${fullPrice}`}
          </Title>
        </div>
        <div className={styles.detailsContainer}>
          <p className={styles.details}>
            <span>Screen</span>
            <span>{screen}</span>
          </p>
          <p className={styles.details}>
            <span>Capacity</span>
            <span>{capacity}</span>
          </p>
          <p className={styles.details}>
            <span>RAM</span>
            <span>{ram}</span>
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <Button>Add to card</Button>
          <Button variant="favorites" maxWidth={40}>
            {true ? (
              <SpriteIcon iconName="icon-Favorites" />
            ) : (
              <SpriteIcon iconName="icon-Favorites-Filled-Heart-Like" />
            )}
          </Button>
        </div>
      </div>
    </li>
  );
};
