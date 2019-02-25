const questionId = localStorage.getItem('question_id');
const form = document.querySelector('form');
const spinner = document.querySelector('.comments-loading');
const commentsUrl = `https://questionerandela.herokuapp.com/api/v2/questions/${questionId}/comments`;
spinner.style.display = '';

getComments();

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

function getComments() {
    fetch(commentsUrl)
        .then(response => response.json())
        .then((data) => {
            const commentsObj = data.comments;
            console.log(commentsObj);
        });
}
