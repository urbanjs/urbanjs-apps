export function applyEnvironmentVariables<T extends object>(config: object): T {
  return (function next(data: object, envVariablePrefix: string) {
    const configuredData = {} as T;
    Object.keys(data).forEach((key) => {
      const processEnvKey = `${envVariablePrefix}__${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
      const value = data[key];

      if (typeof value === 'object') {
        configuredData[key] = next(value, processEnvKey);
      } else if (typeof value === 'string') {
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
      } else {
        throw new Error('Invalid config');
      }
    });
    return configuredData;
  }(config, 'XI_CM_PROXY_LAMBDA'));
}
