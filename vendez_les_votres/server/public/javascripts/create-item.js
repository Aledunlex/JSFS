const setupListener =
    () => document.getElementById('createbutton').addEventListener('click', askForItemCreation);

window.addEventListener('DOMContentLoaded', setupListener);

const askForItemCreation =
  async () => {
    const userResponse = await fetch('/user/me', { method :'GET' });
    if (userResponse.ok) {
      const user = await userResponse.json();
      // retrieve data about item to create from the input fields
      const newItem = {
                        title : title.value,
                        soldBy : user.login,
                        price : price.value,
                        };
      // body is built from created item
      const bodyContent = JSON.stringify(newItem);
      // options for a POST method that conains json
      const requestOptions = {
                                method :'POST',
                                headers : { "Content-Type": "application/json" },
                                body : bodyContent
                              };
      // send the request to the server to create the entry corresponding to item
      const itemResponse = await fetch('/items/create', requestOptions);
      if (itemResponse.ok) {
        const item = await itemResponse.json();
        result.textContent = `Votre annonce pour "${item.title}" a été créée!`;
      }
      else {
        const error = await itemResponse.json();
        result.textContent = `error : ${error.message}`;
     }
    } else {
       const error = await userResponse.json();
       result.textContent = `error : ${error.message}`;
    }
    clearInputs();
  }

  /** clear all input fields */
  const clearInputs = function() {
    title.value = "";
    price.value = "";
  }
