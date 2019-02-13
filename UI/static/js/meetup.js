
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
                            result = '';
                            for (let item of questionObj) {
                                result +=
                                `<div class="question">
                                    <div class="question-no">Q.1</div>
                                    <div class="upvotes">
                                        <a href="#"><div class="arrow up"></div></a>
                                        <div class="votes">${item.votes}</div>
                                        <a href="#"><div class="arrow down"></div></a>
                                    </div>
                                    <div class="question-body">
                                        <a href="comments.html" class="question-details">${item.body}</a>
                                        <p>Submitted by <a href="#" class="submittedby">${item.author}</a> at 12:23pm</p>
                                        <div class="question-options">
                                            <span><a href="comments.html">5 Comments</a></span>
                                            <span>Report</span>
                                        </div>
                                    </div>
                                </div>`
                            }
                            document.getElementById('results').innerHTML = result;
                        }
                    });

            } else {
                window.alert(data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

window.addEventListener('load', Meetup);
