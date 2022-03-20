let clickedItem;

const setupListener =
    () => document.querySelectorAll('.buybutton')
                .forEach(button => button.addEventListener('click', askToBuyItem));

window.addEventListener('DOMContentLoaded', setupListener);

/**
 * Todo
 * - récupérer l'item à acheter depuis le bouton cliqué (comment?)
 */
const askToBuyItem =
  async (event) => {
    const clickedButton = event.target;
    const correspondingItemID = clickedButton.getAttribute('data-id');
    const buyerResponse = await fetch('/user/me', { method :'GET' });
    if (buyerResponse.ok) {
      const buyer = await buyerResponse.json();
      const Bmoney = buyer.money;

      const requestedItem = null; //todo, trouver l'objet d'après son ID
      // if (requestedItem.price <= Bmoney) {
      //   // créditer le vendeur -> find l'User dont {login: requestedItem.soldBy} et update son {money: Smoney + requestedItem.price}
        const seller = null; //todo
        const Smoney = seller.money;

      //   // débiter l'acheteur -> update son {money: Bmoney - requestedItem.price}

      //   // supprimer l'objet de la base -> requête post pour delete via id?

      //   // si erreur à une de ces étapes, annuler les précédentes et arrêter les suivantes
      // } else {
      //
      // }
    } else {
       const error = await buyerResponse.json();
       result.textContent = `error : ${error.message}`;
    }
  }

  const update =  async () => {
    console.log("appel d'update dans user.client");
    const userData = { login : userloginInput.value };
    const body = JSON.stringify(userData);
    const requestOptions = {
                           method :'PUT',
                           headers : { "Content-Type": "application/json" },
                           body : body
                         };
    const response = await fetch('/user/me', requestOptions);
    if (response.ok) {
      const updatedUser = await response.json();
      console.log(`user updated : ${JSON.stringify(updatedUser)}`);
    }
    else {
      const error = await response.json();
      handleError(error);
    }
  }