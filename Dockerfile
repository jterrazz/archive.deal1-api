FROM node:10-alpine

LABEL maintainer="Jean-Baptiste Terrazzoni"
LABEL contact="jterrazz@protonmail.com"

WORKDIR /home/deal41
VOLUME /home/deal41
CMD yarn && yarn migration.run && yarn dev
