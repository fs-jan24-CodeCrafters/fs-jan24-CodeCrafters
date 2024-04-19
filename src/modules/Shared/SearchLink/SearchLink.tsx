import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../../helpers/searchHelper';
import classNames from 'classnames';

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
