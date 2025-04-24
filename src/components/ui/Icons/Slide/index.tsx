export const Slide = ({ ...props }: React.ComponentProps<'svg'>) => (
  <svg
    stroke="none"
    fill="currentColor"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 900 900"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g transform="translate(0, 900) scale(0.1, -0.1)">
      <path
        d="M3429 7239 c-101 -16 -198 -91 -242 -188 -34 -72 -31 -189 6 -262 24
-46 234 -261 1253 -1280 l1224 -1224 -1229 -1230 c-1004 -1005 -1232 -1239
-1251 -1280 -33 -71 -34 -190 -2 -260 58 -125 202 -209 330 -190 124 18 48
-54 1513 1413 1100 1100 1361 1366 1380 1407 19 41 24 66 24 140 0 78 -4 96
-27 140 -20 37 -374 397 -1395 1416 -1287 1286 -1371 1368 -1418 1382 -68 21
-111 25 -166 16z"
      />
    </g>
  </svg>
);
