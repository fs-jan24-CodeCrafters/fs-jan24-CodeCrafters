import { useIntersectionObserver } from 'usehooks-ts';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { getProductsByCategory } from '../../../helpers/getProductsByCategory';
import products from '../../../../public/api/products.json';
import { Container } from '../../Shared/Container';
import { Title } from '../../Shared/Title';
import { CategoryItem } from './CategoryItem';

import styles from './ShopByCategotySection.module.scss';

const phonesAmount = getProductsByCategory(products, 'phones').length;
const tabletsAmount = getProductsByCategory(products, 'tablets').length;
const accessoriesAmount = getProductsByCategory(products, 'accessories').length;

export interface CategoryData {
  productsAmount: number;
  imgUrl: string;
  name: string;
  imgBgColor: string;
  urlPath: string;
}

export const ShopByCategorySection: React.FC = () => {
  const { t } = useTranslation();
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: true,
  });

  const categoryData = [
    {
      productsAmount: phonesAmount,
      imgUrl: 'img/ShopByCategory/1.png',
      name: t(`common:home.phones`),
      imgBgColor: 'violet',
      urlPath: 'phones',
    },
    {
      productsAmount: tabletsAmount,
      imgUrl: 'img/ShopByCategory/2.png',
      name: t(`common:home.tablets`),
      imgBgColor: 'gray',
      urlPath: 'tablets',
    },
    {
      productsAmount: accessoriesAmount,
      imgUrl: 'img/ShopByCategory/3.png',
      name: t(`common:home.accessories`),
      imgBgColor: 'pink',
      urlPath: 'accessories',
    },
  ];

  return (
    <section className="section">
      <Container>
        <Title titleTag="h2" sectionTitle={true}>
          {t(`common:home.shopByCategory`)}
        </Title>
        <div
          ref={ref}
          className={classNames(styles.categoryItems, {
            'animate__animated animate__fadeIn animate__slow': isIntersecting,
          })}
        >
          {categoryData.map((category) => (
            <CategoryItem key={category.imgUrl} categoryData={category} />
          ))}
        </div>
      </Container>
    </section>
  );
};
