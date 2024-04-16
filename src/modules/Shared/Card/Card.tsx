import classNames from 'classnames';
import { Button } from '../Button';
import { SpriteIcon } from '../SpriteIcon';
import styles from './Card.module.scss';
import { Title } from '../Title';

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src="/" alt="phone" />
      </div>
      <div>
        <Title titleTag="h5" className={styles.title}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit consectetur
          adipisicing elit. ipsum dolor sit, amet consectetur adipisicing elit
          consectetur adipisicing elit.
        </Title>
        <p className={styles.priceContainer}>
          <Title titleTag="h3">$799</Title>
          <Title titleTag="h3" className={styles.salePrice}>
            $1199
          </Title>
        </p>
        <div className={styles.detailsContainer}>
          <p className={styles.details}>
            <span>Screen</span>
            <span>6.5” OLED</span>
          </p>
          <p className={styles.details}>
            <span>Capacity</span>
            <span>64 GB</span>
          </p>
          <p className={styles.details}>
            <span>RAM</span>
            <span>4 GB</span>
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
    </div>
  );
};
