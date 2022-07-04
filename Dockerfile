FROM node:15-alpine As builder

WORKDIR /usr/src/app

COPY . .

### STAGE 2: Run ###
FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/survey-admin/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
