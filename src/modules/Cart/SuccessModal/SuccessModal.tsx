import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { Action } from '../../../context/CartContext';
import { Button } from '../../Shared/Button';
import { Title } from '../../Shared/Title';

import styles from './SuccessModal.module.scss';

type Props = {
  setModalVisibility: (visible: boolean) => void;
  nodeRef: React.MutableRefObject<null>;
  dispatch: React.Dispatch<Action>;
};

export const SuccessModal: React.FC<Props> = ({
  setModalVisibility,
  dispatch,
  nodeRef,
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setModalVisibility(false));

  const handleYesClick = () => {
    setModalVisibility(false);
    dispatch({ type: 'cart/clearCart' });
  };

  return (
    <div ref={nodeRef} className={styles.modal}>
      <div ref={ref} className={styles.modalContent}>
        <Title titleTag="h2" className={styles.titleModal}>
          Are you ready to complete the payment?
        </Title>
        <div className={styles.buttonGroup}>
          <Button className={styles.buttonYes} onClick={handleYesClick}>
            Yes
          </Button>
          <Button
            className={styles.buttonNo}
            onClick={() => setModalVisibility(false)}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
