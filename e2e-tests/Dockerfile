FROM node:8.7-alpine

ADD . /app

WORKDIR /app

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" > /etc/apk/repositories && \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk add --update curl python build-base udev ttf-freefont chromium chromium-chromedriver bash && \
    yarn install && \
    yarn analyze

CMD yarn test
