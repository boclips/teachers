FROM boclipsconcourse/nginx-spa:0.14.0
COPY dist /usr/share/nginx/html
COPY application.conf /etc/nginx/conf.d/application.conf
