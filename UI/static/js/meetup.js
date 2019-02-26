
const questionDetails = (id) => {
    localStorage.setItem('question_id', id);
    window.location.href = 'comments.html';
    return false;
};

const meetupId = localStorage.getItem('meetup_id');

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
                                        <a href="#"><div class="arrow up"></div></a>
                                        <div class="votes">${questionObj[i].votes}</div>
                                        <a href="#"><div class="arrow down"></div></a>
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

window.addEventListener('load', Meetup);
