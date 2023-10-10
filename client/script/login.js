const details = document.querySelectorAll('input')
const form = document.getElementById("form")
const btn = document.querySelector('.submit')
const message = document.querySelector('.message')
let url = "http://127.0.0.1:3000"

btn.addEventListener('click', (e) => {
    e.preventDefault()
    message.innerText = ''

    if (!details[0].value || !details[1].value) {
        message.innerText = 'All fields must be filled'
    }
    else {
        let user = {
            username: details[0].value,
            password: details[1].value
        }

        loginUser(user)
        form.reset()
    }

})
async function loginUser(data) {
    try {
        const response = await fetch(`${url}/accounts/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        console.log(result);

        if (response.status === 200) {
            window.localStorage.setItem('token', result.token)  
            window.localStorage.setItem('username', result.user.username)
            window.location.href = 'homepage.html'
        }

        if (result.error) message.innerText = result.error

    } catch (error) {
       message.innerText = error.error
        console.error(error);
    }
}

