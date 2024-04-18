import { BrandNewModelsSection } from './BrandNewModelsSection';
import { HeroSection } from './HeroSection';
import { ShopByCategorySection } from './ShopByCategotySection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BrandNewModelsSection />
      <ShopByCategorySection />
    </>
  );
};
