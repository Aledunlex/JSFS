const initializeNavBarButtonsLinks = () => {
    document.querySelectorAll('.nav-p')
            .forEach(menuElem => menuElem.addEventListener('click', initButtonLink));
}
window.addEventListener('DOMContentLoaded', initializeNavBarButtonsLinks);

const initButtonLink = async (event) => {
    const clickedButton = event.target;
    const correspondingMenuButton = clickedButton.getAttribute('id');

    console.log(correspondingMenuButton);
    
}