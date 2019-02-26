const questionId = localStorage.getItem('question_id');
const form = document.querySelector('form');
const spinner = document.querySelector('.comments-loading');
const commentsUrl = `https://questionerandela.herokuapp.com/api/v2/questions/${questionId}/comments`;
const questionUrl = `https://questionerandela.herokuapp.com/api/v2/questions/${questionId}`;
spinner.style.display = '';

getComments();
getQuestion();

form.addEventListener('submit', (event) => {
    event.preventDefault();
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
                    <a href="#" class="question-details">${comment.body}</a>
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
