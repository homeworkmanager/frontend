import BezPar from './bezpar.png';

export const BezParIcon = ({ ...props }: React.ComponentProps<'img'>) => {
  return <img {...props} src={BezPar} alt="BezPar" />;
};
