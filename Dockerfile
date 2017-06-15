FROM node:8

ENV PORT 3000
ENV CI true

EXPOSE $PORT

ADD . /app

WORKDIR /app

RUN yarn install && \
    yarn run build && \
    yarn run test && \
    ls -1 | grep -vx build | xargs -I {} rm -rf {} && \
    yarn global add serve

CMD serve -s build -p $PORT
