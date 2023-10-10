var username = document.getElementById('username');
var password = document.getElementById('password');
var email = document.getElementById('email');
var button = document.getElementById('navigatebutton');
var confirmPassword = document.getElementById('confirmPassword');
var message= document.getElementById('message');
const form = document.getElementById("form");
let url = "http://127.0.0.1:3000"

button.addEventListener('click',(e) => {
    e.preventDefault();

    if ( username.value == "" || email.value == "" || password.value == "" || confirmPassword.value ==""){
        message.textContent ='all fields must be filled';
        e.preventDefault()
    }
    else if (password.value !== confirmPassword.value) {
        message.textContent = 'Passwords do not match!';
        e.preventDefault()
    }
    else {
        message.textContent = "";
        let user = {
            username: username.value,
            email: email.value,
            password: password.value
        }
        createAccount(user)
        form.reset()
    }

  
   })

   async function createAccount(data) {
    try {
        const response = await fetch(`${url}/accounts/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.error) message.innerText = result.error

        if (response.status === 200) window.location.href = 'login.html'

        console.log(result);
    } catch (error) {
        message.innerText = error.error
        console.error(error);
    }
}


// function signUp() {

 


    
//     if ((password === confirmPassword) && username||password||email != '') {
//         // alert('Sign up successful! You can now log in with your credentials.');
//         users.push(user);

//         // Clear the form
//         document.getElementById('username').value = '';
//         document.getElementById('password').value = '';
//         document.getElementById('email').value = '';
//         document.getElementById('confirmPassword').value= '';
//             window.location.href="./login.html"
       


//     }
//      else {
//     //   alert('Passwords do not match! and fill in your details')
//       document.getElementById('password').value = '';
//       document.getElementById('confirmPassword').value='';

//     }
// }