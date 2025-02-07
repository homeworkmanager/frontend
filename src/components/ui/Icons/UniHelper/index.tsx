export const UniHelperLogo = ({ ...props }: React.ComponentProps<'img'>) => {
  return <img {...props} loading="lazy" width={256} src={'/icon_original.png'} alt="UniHelper" />;
};
