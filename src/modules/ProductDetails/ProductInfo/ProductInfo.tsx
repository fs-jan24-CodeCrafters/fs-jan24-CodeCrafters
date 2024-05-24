import { useTranslation } from 'react-i18next';

import { Title } from '../../Shared/Title';
import { ProductDescription } from '../../../types/ProductDescription';
import { ProductDetails } from '../../../types/ProductDetails';

import styles from './ProductInfo.module.scss';

interface Props {
  product: ProductDetails;
}

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const currentProduct = product;

  const techSpecs = {
    Screen: currentProduct?.screen,
    Resolution: currentProduct?.resolution,
    Processor: currentProduct?.processor,
    RAM: currentProduct?.ram,
    Camera: currentProduct?.camera || '-',
    Zoom: currentProduct?.zoom || '-',
    Cell: currentProduct?.cell.join(', '),
  };

  return (
    <div className={`${styles.productInfo} section`}>
      <div className={styles.about}>
        <Title titleTag="h3" className={styles.titleAbout}>
          {t(`common:product.about`)}
        </Title>
        <div className={styles.description}>
          {currentProduct?.description.map((item: ProductDescription) => (
            <div className={styles.descriptionItem} key={item.title}>
              <Title titleTag="h4" className={styles.titleDescription}>
                {item.title}
              </Title>
              {item.text.map((text) => (
                <p key={text} className={styles.descriptionText}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.techSpecs}>
        <Title titleTag="h3" className={styles.titleTechSpecs}>
          {t(`common:product.tech`)}
        </Title>
        <ul className={styles.specList}>
          {Object.entries(techSpecs).map(([key, value]) => (
            <li className={styles.specItem} key={key}>
              <span className={styles.techKey}>
                {t(`common:product.${key.toLowerCase()}`)}:
              </span>
              <span className={styles.techValue}>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
