import classNames from 'classnames';

interface Props {
  iconName: string;
  className?: string;
}

export const SpriteIcon: React.FC<Props> = ({ iconName, className }) => {
  return (
    <svg width={16} height={16} className={classNames(className)}>
      <use href={`icons/symbol-defs.svg#${iconName}`} />
    </svg>
  );
};
