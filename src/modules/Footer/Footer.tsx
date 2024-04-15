import { Container } from '../Shared/Container';
import { SpriteIcon } from '../Shared/SpriteIcon';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <SpriteIcon
          iconName="icon-Chevron-Arrow-Left"
          className={styles.icon}
        />
      </Container>
    </footer>
  );
};
