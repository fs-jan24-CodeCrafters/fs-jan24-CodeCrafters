import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SpriteIcon } from '../SpriteIcon';

import styles from './BackLink.module.scss';

interface Props {
  path: string;
}

export const BackLink: React.FC<Props> = ({ path }) => {
  const { t } = useTranslation();

  return (
    <Link to={path} className={styles.link}>
      <SpriteIcon className={styles.icon} iconName="icon-Chevron-Arrow-Left" />
      <span className={styles.text}>{t(`common:back`)}</span>
    </Link>
  );
};
