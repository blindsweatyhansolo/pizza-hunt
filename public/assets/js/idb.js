// INDEXEDDB - IndexedDB is a global variable

// create variable to hold db connetion
let db;

// establish a connection to IndexedDB database called 'pizza-hunt' set to version 1
// acts an event listener for the database
// created when we open the connection using indexDB.open()
// takes 2 params: name of indexedDB database to create or connect to,
// and the version, used to determine changes in database's structure between connections (like
// changing columns of a SQL db)
const request = indexedDB.open('pizza_hunt', 1);

// this event will emit if the database version(v) changes (nonexistant to v1, v1 to v2, etc)
request.onupgradeneeded = function(event) {
  // save reference to the database
  const db = event.target.result;
  
  // create an object store (table), set to have auto incrementing primary key
  db.createObjectStore('new_pizza', { autoIncrement: true });
};

// upon success
request.onsuccess = function(event) {
  // when db is successfully create with its object store, or simply established a connection,
  // save reference to db in a global variable
  db = event.target.result;

  // check if app is online, if yes run uploadPizza to send all local db data to api
  // navigator.onLine returns boolean indicating whether browser is working online
  if (navigator.onLine) {
    uploadPizza();
  }
};

// upon fail/error
request.onerror = function(event) {
  // log error 
  console.log(event.target.errorCode);
};

// executes after attempt to submit new pizza without internet connection
// because a direct connection doesn't always exist with indexedDB, opening a transaction
// allows for a temporary connection to the database; helps maintain an accurate reading
// of the data indexedDB stores. if the fetch()'s catch() is executed (network failure)
// then saveRecord will be used in add-pizza.js
function saveRecord(record) {
  // open new transaction with the database with read/write permissions
  const transaction = db.transaction(['new_pizza'], 'readwrite');

  // access the object store for 'new-pizza'
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  // add record to store with add()
  pizzaObjectStore.add(record);
};

// collect all data from new_pizza object store and POST to the server on reconnect
function uploadPizza() {
  // open transaction to db
  const transaction = db.transaction(['new_pizza'], 'readwrite');

  // access our object store
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  // get and set all records to variable with getAll (async method, needs event handler)
  const getAll = pizzaObjectStore.getAll();

  // upon success of getAll()
  getAll.onsuccess = function() {
    // if there was data in indexedDb's store, send to the api server
    if (getAll.result.length > 0) {
      fetch('/api/pizzas', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(serverResponse => {
        if (serverResponse.message) {
          throw new Error(serverResponse);
        }
        // open transaction
        const transaction = db.transaction(['new_pizza'], 'readwrite');

        // access new_pizza object store
        const pizzaObjectStore = transaction.objectStore('new_pizza');

        // clear all items in your store
        pizzaObjectStore.clear();

        alert('All saved pizza has been submitted!');
      })
      .catch(err => {
        console.log(err);
      });
    };
  };

};

// listen for app coming back online
window.addEventListener('online', uploadPizza);