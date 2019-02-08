const meetup = document.getElementById('meetupBtn');

function createMeetup(event) {
    event.preventDefault();
    const url = 'https://questionerandela.herokuapp.com/api/v2/meetups';
    const token = localStorage.getItem('token');

    const fieldData = {
        host: document.getElementById('host').value,
        location: document.getElementById('location').value,
        happeningOn: document.getElementById('date').value,
        summary: document.getElementById('summary').value,
        topic: document.getElementById('topic').value,
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(fieldData),
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 201) {
                console.log(data);
                window.location.href = '../templates/index.html';
            } else if (data.status === 422) {
                const x = data.message[Object.keys(data.message)[0]];
                window.alert(x);
                console.log(x);
            } else if (data.msg === 'Token has expired') {
                window.alert('Please login to create meetup');
                window.location.href = '../templates/signin.html';
            } else if (data.status === 403) {
                window.alert('Not Allowed. Login as Adminstrator');
                // window.location.href = "../templates/signin.html";
            } else {
                window.alert(data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}


meetup.addEventListener('click', createMeetup);
