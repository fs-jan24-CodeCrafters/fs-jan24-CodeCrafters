import { Product } from '../types/Product';
import { SortBy } from '../types/enums/SortBy';

export function getSortedProducts(productsArr: Product[], sortType: string) {
  const productsArrCopy = [...productsArr].sort((a, b) => {
    switch (sortType) {
      case SortBy.Year:
        return b.year - a.year;
      case SortBy.Name:
        return a.name.localeCompare(b.name);
      case SortBy.Price:
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return productsArrCopy;
}
