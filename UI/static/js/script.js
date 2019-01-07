function hideCreateButton(argument) {
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

function logInAdmin(argument) {
    var checkBox = document.getElementById('adminCheck');
    var input = 'Admin';
    var input2 = 'John Doe';

    if (checkBox.checked == true) {

        localStorage.setItem("userName", input);

    } else {

        localStorage.setItem("userName", input2);
    }
}



window.onload = hideCreateButton;
