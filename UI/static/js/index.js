function upcomingMeetups() {
    const url = 'https://questionerandela.herokuapp.com/api/v2/meetups/upcoming';
    let titles = document.getElementsByClassName('meetuptitle');

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data.message === 'success') {
                let meetups = data.meetups;
                meetups.reverse();
                for (let x = 0; x < meetups.length; x++) {
                    topics.push(meetups[x].topic);
                    for (let i = 0; i < titles.length; i++) {
                        titles.item(i).innerHTML = meetups[i].topic;
                    }
                }
            }
        });
}

window.addEventListener('load', upcomingMeetups);
