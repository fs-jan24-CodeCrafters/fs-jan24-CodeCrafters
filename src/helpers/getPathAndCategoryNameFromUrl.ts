import { useLocation } from 'react-router-dom';

export const getPathAndCategoryNameFromUrl = () => {
  const location = useLocation();

  const path = location.pathname.split('/').filter((el) => el !== '')[0];
  const categoryName = path.charAt(0).toUpperCase() + path.slice(1);

  return { path, categoryName };
};
