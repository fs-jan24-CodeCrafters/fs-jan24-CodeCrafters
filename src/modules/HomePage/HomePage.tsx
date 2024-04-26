import { Helmet } from 'react-helmet';

import { BrandNewModelsSection } from './BrandNewModelsSection';
import { HeroSection } from './HeroSection';
import { HotPricesSection } from './HotPricesSection';
import { ShopByCategorySection } from './ShopByCategotySection';

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Code Crafters</title>
        <meta name="description" content="Code Crafters" />
      </Helmet>
      <HeroSection />
      <BrandNewModelsSection />
      <ShopByCategorySection />
      <HotPricesSection />
    </>
  );
};
