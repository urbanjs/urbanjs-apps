## Config management

### Challenge
The end result of our build process should be a general-purpose artifact which 
can be promoted to any environment. This is why we need some kind
of configuration to be able to **modify the parameters** of our application **at runtime**.

Our artifact is a `docker image` which can be configured at startup by applying environment variables.

Environment variables are a handy way to configure applications on the server side but the real 
**challenge is to** find a way to **configure the client application** as well.

### Solution

Node allows us to access the environment variables by reading the `process.env` variable which is 
injected globally. It is kind of a simple task to create a config util which overrides our default 
parameters based on the accessible environment variables on our own, see 
`src/apps/utils/config/utils.ts`. This file exposes two methods:
- `.applyEnvironmentVariables(defaults: object, envPrefix: string)` - allows us to override the 
`defaults` based on the environment variables starting with the `envPrefix`
- `.resolveReferences(config: object, resolver)` - allows us to refer to a config value based on 
its key and the value will be injected, capabilities are depending on the given resolver.

With these two methods we can manage the configuration problem quite well on both the server and 
client side. 

Also, there are third party libraries to consider like 
[convict](https://www.npmjs.com/package/convict). They offer useful features, on the other hand, 
the extra complexity & size makes the client side configuration less effective. 
 
#### Server side
> See `src/apps/server/config.ts`

Nothing special here, just use the util methods detailed above. As an addition, we can use the 
`.env` file concept with the usage of the `dotenv` npm package. By initializing this package, the 
`.env` file in the root folder of the process will be digested and the environment variables 
 from this file will be added to the `process.env`.

Flow is simple. When the server starts it is going to
- initialize environment variables from the `.env` file
- override the defaults based on the environment variables (`process.env`)
- resolve cross-references of our configuration
- start server with the finalized configuration

#### Client side
> See `src/apps/client/config.ts`

The content of the client and server `config.ts` files are the same although the concepts are way 
different from each other.

TODO:
- nincs futó környezet, a js fájl fix a build után minden környezetre
- kell vmi ami runtime dolgozik

Flow:
- create bundle file during the build process
    - .env file is read during the process
    - bundle file contains the environment variables statically
- load bundle file on page request
- load `/config.js` file
- override the defaults based on the environment variables (`process.env`)
- resolve cross-references of our configuration
- start client with the finalized configuration

### Related questions
> In this section the necessary topics are listed which may need to be digested if one try
 to reconsider the alternatives...

- [application configuration vs config files](https://12factor.net/config)
- [one codebase, many deploys](https://12factor.net/codebase)
- [build and release](https://12factor.net/build-release-run)


