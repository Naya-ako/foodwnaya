const login= document.querySelector('.loginbut');
const profile= document.querySelector('.profile');
const logout=document.querySelector('.logout')

const token= window.localStorage.getItem("token")
const userName=window.localStorage.getItem("name")


if (token){
    login.style.display="none"
}
else{
    profile.style.display="none"
}

logout.addEventListener("click", ()=>{
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("name")

})


