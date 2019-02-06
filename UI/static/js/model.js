export default class Model {
    constructor(endpoint) {
        this.url = `http://127.0.0.1:5000/api/v2${endpoint}`;
    }

    postMethod(fieldData, token=null) {
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(fieldData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

