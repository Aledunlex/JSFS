let loginDisplay;

/**
 * J'ai arrêté de l'utiliser car cette façon de récupérer l'utilisateur courant
 * implique de throw une erreur à chaque page chargée sans s'être connecté;
 * et en plus ça implique de faire la requête à la base Users à chaque page...
 * Donc probablement pas très propre comme façon de faire
 */

const loginDisplaySetup = () => {
    loginDisplay = document.getElementById('loginDisplay');
    getUserLogin();
}
window.addEventListener('DOMContentLoaded', loginDisplaySetup);

const getUserLogin = async () => {
    const requestOptions = {
                             method :'GET',
                           };
    const response = await fetch('/user/me', requestOptions);
    let displayString;
    if (response.ok) {
        const user = await response.json();
        displayString = user.login;
    }
    else displayString = "visiteur";
    loginDisplay.textContent = `Bienvenue, ${displayString}`;
}