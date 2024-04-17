import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { BreadcrumbsItem } from '../Shared/Breadcrumbs/BreadcrumbsItem';
import { Container } from '../Shared/Container';
import { getPathAndCategoryNameFromUrl } from '../../helpers/getPathAndCategoryNameFromUrl';

export const ProductDetails: React.FC = () => {
  const { path, categoryName } = getPathAndCategoryNameFromUrl();

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbsItem tagType="Link" path={`/${path}`}>
          {categoryName}
        </BreadcrumbsItem>
        <BreadcrumbsItem tagType="span">Some product name</BreadcrumbsItem>
      </Breadcrumbs>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas veniam
        culpa, laboriosam, commodi iure, error rerum excepturi illum impedit
        tempora ad exercitationem! Eveniet impedit architecto illo esse quae
        quibusdam sed!
      </div>
    </Container>
  );
};
