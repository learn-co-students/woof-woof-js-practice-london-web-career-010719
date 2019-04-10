class Api {
    static getPups() {
        return fetch(PUPS_URL)
        .then(res => res.json())
    }

    static updatePupsLikes(id, like) {
        const options = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({like: like})
        }
        
        return fetch(`http://localhost:3000/pups/${id}`, options)
        .then(res => res.json())
    }
}