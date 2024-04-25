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

import styles from './CatalogPage.module.scss';

export const CatalogPage: React.FC = () => {
  const { t } = useTranslation();
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, loading } = useProductsApi();

  const productsList = getProductsByCategory(products, path);

  const currentSortBy = searchParams.get('sort') || 'featured';
  const currentPerPageOptions = searchParams.get('perPage') || 16;
  const currentPage = Number(searchParams.get('page')) || 1;

  const sortedByFormUrl = getSortedProducts(productsList, currentSortBy);

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
          `${productsList.length} ${t(`common:catalog.models`)}`
        )}
      </span>

      <Selects
        setSearchParams={setSearchParams}
        currentSortBy={currentSortBy}
        itemsPerPage={itemsPerPage}
      />

      <ProductsList products={visibleProducts} loading={loading} />

      <Pagination
        products={sortedByFormUrl}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </Container>
  );
};
