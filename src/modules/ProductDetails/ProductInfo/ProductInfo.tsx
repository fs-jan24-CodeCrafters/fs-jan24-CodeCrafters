import { Title } from '../../Shared/Title';
import { ProductDescription } from '../../../types/ProductDescription';
import styles from './ProductInfo.module.scss';
import { ProductDetails } from '../../../types/ProductDetails';

interface Props {
  product: ProductDetails;
}

export const ProductInfo: React.FC<Props> = ({ product }) => {
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
    <div className={styles.productInfo}>
      <div className={styles.about}>
        <Title titleTag="h3" className={styles.titleAbout}>
          About
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
          Tech specs
        </Title>
        <ul className={styles.specList}>
          {Object.entries(techSpecs).map(([key, value]) => (
            <li className={styles.specItem} key={value}>
              <span className={styles.techKey}>{key}:</span>
              <span className={styles.techValue}>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
