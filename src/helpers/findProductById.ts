import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import { ProductDetails } from '../types/ProductDetails';

export const findProductById = (pathName: string, id: string) => {
  let currentCategory;

  switch (pathName) {
    case 'phones':
      currentCategory = phones;
      break;
    case 'tablets':
      currentCategory = tablets;
      break;
    case 'accessories':
      currentCategory = accessories;
      break;
    default:
      return undefined;
  }

  return currentCategory.find((p) => p.id === id && p.category === pathName) as
    | ProductDetails
    | undefined;
};
