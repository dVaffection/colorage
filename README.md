Colorage
========

It's a test project featuring Node.js API usage on the backend and Backbone on the frontend interacting via Websockets. 

### Basic
* Clone project `git clone https://github.com/dVaffection/colorage.git`
* Add app/config/local.js from sample `cp app/config/local.js.sample app/config/local.js`
* Fetch dependencies `npm install`


### Run unit tests
* Install nodejs globaly and create alias nodejs -> node `sudo ln -s /usr/bin/nodejs /usr/bin/node`
* Install nodeunit globaly `sudo npm install -g nodeunit`
* Run unit tests `nodeunit tests/unit/*`


### Run functional tests
* Install mongodb `sudo apt-get install mongodb`
* Make sure port 8181 is free
* Start application by running `node app/app.js`
* Run 

**Note:** *Both functional and unit tests can be run via pre-commit script `./dev/git/hooks/pre-commit -v`*


### Accessing website
* Install nginx 1.4 or higher with support of websockets
Configuration
```
server {
        listen          80;
        server_name     colorage.dev;

        root            /var/www/colorage/public;

        location ~* /(css|js|img|templates)/ {
                try_files $uri =404;
        }

        location / {
                proxy_pass http://localhost:8181;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
        }
}
```
* Add colorage.dev to /etc/hosts
