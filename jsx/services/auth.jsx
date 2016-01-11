// TODO: define path for jQuery
import $ from '../../bower_components/jquery/dist/jquery.min'

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
        ajax({
            url: '/login',
            data: {
                username,
                password
            }
        }).then(resp => {
            console.log(resp);
        })
    },

    testAuth: () => {
        return ajax({
            url: '/secured',
        }).then(() => true, () => false);
    },

    getUser: () => {

    }
}
