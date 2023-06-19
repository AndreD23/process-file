FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

USER node

CMD ["tail", "-f", "/dev/null"]