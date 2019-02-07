// Methods to consume signup API using Fetch API

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
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            if (data.status === 201) {
                window.location.href = '../templates/signin.html';
            } else {
                window.alert(data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}


// Validations

function validatePass() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordconfirm').value;
    if (password !== confirmPassword) {
        window.alert('Passwords do not match.');
        return false;
    }
    return true;
}

// Listen to events and call functions

signup.addEventListener('click', signUp);
