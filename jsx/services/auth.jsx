// TODO: define path for jQuery
import $ from '../../bower_components/jquery/dist/jquery.min'

export default {
    login: (username, password) => {
        $.ajax({
            type: 'POST',
            url: '/login',
            data: {
                username,
                password
            }
        });
    },

    testAuth: () => {
        return new Promise(resolve => {
            $.ajax({
                type: 'POST',
                url: '/secured',
                success: () => {
                    resolve(true);
                },
                error: () => {
                    resolve(false);
                },
            });
        });
    }
}
