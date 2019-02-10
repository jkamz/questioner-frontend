// Handle logic for getting upcoming meetups and specific meetup ID

// Save meetup ID to help visit specific meetup page
const meetupDetails = (id) => {
    // event.preventDefault();
    // event.stopPropagation();
    localStorage.setItem('meetup_id', id);
    window.location.href = 'meetup.html';
};

// fetch upcoming meetups and render to html
function upcomingMeetups() {
    const url = 'https://questionerandela.herokuapp.com/api/v2/meetups/upcoming';
    const titles = document.getElementsByClassName('meetuptitle');
    const locations = document.getElementsByClassName('location');
    const dates = document.getElementsByClassName('date');
    const meetupsdiv = document.getElementsByClassName('box');

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data.message === 'success') {
                const meetupsArr = data.meetups;
                meetupsArr.reverse();
                // for (let x = 0; x < meetupsArr.length; x += 1) {
                for (let i = 0; i < titles.length; i += 1) {
                    titles.item(i).innerHTML = meetupsArr[i].topic;
                    locations.item(i).innerHTML = `location: ${meetupsArr[i].location}`;
                    dates.item(i).innerHTML = `Happening On: ${meetupsArr[i].happeningon}`;
                    meetupsdiv.item(i).setAttribute('id', meetupsArr[i].meetup_id);
                    document.getElementById(meetupsArr[i].meetup_id).addEventListener('click', () => { meetupDetails(meetupsArr[i].meetup_id); });
                }
                // }
                // for (let meetup of meetupsArr) {
                //     document.getElementById(meetup.meetup_id).addEventListener('click', meetupDetails);
            // }
            }
        });
}

// add event listener
window.addEventListener('load', upcomingMeetups);
