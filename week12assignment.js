// API endpoint
const apiUrl = "http://localhost:3000/contact";

// Fetches contact from the API and displays them, Send GET request to API to retrieve contact data,  JSON response
async function fetchContact() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  // Pass the fetched data to the displayContacts function and console log the data
  displayContacts(data);
  console.log("data: ", data);
  // Function to display the list of contacts in the HTML
  function displayContacts(contacts) {
    // Get the element where contact information will be displayed.
    const contactInfo = document.getElementById("contact-info");
    // Clear any previously displayed contact information to avoid duplication.
    contactInfo.innerHTML = "";
    // Iterate over each contact in the array.
    contacts.forEach((contact) => {
      // Create a string of HTML to represent the contact details for each contact and action buttons.

      contactInfo.innerHTML += `
            <div>
                <p>id: ${contact.id}</p>
                <p>name:${contact.name}</p>
                <p>Email: ${contact.email}</p>
                <p>Phone: ${contact.phoneNumber}</p>
                <button onclick="deleteContact(${contact.id})">Delete</button>
                
            </div>
        `;
    });
  }
}
fetchContact();

// Create a new contact  with data from the form
async function createContact() {
  // Retrieve the input values for the new contact from the form
  const id = document.getElementById("contact-id").value;
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const phoneNumber = document.getElementById("contact-phoneNumber").value;
  // Create an object representing the new contact and Convert the contact object to a JSON string
  let newCreatedContact = { id, name, email, phoneNumber };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCreatedContact),
  });

  // Refresh contact list
  fetchContact();
}

// Delete a contact
async function deleteContact(id) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
  // Refresh contact list
  fetchContact();
}
