'use strict';

import axios from 'axios';

export class Service {

    constructor(url) {
        this.url = url;
    }

    /**
     * Request to Get Data from Server.
     * @param {string} [id]
     * @returns {Promise}
     */
    get(id = '') {
        return axios.get(`${this.url}/${id}`);
    }

    /**
     * Request To Create Data On Server.
     * @param {object} data
     * @returns {Promise}
     */
    create(data) {
        return axios.post(`${this.url}`, data);
    }

    /**
     * Request To Update Data On Server.
     * @param {string} id
     * @param {object} data
     * @returns {Promise}
     */
    update(id, data) {
        return axios.put(`${this.url}/${id}`, data);
    }

    /**
     * Request For Delete Data On Server.
     * @param {string} id
     * @returns {Promise}
     */
    delete(id) {
        return axios.delete(`${this.url}/${id}`);
    }

}


