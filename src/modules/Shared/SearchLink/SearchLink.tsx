import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchParams, getSearchWith } from '../../../helpers/searchHelper';

type Props = Omit<LinkProps, 'to'> & {
  params: SearchParams;
  className?: string;
};

export const SearchLink: React.FC<Props> = ({
  children,
  params,
  className,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={classNames(className)}
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
