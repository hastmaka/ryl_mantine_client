export async function FetchApi(endpoint, method = 'GET', data, query = {}) {
    // const baseUrl = 'https://api.rbt.ngrok.io/api/';
    // const baseUrl = 'https://localhost:443/api/';
    const baseUrl = 'https://us-central1-rylllc.cloudfunctions.net/app/api/';
    // const baseUrl = 'http://localhost:3000/api/';

    let url = new URL(baseUrl + endpoint),
        tempQuery = {...query};

    url.search = new URLSearchParams(tempQuery).toString()

    let options = {
        method: method?.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (method && method.toUpperCase() !== 'GET') {
        options.body = JSON.stringify(data)
    }

    try {
        let response = await fetch(url, options);
        response = await response.json();

        if (!response.success) {
            throw {code: response.status, message: response.message};
        }

        return response

    } catch(e) {debugger
        console.log(e)
        switch(e.code) {
            case 401:
            case 400: //email already in use
            case 403:
                return {...e}
            default:
                return e.message
        }
    }
}











































