import { Link } from 'react-router-dom';
import { Title } from '../../../Shared/Title';
import { Product } from '../../../../types/Product';
import styles from './SearchResults.module.scss';

interface Props {
  searchResults: Record<string, Product[]>;
}

export const SearchResults: React.FC<Props> = ({ searchResults }) => {
  const categories = Object.keys(searchResults);

  return (
    <>
      <div className={styles.searchResultsContainer}>
        {categories.length ? (
          categories.map((category) => (
            <div key={category} className={styles.searchResultsByCategory}>
              <Title
                titleTag="h5"
                className={styles.searchResultsByCategoryTitle}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Title>
              <ul className={styles.searchResultsList}>
                {searchResults[category].map((product) => (
                  <li key={product.itemId} className={styles.searchResultItem}>
                    <Link
                      className={styles.searchResultItemLink}
                      to={`/${category}/${product.itemId}`}
                    >
                      <img
                        src={product.image}
                        className={styles.searchResultItemImage}
                      />
                      <h3>{product.name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <Title titleTag="h5">No results found</Title>
        )}
      </div>
    </>
  );
};
