import { Module } from '@nestjs/common';

import ClientResolver from '@/modules/client/resolver';
import ClientService from '@/modules/client/service';
import ClientModel from './model';

@Module({
  providers: [ClientResolver, ClientService, ClientModel],
  exports: [ClientService, ClientModel],
})
export default class ClientModule {}
