import axios from 'axios';

export class Service {

    constructor(url) {
        this.url = url;
    }

    get(id = '') {
        return axios.get(`${this.url}/${id}`);
    }

    create(data) {
        return axios.post(`${this.url}`, data);
    }

    update(id, data) {
        return axios.put(`${this.url}/${id}`, data);
    }

    delete(id) {
        return axios.delete(`${this.url}/${id}`);
    }

}


