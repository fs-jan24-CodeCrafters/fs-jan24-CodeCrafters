import { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from '../Card';
import { Title } from '../Title';
import { SpriteIcon } from '../SpriteIcon';
import { Product } from '../../../types/Product';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductsSlider.module.scss';
import classNames from 'classnames';
import { useIntersectionObserver } from 'usehooks-ts';

interface Props {
  sliderTitle: string;
  products: Product[];
  hasDiscountPrice?: boolean;
  className?: string;
}

export const ProductsSlider: React.FC<Props> = ({
  sliderTitle,
  products,
  hasDiscountPrice,
  className,
}) => {
  const [innerProgress, setInnerProgress] = useState(0);

  const handleSlideChange = (e: SwiperType) => {
    const { progress } = e;
    setInnerProgress(progress);
  };

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: true,
  });

  return (
    <>
      <div className={classNames(styles.productSliderHeader, className)}>
        <Title titleTag="h2">{sliderTitle}</Title>
        <div className={styles.productSliderNavigation}>
          <button
            disabled={innerProgress === 0}
            className={styles.productSliderButtonPrev}
          >
            <SpriteIcon iconName="icon-Chevron-Arrow-Left" />
          </button>
          <button
            disabled={innerProgress === 1}
            className={styles.productSliderButtonNext}
          >
            <SpriteIcon iconName="icon-Chevron-Arrow-Right" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className={classNames({
          'animate__animated animate__fadeIn animate__slow': isIntersecting,
        })}
      >
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${styles.productSliderButtonPrev}`,
            nextEl: `.${styles.productSliderButtonNext}`,
          }}
          spaceBetween={16}
          wrapperClass={styles.swiperWrapper}
          breakpoints={{
            320: { slidesPerView: 'auto' },
            992: { slidesPerView: 4 },
          }}
          onSlideChange={handleSlideChange}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.productSliderSlide}>
              <Card product={product} hasDiscountPrice={hasDiscountPrice} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
