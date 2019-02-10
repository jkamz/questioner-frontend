
const meetupId = localStorage.getItem('meetup_id');

function Meetup() {

    const url = `https://questionerandela.herokuapp.com/api/v2/meetups/${meetupId}`;
    const title = document.getElementById('title');
    const host = document.getElementById('host');
    const summary = document.getElementById('summary');

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
                title.innerHTML = meetupObj.topic;
                host.innerHTML = meetupObj.host;
                summary.innerHTML = meetupObj.summary;
            } else {
                window.alert(data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

window.addEventListener('load', Meetup);
