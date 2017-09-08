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

  @track()
  getMonths(duration: number) {
    return this.moment.duration(duration).months();
  }

  @track()
  getWeeks(duration: number) {
    return this.moment.duration(duration).weeks();
  }

  @track()
  getDays(duration: number) {
    return this.moment.duration(duration).days();
  }

  @track()
  getHours(duration: number) {
    return this.moment.duration(duration).hours();
  }

  @track()
  getMinutes(duration: number) {
    return this.moment.duration(duration).minutes();
  }

  @track()
  getSeconds(duration: number) {
    return this.moment.duration(duration).seconds();
  }

  @track()
  getMilliseconds(duration: number) {
    return this.moment.duration(duration).milliseconds();
  }
}
