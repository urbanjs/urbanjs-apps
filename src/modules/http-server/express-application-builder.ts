import { injectable, multiInject } from 'inversify';
import { inject, optional } from '../../decorators';
import { IJWTService, TYPE_JWT_SERVICE } from '../jwt/types';
import { IUserService, TYPE_USER_SERVICE } from '../user/types';
import { TYPE_SERVICE_LOGGER, ILoggerService } from '../log/types';
import { IErrorService, TYPE_ERROR_SERVICE } from '../error/types';
import { IFacebookApiService, TYPE_FACEBOOK_API_SERVICE } from '../facebook/types';
import { ICookieService, TYPE_COOKIE_SERVICE } from '../http/types';
import {
  TYPE_GRAPHQL_RESOLVER_MAP,
  GraphqlResolverMap,
  TYPE_GRAPHQL_TYPE_DEFS,
  GraphqlTypeDefs
} from '../graphql/types';
import {
  TYPE_HTTP_CONTROLLER,
  IHttpController,
  HttpServerConfig,
  TYPE_HTTP_CONFIG,
  IHttpApplicationBuilder
} from './types';
import { createExpressApplication } from './expess';

@injectable()
export class ExpressApplicationBuilder implements IHttpApplicationBuilder {
  constructor(@inject(TYPE_FACEBOOK_API_SERVICE) private facebookApiService: IFacebookApiService,
              @inject(TYPE_GRAPHQL_RESOLVER_MAP) @optional() private graphqlResolvers: GraphqlResolverMap,
              @inject(TYPE_GRAPHQL_TYPE_DEFS) @optional() private graphqlTypeDefs: GraphqlTypeDefs,
              @multiInject(TYPE_HTTP_CONTROLLER) @optional() private apiControllers: IHttpController[],
              @inject(TYPE_SERVICE_LOGGER) private loggerService: ILoggerService,
              @inject(TYPE_COOKIE_SERVICE) private cookieService: ICookieService,
              @inject(TYPE_ERROR_SERVICE) private errorService: IErrorService,
              @inject(TYPE_USER_SERVICE) private userService: IUserService,
              @inject(TYPE_JWT_SERVICE) private jwtService: IJWTService,
              @inject(TYPE_HTTP_CONFIG) private config: HttpServerConfig) {
  }

  create() {
    return createExpressApplication(Object.assign({}, this.config, {
      facebookApiService: this.facebookApiService,
      graphqlResolvers: this.graphqlResolvers,
      graphqlTypeDefs: this.graphqlTypeDefs,
      apiControllers: this.apiControllers,
      loggerService: this.loggerService,
      cookieService: this.cookieService,
      errorService: this.errorService,
      userService: this.userService,
      jwtService: this.jwtService
    }));
  }
}
