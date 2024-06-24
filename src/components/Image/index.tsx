import { ImgHTMLAttributes } from 'react';
import { PUBLIC_URL } from '../../utils/env';

export const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img {...props} src={`${PUBLIC_URL}${props.src}`} />
);
