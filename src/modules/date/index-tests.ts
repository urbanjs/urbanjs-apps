import * as expect from 'assert';
import { Container } from 'inversify';
import { dateModule } from './index';
import { TYPE_DATE_SERVICE, IDateService } from './types';

describe('modules/date', () => {
  describe('Date Service', () => {
    let dateService: IDateService;

    beforeEach(() => {
      const container = new Container();
      container.load(dateModule);
      dateService = container.get<IDateService>(TYPE_DATE_SERVICE);
    });

    describe('.getYears()', () => {

      it('returns value properly', () => {
        const duration = 18 * 365 * 24 * 60 * 60 * 1000;
        const result = dateService.getYears(duration);
        expect.equal(result, 17);
      });
    });
  });
});
