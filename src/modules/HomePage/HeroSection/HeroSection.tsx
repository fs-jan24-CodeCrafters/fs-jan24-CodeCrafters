import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from '../../Shared/Container';
import { Title } from '../../Shared/Title';
import { SpriteIcon } from '../../Shared/SpriteIcon';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import styles from './HeroSection.module.scss';

interface SliderItem {
  id: number;
  img: string;
  description: string;
}

const sliderItems: SliderItem[] = [
  {
    id: 1,
    img: '/img/hero/1.jpg',
    description: 'iPhone',
  },
  {
    id: 2,
    img: '/img/hero/2.jpg',
    description: 'Watch',
  },
  {
    id: 3,
    img: '/img/hero/3.jpg',
    description: 'Vision Pro',
  },
];

export const HeroSection: React.FC = () => {
  return (
    <section className="section">
      <Container className={styles.container}>
        <Title className={styles.title} titleTag="h1">
          Welcome to Nice Gadgets store!
        </Title>

        <div className={styles.sliderWrapper}>
          <button className={styles.buttonPrev}>
            <SpriteIcon iconName="icon-Chevron-Arrow-Left" />
          </button>

          <Swiper
            className={styles.swiper}
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            navigation={{
              prevEl: `.${styles.buttonPrev}`,
              nextEl: `.${styles.buttonNext}`,
            }}
            pagination={{
              clickable: true,
              el: `.${styles.pagination}`,
              bulletClass: styles.bullet,
              bulletActiveClass: styles.bulletActive,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
            loop={true}
            slidesPerView={1}
          >
            {sliderItems.map((item) => (
              <SwiperSlide key={item.id} className={styles.sliderItem}>
                <div className={styles.imageItem}>
                  <img src={item.img} alt={item.description} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className={styles.buttonNext}>
            <SpriteIcon iconName="icon-Chevron-Arrow-Right" />
          </button>
        </div>
        <div className={styles.pagination}></div>
      </Container>
    </section>
  );
};
