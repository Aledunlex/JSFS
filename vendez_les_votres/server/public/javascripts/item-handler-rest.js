const DELAY_BEFORE_REFRESHING = 2000;

const setupListeners =
  () => {
    fillTable();
    createButton.addEventListener('click', createItem );
  }

window.addEventListener('DOMContentLoaded', setupListeners);

// returns currently connected user's id
const getUser = async () => {
    const userResponse = await fetch('/user/me', { method :'GET' });
    if (userResponse.ok) {
        const user = await userResponse.json();
        return user;
    }
}

// fetch GET all items
const fillTable = async () => {
  const itemsTable = document.getElementById('itemslist');
  itemsTable.textContent = '';
  const requestOptions = {
                           method :'GET'
                         };
  const allItemsResponse = await fetch('/itemsrest/', requestOptions);
  if (allItemsResponse.ok) {
    let allitems = await allItemsResponse.json();
    if (allitems.length == 0) {
        itemsTable.appendChild(buildTD("Aucun objet actuellement en vente", 'delete'));
    }
    else {
        const user = await getUser();
        if (user) {
            allitems.filter(item => item.soldBy != user._id)
                    .forEach(item => {
                        const itemElement = buildItemElement(item, user);
                        itemsTable.appendChild(itemElement);
                    });
            // redundant, but forces display of owned items at the bottom of the list
            allitems.filter(item => item.soldBy == user._id)
                    .forEach(item => {
                        const itemElement = buildItemElement(item, null);
                        itemsTable.appendChild(itemElement);
                    });
        } else {
            console.log(`error : no user connected`);
        }
    }
  } else {
    const error = await allItemsResponse.json();
    console.log(`error : ${error.message}`);
  }
}

// fetch PUT to update one item with given item id
const buyItem = async (itemId) => {
      const requestOptions = {
                               method :'PUT',
                               headers : { "Content-Type": "application/json" }
                              };
      const response = await fetch(`/itemsrest/${itemId}`, requestOptions);
      const updatedInfo = await response.json();
      moveItemLineUp(itemId);
      JSONanswer.textContent = JSON.stringify(updatedInfo);
      window.setTimeout( updateTable, DELAY_BEFORE_REFRESHING);
    }

// fetch DELETE to delete one item with given item id
const deleteItem = async (itemId, button) => {
      const requestOptions = {
                               method :'DELETE'
                             };
      const response = await fetch(`/itemsrest/${itemId}`, requestOptions);
      const received = await response.json();
      JSONanswer.textContent = JSON.stringify(received);
      button.parentNode.replaceChild( createTmpSpan() , button);
      window.setTimeout( updateTable, DELAY_BEFORE_REFRESHING);
    }

// fetch POST to create one item
const createItem = async () => {
      const newItemData = { title : 'New Title', soldBy : '', price : 2018, image : ''  };
      const body = JSON.stringify(newItemData);
      let requestOptions = {
                             method :'POST',
                             headers : { "Content-Type": "application/json" },
                             body : body
                           };
      const response = await fetch(`/itemsrest/`, requestOptions);
      const createdItem = await response.json();
      JSONanswer.textContent = JSON.stringify(createdItem);
      window.setTimeout( updateTable, DELAY_BEFORE_REFRESHING);
    }



const updateTable = () => {
  JSONanswer.textContent = '';
  fillTable();
}

// utility functions
const createTmpSpan = () => {
  const span = document.createElement('span');
  span.className = 'deleted';
  span.textContent = 'deleted';
  return span;
}

const buildItemElement =  (item, user) => {
  const itemElement = document.createElement('tr');
  itemElement.className = 'item';
  itemElement.setAttribute('data-id' , item._id);

  createImage(item, itemElement);

  itemElement.appendChild(buildTD(item.title, 'title'));
  itemElement.appendChild(buildTD(`${item.price}€`, 'price'));

  if(!user) {
    const deleteButton = buildButton('Supprimer', 'delete');
    deleteButton.addEventListener('click', () => deleteItem(item._id, deleteButton));
    itemElement.appendChild(buildTDForHTMLElement(deleteButton, 'button'));
  }
  else {
    if(user.money >= item.price) {
        const updateButton = buildButton("Acheter", 'buybutton');
        updateButton.addEventListener('click', () => buyItem(item._id));
        itemElement.appendChild(buildTDForHTMLElement(updateButton, 'button'));
    }
  }

  return itemElement;
}

const buildTD = (content, className) => {
  const TDelement = document.createElement('td');
  TDelement.textContent = content;
  TDelement.className = className;
  return TDelement;
}

const buildTDForHTMLElement = (content, className) => {
    const TDelement = document.createElement('td');
    TDelement.className = className;
    TDelement.appendChild(content);
    return TDelement;
  }

const buildButton = (label, className) => {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = label;
  return button;
}

const moveItemLineUp = (itemID) => {
    const table = document.getElementById("itemslist");
    const cells = Array.from(table.getElementsByTagName("tr"));
    console.log(cells, itemID);
    const itemLine = cells.find(line => line.getAttribute('data-id') === itemID);
    const innerCells = itemLine.children;
    itemLine.remove();
    lastBought.innerHTML = `Dernier achat : ${innerCells[1].textContent} à ${innerCells[2].textContent}.`;
    if (cells.length == 1) table.remove();
}

const createImage = (item, itemElement) => {
    itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemElement.appendChild(buildTDForHTMLElement(itemImage, 'image'));
}

