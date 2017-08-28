import { ContainerModule, interfaces as inversify } from 'inversify';
import * as Ajv from 'ajv';
import {
  TYPE_UUID_SERVICE,
  IUuidService
} from '../uuid/types';
import { JSONService } from './json-service';
import {
  TYPE_AJV_DRIVER,
  AJVDriver,
  TYPE_JSON_SERVICE,
  IJSONService
} from './types';

export const jsonModule = new ContainerModule((bind) => {
  bind<IJSONService>(TYPE_JSON_SERVICE).to(JSONService);

  bind<AJVDriver>(TYPE_AJV_DRIVER).toDynamicValue((context: inversify.Context) => {
    const uuidService = context.container.get<IUuidService>(TYPE_UUID_SERVICE);
    const ajv: Ajv.Ajv = new Ajv({
      allErrors: true
    });

    ajv.addKeyword('guid', {
      type: 'string',
      errors: false,
      validate: (shouldBeGuid: boolean, value: string) => {
        return !shouldBeGuid || uuidService.validateUuid(value);
      }
    });

    return ajv as AJVDriver;
  });
});
