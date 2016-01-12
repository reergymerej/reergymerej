import generic from './generic.jsx';

const {ajax} = generic
let user;

export default {
    login: (username, password) => {
        return ajax({
            url: '/login',
            data: {
                username,
                password
            }
        });
    },

    logout: () => {
        return ajax({
            url: '/logout'
        });
    },

    testAuth: () => {
        return ajax({
            url: '/secured',
        }).then(() => true, () => false);
    },

    getUser: () => {
        return new Promise((resolve, reject) => {
            if (user) {
                resolve(user);
            } else {
                ajax({
                    type: 'GET',
                    url: '/user',
                }).then(resolve, reject);
            }
        });
    },
}
