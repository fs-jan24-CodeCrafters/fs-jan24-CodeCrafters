import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import { Action } from '../../../context/CartContext';
import { Button } from '../../Shared/Button';
import { Title } from '../../Shared/Title';

import styles from './SuccessModal.module.scss';

type Props = {
  setModalVisibility: (visible: boolean) => void;
  nodeRef: React.MutableRefObject<null>;
  onConfirm: () => void;
  dispatch: React.Dispatch<Action>;
};

export const SuccessModal: React.FC<Props> = ({
  setModalVisibility,
  onConfirm,
  dispatch,
  nodeRef,
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setModalVisibility(false));

  const handleYesClick = () => {
    setModalVisibility(false);
    onConfirm();
    dispatch({ type: 'cart/clearCart' });
  };

  return (
    <div ref={nodeRef} className={styles.modal}>
      <div ref={ref} className={styles.modalContent}>
        <Title titleTag="h2" className={styles.titleModal}>
          {t(`common:cart.modalTitle`)}
        </Title>
        <div className={styles.buttonGroup}>
          <Button className={styles.buttonYes} onClick={handleYesClick}>
            {t(`common:cart.modalYes`)}
          </Button>
          <Button
            className={styles.buttonNo}
            onClick={() => setModalVisibility(false)}
          >
            {t(`common:cart.modalNo`)}
          </Button>
        </div>
      </div>
    </div>
  );
};
