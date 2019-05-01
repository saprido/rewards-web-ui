# docker build -t nginx-angular -f nginx.dockerfile .

FROM nginx:alpine
LABEL author="SANJANA DODLEY"
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx /usr/share/nginx/html