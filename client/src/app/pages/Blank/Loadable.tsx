import { lazyLoad } from '@/utils/loadable';

export const Blank = lazyLoad(
  () => import('./index'),
  module => module.Blank,
);
