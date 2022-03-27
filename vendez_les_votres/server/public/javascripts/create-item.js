const setupListener =
    () => document.getElementById('createbutton').addEventListener('click', askForItemCreation);

window.addEventListener('DOMContentLoaded', setupListener);

const askForItemCreation =
  async () => {
    if (price.value >= 0) {
      const userResponse = await fetch('/user/me', { method :'GET' });
      if (userResponse.ok) {
        const user = await userResponse.json();
        const newItem = {
                          title : title.value,
                          soldBy : user._id,
                          price : price.value,
                          image : image.value
                          };
        
        const bodyContent = JSON.stringify(newItem);
        const requestOptions = {
                                  method :'POST',
                                  headers : { "Content-Type": "application/json" },
                                  body : bodyContent
                                };
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
    else {
      result.textContent = `Le prix ne peut pas être une valeur négative...`;
    }
  }

  /** clear all input fields */
  const clearInputs = () => {
    title.value = "";
    price.value = "";
    image.value = "";
  }
