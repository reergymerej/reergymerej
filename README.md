#reerGymereJ

* npm install

*start server*
DEBUG=reergymerej:* npm start

*transpile modules and browserify*

from /jsx
    `watchify -d -t -v [ babelify ] main.jsx -o ../public/js/main.js`
