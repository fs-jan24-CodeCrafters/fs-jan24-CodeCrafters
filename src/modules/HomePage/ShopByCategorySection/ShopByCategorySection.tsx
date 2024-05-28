import { useIntersectionObserver } from 'usehooks-ts';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Container } from '../../Shared/Container';
import { Title } from '../../Shared/Title';
import { CategoryItem } from './CategoryItem';
import { useApiData } from '../../../hooks/useApiData';
import { getProductCounts } from '../../../api/products';

import styles from './ShopByCategorySection.module.scss';

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

  const { data, isLoading } = useApiData(getProductCounts);

  const categoryData = [
    {
      productsAmount: data?.phonesCount ?? 0,
      imgUrl: 'img/ShopByCategory/1.png',
      name: t(`common:home.phones`),
      imgBgColor: 'violet',
      urlPath: 'phones',
    },
    {
      productsAmount: data?.tabletsCount ?? 0,
      imgUrl: 'img/ShopByCategory/2.png',
      name: t(`common:home.tablets`),
      imgBgColor: 'gray',
      urlPath: 'tablets',
    },
    {
      productsAmount: data?.accessoriesCount ?? 0,
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
            <CategoryItem
              key={category.imgUrl}
              categoryData={category}
              isLoading={isLoading}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
