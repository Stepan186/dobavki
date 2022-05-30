import qs from 'qs';

export default function({ $axios, redirect, store, $cookies, $config, error }, inject) {
    $axios.onRequest((config) => {
        if (config.params) {
            config.paramsSerializer = function(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            };
        }
    });

    $axios.onResponse((response) => {
        return response.data;
    });

    $axios.onError((err) => {
        // eslint-disable-next-line no-console
        console.error(err);

        return Promise.reject(err.response);
    });

    $axios.setToken($cookies.get('jwt'), 'JWT');

    $axios.setBaseURL($config.apiHost);
    inject('api', {
        register(modules) {
            for (const key of Object.keys(modules)) {
                modules[key].$axios = $axios;
                this[key] = modules[key];
            }
        },
    });
}
