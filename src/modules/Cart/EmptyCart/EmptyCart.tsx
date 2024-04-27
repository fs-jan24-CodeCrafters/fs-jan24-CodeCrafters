import { useTranslation } from 'react-i18next';
import { ContinueShoppingLink } from '../../Shared/ContinueShoppingLink';
import { Title } from '../../Shared/Title';

import styles from './EmptyCart.module.scss';

interface Props {
  isPaymentSuccess: boolean;
}

export const EmptyCart: React.FC<Props> = ({ isPaymentSuccess }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.body}>
      <div className={styles.titleBox}>
        <Title titleTag="h2">
          {isPaymentSuccess
            ? t(`common:cart.successPayment`)
            : t(`common:cart.empty`)}
        </Title>
        <Title titleTag="h4">
          {isPaymentSuccess
            ? t(`common:cart.successPaymentDesc`)
            : t(`common:cart.emptyDesc`)}
        </Title>
      </div>
      <div className={styles.image}>
        <svg className={styles.icon}>
          <use
            href={
              isPaymentSuccess
                ? `/icons/symbol-defs.svg#icon-delivery-man`
                : `/icons/symbol-defs.svg#icon-man-with-cart`
            }
          />
        </svg>
      </div>
      <span className={styles.line}></span>
      <ContinueShoppingLink />
    </div>
  );
};
