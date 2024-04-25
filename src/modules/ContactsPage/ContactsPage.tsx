import { useTranslation } from 'react-i18next';
import { Container } from '../Shared/Container';
import { PersonContact } from '../../types/PersonContact';
import { PersonCard } from './PersonCard';
import { Title } from '../Shared/Title';

import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => {
  const { t } = useTranslation();

  const contactsData = t('common:contacts.people', {
    returnObjects: true,
  }) as PersonContact[];

  return (
    <Container className="section">
      <Title className={styles.title} titleTag="h1">
        {t('common:contacts.title')}
      </Title>
      <ul className={styles.list}>
        {contactsData.map((person) => (
          <li key={person.name} className={styles.item}>
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </Container>
  );
};
