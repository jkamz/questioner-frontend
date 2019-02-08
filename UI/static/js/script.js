// Hide create button if not admin
function hideCreateButton() {
    const x = localStorage.getItem('username');
    const status = document.getElementById('meet-button');

    if (x !== null) {
        document.getElementById('user').innerHTML = x;
    }

    if (x === 'admin') {
        status.style.display = 'block';

        [].forEach.call(document.querySelectorAll('.delete-meetup-button'), (el) => {
            el.style.visibility = 'visible';
        });
    }
}

window.addEventListener('load', hideCreateButton);
