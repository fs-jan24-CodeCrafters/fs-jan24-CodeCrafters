import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import debouce from 'lodash.debounce';

import { SpriteIcon } from '../../Shared/SpriteIcon';
import { Product } from '../../../types/Product';
import { SearchResults } from './SearchResults/SearchResults';

import products from '../../../../public/api/products.json';
import styles from './Search.module.scss';

export const Search = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const location = useLocation();

  const handleOnClick = () => {
    setInputVisible(true);
  };

  const handleClose = () => {
    setInputVisible(false);
    setSearchItem('');
  };

  const getSearchResults = () => {
    const searchResults: Record<string, Product[]> = {};

    for (let i = 0; i < products.length; i++) {
      const allSubstringsIncluded = searchItem
        .split(' ')
        .every((word) =>
          products[i].name.toLowerCase().includes(word.toLowerCase()),
        );

      if (allSubstringsIncluded) {
        const categoryName = products[i].category;

        if (!searchResults[categoryName]) {
          searchResults[categoryName] = [];
        }

        searchResults[categoryName].push(products[i]);
      }
    }

    return searchResults;
  };

  const searchResults = useMemo(() => getSearchResults(), [searchItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleInputChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, []);

  useEffect(() => {
    handleClose();
  }, [location]);

  return (
    <>
      {!isInputVisible && (
        <button className={styles.searchButton} onClick={handleOnClick}>
          <SpriteIcon iconName="icon-Search" />
        </button>
      )}
      {isInputVisible && (
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            className={styles.searchInput}
            onChange={debouncedResults}
            placeholder="Search..."
            autoFocus
          />

          <button className={styles.closeButton} onClick={handleClose}>
            <SpriteIcon iconName="icon-Close" />
          </button>

          {searchItem && isInputVisible && (
            <SearchResults searchResults={searchResults} />
          )}
        </div>
      )}
    </>
  );
};
