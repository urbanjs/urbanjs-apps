import { inject as injectSync, Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

export { injectable } from 'inversify';

export type Decorator = (target: object, targetKey: string, index?: number | undefined) => void;

let lazyInjectDecorator: (serviceIdentifier: string) => Decorator;
export const supportLazyInject = (container: Container) => {
  lazyInjectDecorator = getDecorators(container).lazyInject;
};

export const inject = (serviceIdentifier: string): Decorator => {
  return (target: FunctionConstructor, targetKey: string, index?: number | undefined) => {
    injectSync(serviceIdentifier)(target, targetKey, index);
    if (lazyInjectDecorator) {
      lazyInjectDecorator(serviceIdentifier)(target, targetKey, index);
    }
  };
};
