// Email validation message

const email = document.getElementById('email');

email.addEventListener('input', function () {
    if (email.validity.typeMismatch) {
        email.setCustomValidity('Not valid email');
    } else {
        email.setCustomValidity('');
    }
});


function Validate() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordconfirm').value;
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }
    return true;
}

window.onload = function () {
    document.getElementById('signupBtn').addEventListener('click', Validate);
};


/* function hideCreateButton(argument) {
    x = localStorage.getItem('userName');
    document.getElementById('user').innerHTML = x;

    var user = document.getElementById('user').innerHTML;
    var status = document.getElementById('meet-button')
    var status2 = document.getElementById('delete-meet-button')

    if (user !== 'Admin') {
        status.style.display = 'none';

        [].forEach.call(document.querySelectorAll('.delete-meetup-button'), function(el) {
            el.style.visibility = 'hidden';
        });
    }


    var tag = document.getElementById('user');
    var all = tag.document.getElementsByClassName('state');
    var i;

    for (i = 0; i < all.length; i++) {
        all[i].innerHTML = x;
    }

}

window.onload = hideCreateButton; */
