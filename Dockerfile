FROM boclipsconcourse/nginx-spa:0.12.0
COPY dist /usr/share/nginx/html
COPY application.conf /etc/nginx/conf.d/application.conf
