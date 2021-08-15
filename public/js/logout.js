const btnLogout = document.getElementById('btn-logout');

btnLogout.onclick = function(){
    if (confirm("Do you want to logout?")) {
    localStorage.removeItem("isLoggedIn");
    document.location.replace('/logout');
    }
    else{

    }
}
