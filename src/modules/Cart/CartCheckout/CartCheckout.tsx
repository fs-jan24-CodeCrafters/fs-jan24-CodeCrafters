import { useTranslation } from 'react-i18next';
import { Button } from '../../Shared/Button';
import { Title } from '../../Shared/Title';

import styles from './CartCheckout.module.scss';

interface Props {
  totalPrice: number;
  totalCartQuantity: number;
  isModalVisible: boolean;
  setModalVisibility: (isModalVisible: boolean) => void;
}

export const CartCheckout: React.FC<Props> = ({
  totalPrice,
  totalCartQuantity,
  isModalVisible,
  setModalVisibility,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.checkout}>
      <div className={styles.checkoutInfo}>
        <Title titleTag="h2">{`$${totalPrice}`}</Title>
        <Title
          className={styles.subTitle}
          titleTag="h5"
        >{`${t(`common:cart.totalFor`)} ${totalCartQuantity}`}</Title>
      </div>
      <Button
        className={styles.button}
        onClick={() => setModalVisibility(!isModalVisible)}
      >
        {t(`common:cart.checkout`)}
      </Button>
    </div>
  );
};
