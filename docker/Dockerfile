FROM dera/ubuntu_base:latest

MAINTAINER dera-

#インストールするもの
RUN apt-get -y install nginx
RUN apt-get -y install supervisor
COPY ./supervisor/supervisord.conf /etc/supervisord.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD /usr/bin/supervisord -c /etc/supervisord.conf
