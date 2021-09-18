declare module '*.svg' {
  import { SVGProps } from 'react';
  const _: React.FC<SVGProps<HTMLOrSVGElement>>;
  export = _;
}

declare module '*.png';
