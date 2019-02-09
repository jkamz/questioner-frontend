function upcomingMeetups() {
    const url = 'https://questionerandela.herokuapp.com/api/v2/meetups/upcoming';
    let titles = document.getElementsByClassName('meetuptitle');
    let locations = document.getElementsByClassName('location');
    let dates = document.getElementsByClassName('date');
    let meetupsdiv = document.getElementsByClassName('meetup');

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
                    for (let i = 0; i < titles.length; i++) {
                        titles.item(i).innerHTML = meetups[i].topic;
                        locations.item(i).innerHTML = `location: ${meetups[i].location}`;
                        dates.item(i).innerHTML = `Happening On: ${meetups[i].happeningon}`;
                        meetupsdiv.item(i).setAttribute('id', meetups[i].meetup_id);
                    }
                }
            }
        });
}

window.addEventListener('load', upcomingMeetups);
