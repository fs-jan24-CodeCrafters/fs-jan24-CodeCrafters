import { PersonContact } from '../../../types/PersonContact';
import { useIntersectionObserver } from 'usehooks-ts';

import classNames from 'classnames';
import styles from './PersonCard.module.scss';

interface Props {
  person: PersonContact;
}

export const PersonCard: React.FC<Props> = ({ person }) => {
  const { imgUrl, name, title, socialLinks } = person;

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: true,
  });

  return (
    <article
      ref={ref}
      className={classNames(styles.personCard, {
        'animate__animated animate__fadeIn animate__slow': isIntersecting,
      })}
    >
      <div className={styles.personImg}>
        <img src={imgUrl} alt={name} />
      </div>
      <div className={styles.infoBlock}>
        <h2 className={styles.title}>{name}</h2>
        <h3 className={styles.subTitle}>{title}</h3>
        <ul className={styles.iconsList}>
          {socialLinks.map((item) => (
            <li key={item.socialUrl} className={styles.iconsItem}>
              <a href={item.socialUrl} target="_blank" rel="noreferrer">
                <svg
                  className={classNames(styles.icon, {
                    [styles.iconGit]: item.iconName === 'git-hub-icon',
                  })}
                >
                  <use href={`/icons/symbol-defs.svg#${item.iconName}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
