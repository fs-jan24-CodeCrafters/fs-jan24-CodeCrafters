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

export const CatalogPage: React.FC = () => {
  const { path, categoryName } = getPathAndCategoryNameFromUrl();
  const [searchParams, setSearchParams] = useSearchParams();

  const productsList = getProductsByCategory(products, path);
  const currentSortBy = searchParams.get('sort') || 'Newest';
  const currentPerPageOptions = searchParams.get('perPage') || 16;
  const sortedByFormUrl = getSortedProducts(productsList, currentSortBy);

  const catalogPageTitle =
    categoryName === 'Phones' ? 'Mobile phones' : categoryName;

  return (
    <Container>
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
        currentPerPageOptions={currentPerPageOptions}
      />
      <ProductsList products={sortedByFormUrl} />
    </Container>
  );
};
