#reerGymereJ

* npm install

*start server*
DEBUG=reergymerej:* npm start

*transpile modules and browserify*

cd ./jsx && watchify -d -t -v [ babelify ] main.jsx -o ../public/js/main.js


## TODO

* Get Jest going.
* live reload
* make it easier to start up development (npm script or something)