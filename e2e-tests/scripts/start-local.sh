#!/usr/bin/env bash

USAGE=$'
Usage: start-test.sh
\t -c \t\t build counter'

while getopts ":c:" opts; do
   case ${opts} in
      c) BUILD_COUNTER=${OPTARG}
      ;;
      \?) echo "Invalid option -$OPTARG.
                $USAGE" >&2
          exit 1
      ;;
   esac
done

if [ -z "$BUILD_COUNTER" ]; then
    echo "$USAGE" >&2
    exit 1
fi

APP_IMAGE_NAME="app$BUILD_COUNTER"
TEST_IMAGE_NAME="testapp$BUILD_COUNTER"
SERVER_HOSTNAME="local.urbanjs.io"
SERVER_ORIGIN="http://$SERVER_HOSTNAME:3001"
APP_CONTAINER_NAME="${APP_IMAGE_NAME}_container"
TEST_CONTAINER_NAME="${TEST_IMAGE_NAME}_container"

docker build . -t $TEST_IMAGE_NAME
cd  ../
docker build . -t $APP_IMAGE_NAME

{
    docker run -e ENVIRONMENT=test --name=$APP_CONTAINER_NAME $APP_IMAGE_NAME &
    sleep 5
    docker run -e REACT_E2E__SERVER_ORIGIN=$SERVER_ORIGIN --link $APP_CONTAINER_NAME:$SERVER_HOSTNAME --name=$TEST_CONTAINER_NAME $TEST_IMAGE_NAME
}

trap  errorHandler ERR

cleanup() {
   echo "Cleanup docker"
   docker stop  $APP_CONTAINER_NAME  || true
   docker rm  $APP_CONTAINER_NAME || true
   docker rm  $TEST_CONTAINER_NAME || true
   docker rmi  $APP_IMAGE_NAME || true
   docker rmi  $TEST_IMAGE_NAME || true
}

errorHandler() {
    errcode=$?
    cleanup
    exit $errcode
}

cleanup
