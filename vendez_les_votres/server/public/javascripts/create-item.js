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
      result.textContent = `item ${item.title} created with id ${item._id} `;
    } else {
       const error = await response.json();
       result.textContent = `error : ${error.message}`;
    }
    clearInputs();

  /* // promise.then version (remove async keyword at the beginning of function)
    fetch('/items/create', requestOptions)
    .then (  response => response.json().then( json => ( { ok : response.ok, json : json} ) ) )
    .then ( response => {
        if (response.ok)
          { return response.json; }
        else { throw new Error(` creation failed  : ${response.json.message}` ); }
      })
    .then( item => result.textContent = `item with id ${item._id} created` )    // fetch request returns a success with created item => message is displaid in #result
    .catch( error => result.textContent = `error : ${error.message}` )        // fetch request returns an error : creation failed => error message displai in #result
    .then( () => clearInputs() );
  */
  }


  // utility function
  /** clear all input fields */
  const clearInputs = function() {
    title.value = "";
    price.value = "";
  }
