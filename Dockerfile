FROM node:10-alpine

LABEL maintainer="Jean-Baptiste Terrazzoni"
LABEL contact="jterrazz@protonmail.com"

VOLUME /home/deal41
WORKDIR /home/deal41
CMD yarn && yarn migration.run && yarn dev
