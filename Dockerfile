FROM node:8-alpine

ENV PORT 3001
ENV CI true

EXPOSE $PORT

ADD . /app

WORKDIR /app

RUN apk add --update python build-base && \
    yarn install && \
    yarn global add pm2@^2 && \
    yarn run build && \
    yarn run test && \

    rm -rf node_modules && \
    yarn install --production --ignore-scripts --pure-lockfile --offline && \
    ls -1a | grep -vx 'build' | grep -vx 'build-server' | grep -vx 'node_modules' | grep -vx '.' | grep -vx '..' | xargs -I {} rm -rf {} && \
    yarn cache clean && \
    apk del python build-base

CMD NODE_ENV=production pm2-docker start build-server/server/index.js
