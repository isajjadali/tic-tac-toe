'use strict';

import axios from 'axios';

/**
 * Axios Interceptor To Send Error In Catch Clause Instead Of Second Parameter Of Then Clause.
 */
export function axiosInterceptor() {
    axios.interceptors.response.use(
        response => response,
        error => Promise.reject(error.response.data),
    );
}
