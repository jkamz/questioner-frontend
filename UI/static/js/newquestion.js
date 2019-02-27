const spinner = document.querySelector('#question-loader');
const submitBtn = document.querySelector('.button-question');
const meetupId = localStorage.getItem('meetup_id');
const token = localStorage.getItem('token');
const questionUrl = `https://questionerandela.herokuapp.com/api/v2/meetups/${meetupId}/questions`;

function checkToken() {
    if (token === null) {
        window.alert('Please login to add question');
        window.location.href = '../templates/signin.html';
    }
}

function createQuestion() {
    const fieldData = {
        body: document.getElementById('new-question').value,
    };

    fetch(questionUrl, {
        method: 'POST',
        body: JSON.stringify(fieldData),
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 201) {
                window.location.href = '../templates/meetup.html';
            } else if (data.msg === 'Token has expired') {
                window.alert('Please login to add question');
                window.location.href = '../templates/signin.html';
            } else {
                let y = data.message[Object.keys(data.message)[0]];
                window.alert(y);
                console.log(data);
            }
            spinner.style.display = 'none';
        });
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    spinner.style.display = 'inline-block';
    checkToken();
    createQuestion();
});
