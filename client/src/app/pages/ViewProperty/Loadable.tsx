import { lazyLoad } from '@/utils/loadable';

export const ViewProperty = lazyLoad(
  () => import('./index'),
  module => module.ViewProperty,
);
