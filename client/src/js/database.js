import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // This connects to the database and the version we want to use
    const db = await openDB('jate', 1);

    // This creates a transaction and object store
    const tx = db.transaction('jate', 'readwrite');

    // This provides access to the object store
    const store = tx.objectStore('jate');

    // Using the .add() method on the store to pass in the content
    const request = store.add({content});

    // This provides confirmation of the request
    const result = await request;
    console.log('The database has been successfully updated!', result);

    return result;
  } catch (err) {
    console.error('putDb not implemented');
  }
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  try {

    // This connects to the database and the version we want to use
    const db = await openDB('jate', 1);

    // This creates a transaction and object store
    const tx = db.transaction('jate', 'readonly');

    // This provides access to the object store
    const store = tx.objectStore('jate');
    
    // Using the .getAll() method to get all the content from the database
    const request = store.getAll();
    
    // This provides confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result;

  } catch (err) {
  console.error('getDb not implemented');
  }
};

// Start the database
initdb();
