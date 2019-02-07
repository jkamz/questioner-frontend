const signin = document.getElementById('signinBtn');

// fetch signin API

function signIn(event) {
    event.preventDefault();
    const url = 'https://questionerandela.herokuapp.com/api/v2/auth/signin';

    const fieldData = {
        username: document.getElementById('username').value,
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
            if (data.status === 200) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('username', fieldData.username);
                console.log(data);
                window.location.href = '../templates/index.html';
            } else {
                window.alert(data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

signin.addEventListener('click', signIn);
