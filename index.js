// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlcKyWAoZdi5FmFKZEFfZ5tSYZKSgnFNQ",
    authDomain: "simple-form-1b3d9.firebaseapp.com",
    projectId: "simple-form-1b3d9",
    storageBucket: "simple-form-1b3d9.appspot.com",
    messagingSenderId: "836430002390",
    appId: "1:836430002390:web:255f42fc31ce2f3fed3177",
    measurementId: "G-V7NCJ94QX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Validation and Upload Function
async function validationForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (firstName === "" || lastName === "") {
        alert("Please enter both first and last names.");
    } else {
        try {
            const docRef = await addDoc(collection(db, "name"), {
                firstName: firstName,
                lastName: lastName
            });
            console.log("Document written with ID: ", docRef.id);
            alert("Names uploaded to the database!");

            // Clear the input fields after successful upload
            document.getElementById('firstName').value = "";
            document.getElementById('lastName').value = "";

        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error uploading names. See console for details.");
        }
    }
}

// View Details Function
async function viewDetails() {
    const querySnapshot = await getDocs(collection(db, "name"));

    let output = "<h3>Stored Details:</h3><ul>";

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        output += `<li>${data.firstName} ${data.lastName}</li>`;
    });

    output += "</ul>";

    // Create or Update a div to display the data
    let displayDiv = document.getElementById('displayData');
    if (!displayDiv) {
        displayDiv = document.createElement('div');
        displayDiv.id = 'displayData';
        document.getElementById('form').appendChild(displayDiv);
    }

    displayDiv.innerHTML = output;
}

// Make the functions global for HTML button onclick
window.validationForm = validationForm;
window.viewDetails = viewDetails;
