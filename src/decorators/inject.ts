import { inject as injectSync } from 'inversify';

export { injectable } from 'inversify';

export type Decorator = (target: object, targetKey: string, index?: number | undefined) => void;

export type InjectDecorators = {
  inject(serviceIdentifier: string): Decorator;
};

let injectDecorators: InjectDecorators = {
  inject: injectSync
};

export const reinitializeInjectDecorators = (decorators: InjectDecorators) => {
  injectDecorators = decorators;
};

export const inject = (serviceIdentifier: string): Decorator => {
  if (!injectDecorators.inject) {
    throw new Error('@inject can only be used if decorators are initialized');
  }

  return injectDecorators.inject(serviceIdentifier);
};
