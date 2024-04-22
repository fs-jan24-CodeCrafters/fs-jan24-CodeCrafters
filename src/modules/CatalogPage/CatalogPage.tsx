import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import products from '../../../public/api/products.json';
import { Container } from '../Shared/Container';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { ProductsList } from './ProductsList';
import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';
import { Title } from '../Shared/Title';

import styles from './CatalogPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { Selects } from './Selects';
import { Pagination } from './Pagination';

export const CatalogPage: React.FC = () => {
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const [searchParams, setSearchParams] = useSearchParams();

  const productsList = getProductsByCategory(products, path);

  const currentSortBy = searchParams.get('sort') || 'All';
  const currentPerPageOptions = searchParams.get('perPage') || 16;
  const currentPage = Number(searchParams.get('page')) || 1;

  const sortedByFormUrl = getSortedProducts(productsList, currentSortBy);

  const itemsPerPage = Number(currentPerPageOptions) || sortedByFormUrl.length;

  const catalogPageTitle =
    categoryName === 'Phones' ? 'Mobile phones' : categoryName;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const visibleProducts = sortedByFormUrl.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <Container className="section">
      <Breadcrumbs>
        <BreadcrumbsItem tagType="span">{categoryName}</BreadcrumbsItem>
      </Breadcrumbs>
      <Title titleTag="h1" className={styles.title}>
        {catalogPageTitle}
      </Title>
      <span className={`${styles.textItem} ${styles.productsAmountText}`}>
        {`${productsList.length} models`}
      </span>

      <Selects
        setSearchParams={setSearchParams}
        currentSortBy={currentSortBy}
        itemsPerPage={itemsPerPage}
        products={sortedByFormUrl}
      />

      <ProductsList products={visibleProducts} />

      <Pagination
        products={sortedByFormUrl}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </Container>
  );
};
