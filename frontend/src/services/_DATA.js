export function _register(first_name, last_name, email, username, password, avatar) {
    let form_data = new FormData()
    form_data.append('first_name', first_name)
    form_data.append('last_name', last_name)
    form_data.append('email', email)
    form_data.append('username', username)
    form_data.append('password', password)
    form_data.append('avatar', avatar)

    return new Promise((resolve) => {
        fetch('http://localhost:8000/register/', form_data, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
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
            body: JSON.stringify({
                username,
                password
            }).then(({ token }) => resolve(token))
        })
    })
}

export function _getUsers() {
    return new Promise((resolve) => {
        fetch('http://localhost:8000/api/v1/users/')
            .then((response) => resolve(response.json()))
    })
}

export function _getQuestions() {
    return new Promise((resolve) => {
        fetch('http://localhost:8000/api/v1/questions/')
            .then((response) => resolve(response.json()))
    })
}

export function _saveQuestion({ optionOneText, optionTwoText }) {
    return new Promise((resolve) => {
        fetch('http://localhost:8000/api/v1/question/', {
            method: 'POST',
            headers: {
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
        fetch('http://localhost:8000/api/v1/vote/', {
            method: 'POST',
            headers: {
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
