export function toConstantCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]{2,})([a-z])/g, '$1_$2')
    .toUpperCase();
}

export function applyEnvironmentVariables<T extends object>(config: object, envVariableRootPrefix: string = ''): T {
  return (function next(data: object, envVariablePrefix: string) {
    const configuredData = {} as T;
    Object.keys(data).forEach((key) => {
      const processEnvKey = `${envVariablePrefix ? `${envVariablePrefix}__` : ''}${toConstantCase(key)}`;
      const value = data[key];

      if (typeof value === 'string') {
        configuredData[key] = process.env.hasOwnProperty(processEnvKey)
          ? process.env[processEnvKey]
          : value;
      } else if (typeof value === 'number') {
        configuredData[key] = process.env.hasOwnProperty(processEnvKey)
          ? parseInt(`${process.env[processEnvKey]}`, 10)
          : value;
      } else if (typeof value === 'boolean') {
        configuredData[key] = process.env.hasOwnProperty(processEnvKey)
          ? /true/i.test(`${process.env[processEnvKey]}`)
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
