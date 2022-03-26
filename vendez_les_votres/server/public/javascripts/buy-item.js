let clickedItem;
let loginDisplay;

const initDisplayAndSetupBuyButtonsListeners = () => {
      loginDisplay = document.getElementById('loginDisplay');
      updateUserDisplay();
      document.querySelectorAll('.buybutton')
              .forEach(button => button.addEventListener('click', askToBuyItem));
}
window.addEventListener('DOMContentLoaded', initDisplayAndSetupBuyButtonsListeners);

const updateUserDisplay = async () => {
  console.log("update display appelé");
  const requestOptions = {
                            method :'GET',
                          };
  const response = await fetch('/user/me', requestOptions);
  let displayString;
  if (response.ok) {
      const user = await response.json();
      displayString = `<strong>${user.login}</strong>.\nVous avez <strong>${user.money}€</strong>`;
      loginDisplay.innerHTML = `Bienvenue, ${displayString}.`;
  }
}

const askToBuyItem = async (event) => {
    const clickedButton = event.target;
    const correspondingItemID = clickedButton.getAttribute('data-id');
    const buyResponse = await fetch(`/items/buy/${correspondingItemID}`, { method :'GET' });
    if (buyResponse.ok) {
      const itemLine = moveItemLineUp(correspondingItemID);
      lastBought.innerHTML = "Dernier achat :\n"+itemLine.firstElementChild.innerText;
      //lastBought.appendChild(itemLine.removeChild());
      updateUserDisplay();
    } else {
      const error = await buyResponse.json();
      lastBought.textContent = `error : ${error.message}`;
    }
}

const moveItemLineUp = (itemID) => {
    console.log("getItem appelé");
    const table = document.getElementById("booklist");
    const cells = Array.from(table.getElementsByTagName("tr"));
    const itemLine = cells.find(line => line.getAttribute('data-id') === itemID);
    console.log(itemLine);
    itemLine.remove();
    return itemLine;
}

