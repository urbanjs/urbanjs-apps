import 'reflect-metadata';

export const METADATA_KEY_COMMAND = 'METADATA_KEY_COMMAND';

export type CommandOptions = {
  name: string;
  description: string;
  usage: string;
  options: Array<{
    flags: string;
    description: string;
  }>
};

export function command(options: CommandOptions): MethodDecorator {
  return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (typeof target[propertyKey] !== 'function') {
      throw new Error('@command() decorator can be used for methods only');
    }

    descriptor.enumerable = true;
    Reflect.defineMetadata(METADATA_KEY_COMMAND, options, target, propertyKey);
  };
}
