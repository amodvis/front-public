#FROM nginx:alpine

FROM nginx:alpine

WORKDIR /srv/

COPY . .
