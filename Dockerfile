FROM node:alpine AS ui-build

WORKDIR /usr/src

COPY ./lireddit-client ./ui

RUN cd ui && npm install && npm run build

CMD [ "" ]

