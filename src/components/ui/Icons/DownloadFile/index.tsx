export const DownloadFile = ({ ...props }: React.ComponentProps<'svg'>) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="26px"
      width="26px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
      <path d="M12 18v-6"></path>
      <path d="m9 15 3 3 3-3"></path>
    </svg>
  );
};
