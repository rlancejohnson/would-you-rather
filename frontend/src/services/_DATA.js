export function _register({ first_name, last_name, email, username, password, avatar }) {
    return new Promise((resolve) => {
        let form_data = new FormData()
        form_data.append('first_name', first_name)
        form_data.append('last_name', last_name)
        form_data.append('email', email)
        form_data.append('username', username)
        form_data.append('password', password)
        form_data.append('avatar', avatar)

        fetch('http://localhost:8000/register/', {
            method: 'POST',
            body: form_data
        }).then((newUser) => resolve(newUser))
    })
}

export function _login(username, password) {
    return new Promise((resolve) => {
        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then((response) => resolve(response.json()))
    })
}

export function _getUsers() {
    return new Promise((resolve) => {
        const userId = sessionStorage.getItem('accessToken')

        fetch('http://localhost:8000/api/v1/users/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${userId}`,
                'Accept': 'application/json'
            }
        }).then((response) => resolve(response.json()))
    })
}

export function _getQuestions() {
    return new Promise((resolve) => {
        const userId = sessionStorage.getItem('accessToken')

        fetch('http://localhost:8000/api/v1/questions/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${userId}`,
                'Accept': 'application/json'
            }
        }).then((response) => resolve(response.json()))
    })
}

export function _saveQuestion({ optionOneText, optionTwoText }) {
    return new Promise((resolve) => {
        const userId = sessionStorage.getItem('accessToken')

        fetch('http://localhost:8000/api/v1/question/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${userId}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                optionOne: optionOneText,
                optionTwo: optionTwoText
            })
        }).then((response) => {
            console.log(response)
            return resolve(response.json())
        })
    })
}

export function _saveQuestionAnswer({ qid, answer }) {
    return new Promise((resolve) => {
        const userId = sessionStorage.getItem('accessToken')

        fetch('http://localhost:8000/api/v1/vote/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${userId}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                question: qid,
                choice: answer
            })
        }).then((response) => {
            console.log(response)
            return resolve(response.json())
        })
    })
}
