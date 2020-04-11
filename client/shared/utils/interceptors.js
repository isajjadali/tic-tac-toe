'use strict';

import axios from 'axios';

export function axiosInterceptor() {
    axios.interceptors.response.use(
        response => response,
        error => Promise.reject(error.response.data),
    );
}
