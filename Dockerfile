FROM node:8-alpine

ENV PORT 3001
ENV CI true

EXPOSE $PORT

ADD . /app

WORKDIR /app

RUN yarn install && \
    yarn run build && \
    yarn run test && \

    rm -rf node_modules && \
    yarn install --production --ignore-scripts --pure-lockfile --offline && \
    ls -1a | grep -vx 'build' | grep -vx 'build-server' | grep -vx 'node_modules' | grep -vx '.' | grep -vx '..' | xargs -I {} rm -rf {} && \
    yarn cache clean

CMD node build-server/server/index.js
