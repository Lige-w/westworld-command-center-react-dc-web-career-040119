export default class Fetch {
    static hosts() {
        return fetch('http://localhost:4000/hosts')
            .then(resp => resp.json())
    }

    static areas() {
        return fetch('http://localhost:4000/areas')
            .then(res => res.json())
    }

    static updateHost(host) {
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(host)
        }

        return fetch(`http://localhost:4000/hosts/${host.id}`, configObj)
            .then(resp => resp.json())
    }
}