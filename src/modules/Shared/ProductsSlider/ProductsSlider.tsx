import { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { Card } from '../Card';
import { Title } from '../Title';
import { SpriteIcon } from '../SpriteIcon';
import { Product } from '../../../types/Product';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductsSlider.module.scss';

interface Props {
  sliderTitle: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ sliderTitle, products }) => {
  const [innerProgress, setInnerProgress] = useState(0);

  const handleSlideChange = (e: SwiperType) => {
    const { progress } = e;
    setInnerProgress(progress);
  };

  return (
    <>
      <div className={styles.productSliderHeader}>
        <Title titleTag="h2">{sliderTitle}</Title>
        <div className={styles.productSliderNavigation}>
          <div
            className={classNames(styles.productSliderButtonPrev, {
              [styles.disabled]: innerProgress === 0,
            })}
          >
            <SpriteIcon iconName="icon-Chevron-Arrow-Left" />
          </div>
          <div
            className={classNames(styles.productSliderButtonNext, {
              [styles.disabled]: innerProgress === 1,
            })}
          >
            <SpriteIcon iconName="icon-Chevron-Arrow-Right" />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${styles.productSliderButtonPrev}`,
          nextEl: `.${styles.productSliderButtonNext}`,
        }}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 'auto' },
          992: { slidesPerView: 4 },
        }}
        onSlideChange={handleSlideChange}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.productSliderSlide}>
            <Card product={product}></Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
