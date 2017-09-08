import { ContainerModule } from 'inversify';
import * as moment from 'moment';
import { DateService } from './date-service';
import {
  TYPE_DATE_SERVICE,
  TYPE_DRIVER_MOMENT,
  MomentDriver,
  IDateService
} from './types';

export const dateModule = new ContainerModule((bind) => {
  bind<MomentDriver>(TYPE_DRIVER_MOMENT).toConstantValue(moment);
  bind<IDateService>(TYPE_DATE_SERVICE).to(DateService);
});
