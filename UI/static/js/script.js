function hideCreateButton(argument) {
    var user = document.getElementById('user').innerHTML;
    var status = document.getElementById('meet-button')

    if (user !== 'Admin') {
        status.style.display = 'none'
    }
}

window.onload = hideCreateButton;
