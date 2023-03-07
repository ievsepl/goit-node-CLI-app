var colors = require('colors');
const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    const contactsList = JSON.parse(contacts);
    // const contactsList = contacts.toString();

    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(contact => {
      return contact.id === contactId;
    });

    return contactById || `There are no contact with id ${contactId}`;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactQuery = await contacts.find(contact => {
      return contact.id === contactId;
    });

    if (!contactQuery) {
      return `Can't remove,because there are no contact with id ${contactId}`
        .red;
      //   return removeContact;
    }
    const removeContactList = await contacts.filter(contact => {
      return contact.id !== contactId;
    });

    fs.writeFile(contactsPath, JSON.stringify(removeContactList), 'utf8');
    console.log(`=================================================`.green);
    console.log(`Contact with id ${contactId} removed successful`.green);
    console.log(`=================================================`.green);

    return removeContactList;
    // }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const getRndInteger = () => {
    return Math.floor(Math.random() * (100 - 11)) + 11;
  };
  try {
    const contacts = await listContacts();
    const addContact = {
      id: getRndInteger().toString(),
      name,
      email,
      phone,
    };
    contacts.push(addContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
