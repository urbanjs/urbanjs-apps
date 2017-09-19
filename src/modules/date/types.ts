import { Duration } from 'moment';

export const TYPE_DATE_SERVICE = 'TYPE_DATE_SERVICE';
export const TYPE_DRIVER_MOMENT = 'TYPE_DRIVER_MOMENT';

export type MomentDriver = {
  duration: (value: number) => Duration
};

export interface IDateService {
  getYears(duration: number): number;
}
