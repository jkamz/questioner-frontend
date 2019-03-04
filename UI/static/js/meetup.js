
const questionDetails = (id) => {
    localStorage.setItem('question_id', id);
    window.location.href = 'comments.html';
    return false;
};

const meetupId = localStorage.getItem('meetup_id');
const token = localStorage.getItem('token');

function checkToken() {
    if (token === null) {
        window.alert('Please login to vote');
        window.location.href = '../templates/signin.html';
    }
}

function Meetup() {

    const url = `https://questionerandela.herokuapp.com/api/v2/meetups/${meetupId}`;
    const questionUrl = `https://questionerandela.herokuapp.com/api/v2/meetups/${meetupId}/questions`;
    const title = document.getElementById('title');
    const host = document.getElementById('host');
    const summary = document.getElementById('summary');
    const date = document.getElementById('date');

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 200) {
                const meetupObj = data.meetup;
                const dateFormated = meetupObj.happeningon.toString();
                title.innerHTML = meetupObj.topic;
                host.innerHTML = meetupObj.host;
                summary.innerHTML = meetupObj.summary;
                date.innerHTML = dateFormated;
                return fetch(questionUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then((data1) => {
                        if (data1.message === 'success') {
                            const questionObj = data1.questions;
                            console.log(questionObj);
                            let result = '';
                            for (let i = 0; i < questionObj.length; i += 1) {
                                result += `<div class="question">
                                    <div class="question-no">Q.${i + 1}</div>
                                    <div class="upvotes">
                                        <a href="#"><div class="arrow up" id = "uv${questionObj[i].question_id}"></div></a>
                                        <div id="votes${questionObj[i].question_id}" class="votes">${questionObj[i].votes}</div>
                                        <a href="#"><div class="arrow down" id = "dv${questionObj[i].question_id}"></div></a>
                                    </div>
                                    <div class="question-body">
                                        <a href="comments.html" id = "${questionObj[i].question_id}" onclick = "questionDetails(${questionObj[i].question_id})" class="question-details">${questionObj[i].body}</a>
                                        <p>Submitted by <a href="#" class="submittedby">${questionObj[i].author}</a> at 12:23pm</p>
                                        <div class="question-options">
                                            <span><a href="comments.html">Comments</a></span>
                                        </div>
                                    </div>
                                </div>`;
                            }
                            document.getElementById('results').innerHTML = result;
                            questionObj.forEach((item) => {
                                document.getElementById(`uv${item.question_id}`).addEventListener('click', upvoteQuestion);
                                document.getElementById(`dv${item.question_id}`).addEventListener('click', downvoteQuestion);
                            });
                        }
                    });
            } // else {
            window.alert(data.message);
            // }
        })
        .catch((error) => {
            console.error(error);
        });
}

const upvoteQuestion = (event) => {
    event.preventDefault();
    checkToken();
    const questionId = event.target.id.slice(2);
    const upvoteUrl = `https://questionerandela.herokuapp.com/api/v2/questions/${questionId}/upvote`;
    let upv = document.getElementById(`uv${questionId}`);
    let votes = document.getElementById(`votes${questionId}`).innerHTML;
    let value = Number(votes);

    upv.classList.add('isDisabled');

    fetch(upvoteUrl, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data.msg === 'Token has expired') {
                window.alert('Please log in to vote');
            } else if (data.data[1].message === 'removed upvote successfully') {
                const newValue = value - 1;
                document.getElementById(`votes${questionId}`).innerHTML = newValue;
                console.log(newValue);
                upv.classList.remove('voteColor');
            } else if (data.data[1].message === 'upvote successful') {
                const newValue = value + 1;
                document.getElementById(`votes${questionId}`).innerHTML = newValue;
                console.log(newValue);
                upv.classList.add('voteColor');
            }

            upv.classList.remove('isDisabled');
        });
};

const downvoteQuestion = (event) => {
    event.preventDefault();
    checkToken();
    const questionId = event.target.id.slice(2);
    const downvoteUrl = `https://questionerandela.herokuapp.com/api/v2/questions/${questionId}/downvote`;
    let dv = document.getElementById(`dv${questionId}`);
    let votes = document.getElementById(`votes${questionId}`).innerHTML;
    let value = Number(votes);

    dv.classList.add('isDisabled');

    fetch(downvoteUrl, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data.msg === 'Token has expired') {
                window.alert('Please log in to vote');
            } else if (data.data[1].message === 'removed downvote successfully') {
                const newValue = value + 1;
                document.getElementById(`votes${questionId}`).innerHTML = newValue;
                console.log(newValue);
                dv.classList.remove('voteColor');
            } else if (data.data[1].message === 'downvote successful') {
                const newValue = value - 1;
                document.getElementById(`votes${questionId}`).innerHTML = newValue;
                console.log(newValue);
                dv.classList.add('voteColor');
            }

            dv.classList.remove('isDisabled');
        });
};

window.addEventListener('load', Meetup);
