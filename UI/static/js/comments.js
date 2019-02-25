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

}
