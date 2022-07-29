import { Module } from '@nestjs/common';

import PropertyResolver from '@/modules/property/resolver';
import PropertyService from '@/modules/property/service';
import PropertyModel from './model';

@Module({
  providers: [PropertyResolver, PropertyService, PropertyModel],
})
export default class PropertyModule {}
