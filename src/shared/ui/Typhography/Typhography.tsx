import React from 'react';

import style from './Typhography.module.css';
import clsx from 'clsx';

type TyphographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TyphographyVariant = 'header' | 'primary' | 'secondary' | 'thirdy' | 'small' | 'smallest' | 'additional';

type TyphographyProps<Tag extends TyphographyTag> = React.ComponentProps<Exclude<Tag, 'span'>> & {
  tag: TyphographyTag;
  variant: TyphographyVariant;
  children: React.ReactNode;
};

export const Typhography = <Tag extends TyphographyTag>({
  tag,
  children,
  variant,
  className,
  ...props
}: TyphographyProps<Tag>) => {
  const Component = tag;
  return (
    <Component className={clsx(style['Typhography'], style[variant], className)} {...props}>
      {children}
    </Component>
  );
};
