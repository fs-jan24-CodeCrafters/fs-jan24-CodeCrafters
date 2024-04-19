import { BrandNewModelsSection } from './BrandNewModelsSection';
import { HeroSection } from './HeroSection';
import { HotPricesSection } from './HotPricesSection';
import { ShopByCategorySection } from './ShopByCategotySection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BrandNewModelsSection />
      <ShopByCategorySection />
      <HotPricesSection />
    </>
  );
};
