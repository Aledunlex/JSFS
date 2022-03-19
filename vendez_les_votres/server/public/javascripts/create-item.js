const setupListener =
    () => document.getElementById('createbutton').addEventListener('click', askForItemCreation);

window.addEventListener('DOMContentLoaded', setupListener);

const askForItemCreation =
  async () => {
    // retrieve data about item to create from the input fields
    const newItem = {
                      title : title.value,
                      soldBy : 'Tout doux soune',
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
    const response = await fetch('/items/create', requestOptions);
    if (response.ok) {
      const item = await response.json();
      result.textContent = `Votre annonce pour "${item.title}" a été créée!`;
    } else {
       const error = await response.json();
       result.textContent = `error : ${error.message}`;
    }
    clearInputs();
  }

  /** clear all input fields */
  const clearInputs = function() {
    title.value = "";
    price.value = "";
  }
