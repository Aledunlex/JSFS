const setupListener =
    () => document.getElementById('buybutton').addEventListener('click', askToBuyItem);

window.addEventListener('DOMContentLoaded', setupListener);

/**
 * Todo
 * - récupérer l'item à acheter depuis le bouton cliqué (comment?)
 */
const askToBuyItem =
  async () => {
    const buyerResponse = await fetch('/user/me', { method :'GET' });
    if (buyerResponse.ok) {
      const buyer = await buyerResponse.json();
      const money = buyer.money;
      // retrieve data about item to create from the input fields
      const requestedItem = null; //todo, trouver l'id de l'objet? ou nom+prix+vendeur?
      const itemResponse = null; //todo
      if (itemResponse.price <= buyer.money) {
        // crédier le vendeur
        // débiter l'acheteur
        // supprimer l'objet de la base
        // si erreur à une de ces étapes, annuler les précédentes et arrêter les suivantes
      } else {
        
      }
    } else {
       const error = await buyerResponse.json();
       result.textContent = `error : ${error.message}`;
    }
  }
