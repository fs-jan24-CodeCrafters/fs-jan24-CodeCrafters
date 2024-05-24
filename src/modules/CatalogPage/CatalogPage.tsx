import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { Container } from '../Shared/Container';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Title } from '../Shared/Title';
import { Loader } from '../Shared/Loader';
import { ProductsList } from './ProductsList';
import { Selects } from './Selects';
import { Pagination } from './Pagination';
import { RangePriceFilter } from './RangePriceFilter/RangePriceFilter';
import { getProductsByCategory as getProductsByCategoryBack } from '../../api/products';

import styles from './CatalogPage.module.scss';
import { useFetch } from '../../hooks/useFetch';
import { Product } from '../../types/Product';
import { useEffect, useRef } from 'react';

export const CatalogPage: React.FC = () => {
  const { t } = useTranslation();
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstMount = useRef(true);

  const currentSortBy = searchParams.get('sort') || 'featured';
  const currentPerPageOptions = searchParams.get('perPage') || '16';
  const currentPage = searchParams.get('page') || '1';

  const { data, loading, isError } = useFetch(
    getProductsByCategoryBack,
    path,
    currentSortBy,
    currentPerPageOptions,
    currentPage,
  );

  const productsList = (data.products as Product[]) || [];
  const totalPageNum = data.totalPages;

  const minPrice = Math.min(...productsList.map((product) => product.price));
  const maxPrice = Math.max(...productsList.map((product) => product.price));

  const priceRange = searchParams
    .get('range')
    ?.split(',')
    .map((i) => +i) || [minPrice, maxPrice];

  const filteredProducts = productsList.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1],
  );

  const itemsPerPage = filteredProducts.length;

  const categoryNames: Record<string, string> = {
    Phones: t(`common:catalog.mobilePhones`),
    Tablets: t(`common:catalog.tablets`),
    Accessories: t(`common:catalog.accessories`),
  };

  const breadcrumbsNames: Record<string, string> = {
    Phones: t(`common:catalog.phones`),
    Tablets: t(`common:catalog.tablets`),
    Accessories: t(`common:catalog.accessories`),
  };

  const catalogPageTitle = categoryNames[categoryName];
  const catalogPageBreadcrumb = breadcrumbsNames[categoryName];

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;

      return;
    }

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete('range');
      return newParams;
    });
  }, [currentSortBy]);

  return (
    <>
      <Helmet>
        <title>{catalogPageTitle}</title>
        <meta name="description" content={catalogPageTitle} />
      </Helmet>
      <Container className="section">
        <Breadcrumbs>
          <BreadcrumbsItem tagType="span">
            {catalogPageBreadcrumb}
          </BreadcrumbsItem>
        </Breadcrumbs>
        <Title titleTag="h1" className={styles.title}>
          {catalogPageTitle}
        </Title>
        <span className={`${styles.textItem} ${styles.productsAmountText}`}>
          {loading ? (
            <span className={styles.textItemLoader}>
              <Loader />
            </span>
          ) : (
            `${filteredProducts.length} ${t(`common:catalog.models`)}`
          )}
        </span>

        <div className={styles.listFilterWrapper}>
          <Selects
            setSearchParams={setSearchParams}
            currentSortBy={currentSortBy}
            itemsPerPage={itemsPerPage}
          />

          <RangePriceFilter
            value={priceRange as [number, number]}
            minPrice={minPrice}
            maxPrice={maxPrice}
            disabled={loading}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>

        {!isError && (
          <ProductsList products={filteredProducts} loading={loading} />
        )}

        {isError && (
          <p className={styles.textAlert}>{t(`common:errorMessage`)}</p>
        )}

        {!isError && !loading && !filteredProducts.length && (
          <p className={styles.textAlert}>{t(`common:goodsNotFound`)}</p>
        )}

        <Pagination
          currentPage={Number(currentPage)}
          totalPageNum={totalPageNum}
        />
      </Container>
    </>
  );
};
