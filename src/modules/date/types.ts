import { Duration } from 'moment';

export const TYPE_DATE_SERVICE = 'TYPE_DATE_SERVICE';
export const TYPE_DRIVER_MOMENT = 'TYPE_DRIVER_MOMENT';

export type MomentDriver = {
  duration: (value: number) => Duration
};

export interface IDateService {
  getYears(duration: number): number;
  getMonths(duration: number): number;
  getWeeks(duration: number): number;
  getDays(duration: number): number;
  getHours(duration: number): number;
  getMinutes(duration: number): number;
  getSeconds(duration: number): number;
  getMilliseconds(duration: number): number;
}
