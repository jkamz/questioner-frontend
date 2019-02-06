// Methods to consume signup and signin API using Fetch API
import Model from './model.js';



//SignUp

function signUp(event) {

    event.preventDefault()
    var endpoint = "/auth/signup";
    signupObj = new Model(endpoint);

    const fieldData = {
        firstname:document.getElementById('firstname').value,
        lastname:document.getElementById('lastname').value,
        email:document.getElementById('email').value,
        username:document.getElementById('username').value,
        phoneNumber:document.getElementById('phoneNumber').value,
        password:document.getElementById('password').value
    };

    signupObj.postMethod(fieldData)
    .then(function(response){
        console.log(response);
        return response.json()
    })
    .then(function(data){
        console.log(data);
        window.location.href = "../UI/templates/signin.html";
    })
}

//call functions

window.onload = function(){
    document.getElementById(signupBtn).addEventListener('click', signUp);
}
