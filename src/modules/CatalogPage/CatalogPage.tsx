import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { useProductsApi } from '../../hooks/useProductsApi';
import { Container } from '../Shared/Container';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Title } from '../Shared/Title';
import { Loader } from '../Shared/Loader';
import { ProductsList } from './ProductsList';
import { Selects } from './Selects';
import { Pagination } from './Pagination';
import { RangePriceFilter } from './RangePriceFilter/RangePriceFilter';

import styles from './CatalogPage.module.scss';

export const CatalogPage: React.FC = () => {
  const { t } = useTranslation();
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, loading } = useProductsApi();

  const productsList = getProductsByCategory(products, path);

  const minPrice = Math.min(...productsList.map((product) => product.price));
  const maxPrice = Math.max(...productsList.map((product) => product.price));

  const priceRange = searchParams
    .get('range')
    ?.split(',')
    .map((i) => +i) || [minPrice, maxPrice];

  const currentSortBy = searchParams.get('sort') || 'featured';
  const currentPerPageOptions = searchParams.get('perPage') || 16;
  const currentPage = Number(searchParams.get('page')) || 1;

  const filteredProducts = productsList.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1],
  );
  const sortedByFormUrl = getSortedProducts(filteredProducts, currentSortBy);

  const itemsPerPage = Number(currentPerPageOptions) || sortedByFormUrl.length;

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

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const visibleProducts = sortedByFormUrl.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
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

      <ProductsList products={visibleProducts} loading={loading} />

      <Pagination
        products={sortedByFormUrl}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </Container>
  );
};
