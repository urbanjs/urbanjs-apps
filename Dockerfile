FROM node:8.6-alpine

ENV REACT_SERVER__PORT 3001
ENV CI true
ENV NODE_ENV production

EXPOSE $REACT_SERVER__PORT

ADD . /app

WORKDIR /app

RUN apk add --update python build-base && \
    NODE_ENV=development yarn install --production=false && \
    yarn global add pm2@^2 && \
    yarn run build && \
    yarn run test && \

    rm -rf node_modules && \
    yarn install --production --ignore-scripts --pure-lockfile --offline && \
    ls -1a | grep -vx 'bin' | grep -vx 'build' | grep -vx 'dist' | grep -vx 'node_modules' | grep -vx '.' | grep -vx '..' | xargs -I {} rm -rf {} && \
    yarn cache clean && \
    apk del python build-base && \
    rm -rf /var/cache/apk/*

CMD pm2-docker start dist/apps/server/index.js
