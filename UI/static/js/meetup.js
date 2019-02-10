
const meetupId = localStorage.getItem('meetup_id');

function Meetup() {

    const url = `https://questionerandela.herokuapp.com/api/v2/meetups/${meetupId}`;
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
            } else {
                window.alert(data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

window.addEventListener('load', Meetup);
