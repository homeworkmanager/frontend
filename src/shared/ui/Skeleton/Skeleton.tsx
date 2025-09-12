import styles from './Skeleton.module.css';
import clsx from 'clsx';

type AllowedUnits = `${number}px` | `${number}%` | `${number}em` | `${number}rem` | `${number}`;

interface SkeletonProps extends React.ComponentProps<'div'> {
  height?: AllowedUnits;
  width?: AllowedUnits;
  radius?: AllowedUnits;
  background?: boolean;
}

export const Skeleton = ({
  height = '100%',
  width = '100%',
  radius = '0',
  background = true,
  className
}: SkeletonProps) => {
  const style = {
    height,
    width,
    borderRadius: radius
  };

  return <div style={style} className={clsx(styles['skeleton'], background && styles['background'], className)}></div>;
};
