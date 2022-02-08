export function _register() {
    return new Promise((resolve) => {

    })
}

export function _login() {
    return new Promise((resolve) => {

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
