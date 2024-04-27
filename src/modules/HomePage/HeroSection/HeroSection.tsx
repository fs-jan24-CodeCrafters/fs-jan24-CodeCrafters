import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
  url: string;
}

const sliderItems: SliderItem[] = [
  {
    id: 1,
    img: '/img/hero/1.jpg',
    description: 'Watch',
    url: '/accessories',
  },
  {
    id: 2,
    img: '/img/hero/2.jpg',
    description: 'Phones',
    url: '/phones',
  },
  {
    id: 3,
    img: '/public/img/hero/3.jpg',
    description: 'Tablets',
    url: '/tablets',
  },
];

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="section">
      <Container className={styles.container}>
        <Title className={styles.title} titleTag="h1">
          {t(`common:home.hero`)}
        </Title>

        <div
          className={`${styles.sliderWrapper} animate__animated animate__fadeIn animate__slow`}
        >
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
                <Link to={item.url} className={styles.imageItem}>
                  <img src={item.img} alt={item.description} />
                </Link>
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
