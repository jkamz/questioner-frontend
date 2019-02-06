// Methods to consume signup and signin API using Fetch API

// SignUp
const signup = document.getElementById('signupBtn');

function signUp(event) {
    event.preventDefault();
    const url = 'https://questionerandela.herokuapp.com/api/v2/auth/signup';

    const fieldData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        phoneNumber: document.getElementById('phonenumber').value,
        password: document.getElementById('password').value,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(fieldData),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            if (data.status === 201) {
                window.location.href = '../templates/signin.html';
            } else {
                window.alert(data.message);
            }
        })
        .catch(function (error) {
            console.error(error)
        });
}

// call functions


signup.addEventListener('click', signUp);
