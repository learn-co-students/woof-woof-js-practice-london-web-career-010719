class Adapter {
    static getPups() {
        return fetch("http://localhost:3000/pups")
        .then(res => res.json())
    }

    static createPup() {

    }

    static updatePup(id, data) {
        const options = {
            method: "PATCH", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        return fetch(`http://localhost:3000/pups/${id}`, options)
        .then(res => res.json()) 
    }

    static deletePup(id) {
        return fetch(`http://localhost:3000/pups/${id}`, {method: "DELETE"})
    }
}