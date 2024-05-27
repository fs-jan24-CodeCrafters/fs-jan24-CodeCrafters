import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Header } from '../modules/Header';
import { Main } from '../modules/Main';
import { Footer } from '../modules/Footer';
import { AuthScreenButton } from '../modules/AuthScreen/AuthScreenButton';
import { SuccessModal } from '../modules/AuthScreen/SuccessModal';
import { useSession } from '../context/SessionContext';

import styles from './Layout.module.scss';

export const Layout: React.FC = () => {
  const { dispatch } = useSession();
  const [isModalVisible, setModalVisibility] = useState(false);
  const nodeRef = useRef(null);

  const handleLogOut = () => {
    setModalVisibility(false);
    dispatch({ type: 'auth/clearUser' });
  };

  useEffect(() => {
    const body = document.body;
    body.classList.add(styles.bodyOverlay);
    if (
      isModalVisible &&
      document.documentElement.scrollHeight > window.innerHeight
    ) {
      body.classList.add('lock');
      body.classList.add(styles.bodyOverlayActive);
    } else if (isModalVisible) {
      body.classList.add(styles.bodyOverlayActive);
    } else {
      body.classList.remove(styles.bodyOverlayActive);
      body.classList.remove('lock');
    }

    return () => {
      document.body.classList.remove(styles.bodyOverlay);
    };
  }, [isModalVisible]);

  return (
    <>
      <Header />
      <Main>
        <Outlet />
        <AuthScreenButton
          setModalVisibility={setModalVisibility}
          isModalVisible={isModalVisible}
        ></AuthScreenButton>
        <CSSTransition
          in={isModalVisible}
          nodeRef={nodeRef}
          timeout={300}
          classNames={{
            enter: styles.modalEnter,
            enterActive: styles.modalEnterActive,
            exit: styles.modalExit,
            exitActive: styles.modalExitActive,
          }}
          unmountOnExit
        >
          <SuccessModal
            nodeRef={nodeRef}
            setModalVisibility={setModalVisibility}
            onConfirm={handleLogOut}
            dispatch={dispatch}
          />
        </CSSTransition>
      </Main>
      <Footer />
    </>
  );
};
