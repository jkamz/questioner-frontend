const questionId = localStorage.getItem('question_id');
const form = document.querySelector('form');
const spinner = document.querySelector('.comments-loading');
const commentsUrl = `https://questionerandela.herokuapp.com/api/v2/questions/${questionId}/comments`;
const questionUrl = `https://questionerandela.herokuapp.com/api/v2/questions/${questionId}`;
const token = localStorage.getItem('token');
spinner.style.display = '';

function checkToken() {
    if (token === null) {
        window.alert('Please login to add comment');
        window.location.href = '../templates/signin.html';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkToken();
    const formData = new FormData(form);
    const body = formData.get('comment');
    const fieldData = {
        body,
    };

    form.style.display = 'none';
    spinner.style.display = '';

    fetch(commentsUrl, {
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
                getComments();
            } else if (data.msg === 'Token has expired') {
                window.alert('Please login to add comment');
                window.location.href = '../templates/signin.html';
            } else {
                let y = data.message[Object.keys(data.message)[0]];
                window.alert(y);
            }
            form.reset();
            form.style.display = '';
            spinner.style.display = 'none';
        });
});

function getComments() {
    fetch(commentsUrl)
        .then(response => response.json())
        .then((data) => {
            const commentsObj = data.comments;
            commentsObj.reverse();
            let result = '';
            commentsObj.forEach((comment) => {
                const dateObj = comment.created_on;
                const dateToFormat = new Date(dateObj);
                const dateFormated = dateToFormat.toLocaleString();
                result += `<div class="single-comment">
                    <p href="#" class="question-details">${comment.body}</p>
                    <p>Submitted by <a href="#" class="submittedby">${comment.author}</a> at ${dateFormated}</p>
                </div>`;
            });
            document.getElementById('comments').innerHTML = result;
            spinner.style.display = 'none';
            console.log(commentsObj);
        });
}

function getQuestion() {
    const body = document.querySelector('#question-body');
    const author = document.querySelector('#question-author');
    const time = document.querySelector('#question-time');
    const votes = document.querySelector('#question-votes');
    const submitted = document.querySelector('#submittedby');
    fetch(questionUrl)
        .then(response => response.json())
        .then((data) => {
            const questionObj = data.question;
            const dateObj = questionObj.created_on;
            const dateToFormat = new Date(dateObj);
            const dateFormated = dateToFormat.toLocaleString();

            body.innerHTML = questionObj.body;
            author.innerHTML = questionObj.author;
            time.innerHTML = `at ${dateFormated}`;
            votes.innerHTML = questionObj.votes;
            submitted.innerHTML = 'Submitted By ';
        });
}

getComments();
getQuestion();
