export function toConstantCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]{2,})([a-z])/g, '$1_$2')
    .toUpperCase();
}

export function applyEnvironmentVariables<T extends object>(config: object,
                                                            envVariableRootPrefix: string = '',
                                                            envVariableStore: object = process.env): T {
  return (function next(data: object, envVariablePrefix: string) {
    const configuredData = {} as T;
    Object.keys(data).forEach((key) => {
      const processEnvKey = `${envVariablePrefix ? `${envVariablePrefix}__`
        : ''}${toConstantCase(key)}`;
      const value = data[key];

      if (typeof value === 'string') {
        configuredData[key] = envVariableStore.hasOwnProperty(processEnvKey)
          ? envVariableStore[processEnvKey]
          : value;
      } else if (typeof value === 'number') {
        configuredData[key] = envVariableStore.hasOwnProperty(processEnvKey)
          ? parseInt(`${envVariableStore[processEnvKey]}`, 10)
          : value;
      } else if (typeof value === 'boolean') {
        configuredData[key] = envVariableStore.hasOwnProperty(processEnvKey)
          ? /true/i.test(`${envVariableStore[processEnvKey]}`)
          : value;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        configuredData[key] = next(value, processEnvKey);
      } else {
        throw new Error('Invalid config');
      }
    });
    return configuredData;
  }(config, envVariableRootPrefix));
}

export type StringResolver = (value: string, context: object) => string;

export function resolveReferences<T extends object>(config: T, resolver: StringResolver) {
  return (function next<T1>(data: T1): T1 {
    let hasResolved = false;
    const resolvedConfig = {} as T1;

    Object.keys(data).forEach((key) => {
      let value = data[key];

      if (typeof value === 'string') {
        const afterValue = resolver(value, config);
        if (typeof afterValue !== 'string') {
          throw new Error('Resolver must return a string');
        }

        if (afterValue !== value) {
          hasResolved = true;
        }
        value = afterValue;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        value = next(value);
      }

      resolvedConfig[key] = value;
    });

    return hasResolved
      ? next(resolvedConfig)
      : resolvedConfig;
  }<T>(config));
}
