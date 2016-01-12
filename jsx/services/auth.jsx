// TODO: define path for jQuery
import $ from '../../bower_components/jquery/dist/jquery.min'

let user;

const ajax = (options = {}) => {
    return new Promise((resolve, reject) => {
        options = Object.assign({
            type: 'POST',
            url: '/',
            data: null,
            success: resp => {
                resolve(resp);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                reject(errorThrown);
            }
        }, options);

        $.ajax(options);
    });
};

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
