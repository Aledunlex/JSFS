const initializeNavBarButtonsLinks = () => {
    document.querySelectorAll('.nav-p')
            .forEach(menuElem => menuElem.addEventListener('click', initButtonLink));
}
window.addEventListener('DOMContentLoaded', initializeNavBarButtonsLinks);

const initButtonLink = async (event) => {
    const clickedButton = event.target;
    const correspondingMenuButton = clickedButton.getAttribute('id');

    console.log(correspondingMenuButton);
    // const pageContentResponse = await fetch(`/${correspondingMenuButton}`, { method :'GET',
    //                                                                          headers : { "Content-Type": "application/json" } 
    // });
    // if (pageContentResponse.ok) {
    //     console.log("pageContentResponse",pageContentResponse);
    // } else {
    //     console.log("pageContentResponse",pageContentResponse);
    // }
}