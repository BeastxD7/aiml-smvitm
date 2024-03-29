import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
  // Fetch Firebase configuration from server
  const response = await fetch('/auth-config');
  const firebaseConfig = await response.json();

  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Assuming you have a collection called "csharpPrograms" in Firestore
  const csharpProgramsRef = collection(db, "csharpPrograms");

  // Function to fetch and display C# programs
  async function displayCSharpPrograms() {
    const querySnapshot = await getDocs(csharpProgramsRef);
    querySnapshot.forEach((doc) => {
      const programData = doc.data();
      // Iterate over each array of C# code snippets
      programData.cs.forEach((codeSnippet) => {
        console.log(codeSnippet);
        const codeBlock = document.createElement("pre");
        codeBlock.className = "code-block";
        codeBlock.textContent = codeSnippet;
        document.getElementById("csharp-programs").appendChild(codeBlock);
      });
    });
  }

  // Call the function to display C# programs when the page loads
  displayCSharpPrograms();
});