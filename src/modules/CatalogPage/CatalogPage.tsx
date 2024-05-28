import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useEffect, useRef } from 'react';

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
import { useFetch } from '../../hooks/useFetch';
import { Product } from '../../types/Product';

import styles from './CatalogPage.module.scss';

export const CatalogPage: React.FC = () => {
  const { t } = useTranslation();
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstMount = useRef(true);

  const currentSortBy = searchParams.get('sort') || 'featured';
  const currentPerPageOptions = searchParams.get('perPage');
  const currentPage = searchParams.get('page') || '1';
  const priceRange = searchParams.get('range');

  const { data, loading, isError } = useFetch(
    getProductsByCategoryBack,
    path,
    currentSortBy,
    currentPerPageOptions,
    currentPage,
    priceRange,
  );

  const minPrice = data.min as number;
  const maxPrice = data.max as number;

  const productsList = (data.products as Product[]) || [];
  const totalPageNum = data.totalPages;

  const itemsPerPage = productsList.length;

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
      newParams.delete('page');
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
            `${productsList.length} ${t(`common:catalog.models`)}`
          )}
        </span>

        <div className={styles.listFilterWrapper}>
          <Selects
            setSearchParams={setSearchParams}
            currentSortBy={currentSortBy}
            itemsPerPage={itemsPerPage}
            loading={loading}
          />

          <RangePriceFilter
            value={[minPrice, maxPrice]}
            disabled={loading}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>

        {!isError && <ProductsList products={productsList} loading={loading} />}

        {isError && (
          <p className={styles.textAlert}>{t(`common:errorMessage`)}</p>
        )}

        {!isError && !loading && !productsList.length && (
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
