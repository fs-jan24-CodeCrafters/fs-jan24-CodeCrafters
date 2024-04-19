import { Button } from '../../Shared/Button';
import styles from './SuccessModal.module.scss';
import { Title } from '../../Shared/Title';
import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
  setModalVisibility: (visible: boolean) => void;
  nodeRef: React.MutableRefObject<null>;
};

export const SuccessModal: React.FC<Props> = ({
  setModalVisibility,
  nodeRef,
}) => {
  const handleYesClick = () => {
    setModalVisibility(false);
  };

  const handleNoClick = () => {
    setModalVisibility(false);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => setModalVisibility(false));
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
          <Button className={styles.buttonNo} onClick={handleNoClick}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
