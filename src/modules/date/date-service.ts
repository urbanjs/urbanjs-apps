import { injectable, inject, track } from '../../decorators';
import { IDateService, MomentDriver, TYPE_DRIVER_MOMENT } from './types';

@injectable()
export class DateService implements IDateService {
  constructor(@inject(TYPE_DRIVER_MOMENT) private moment: MomentDriver) {
  }

  @track()
  getYears(duration: number) {
    return this.moment.duration(duration).years();
  }
}
