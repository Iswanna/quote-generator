const API_URL = "https://iswanna-quotes-backend.hosting.codeyourfuture.io";

// Function to display a random quote on the page
async function displayRandomQuote() {
  try {
    // Step 1a: Fetch quote from backend
    const response = await fetch(`${API_URL}/`);
    const quote = await response.text();

    // Step 1b: Parse the quote string (format: "quote text" -author)
    const parts = quote.split(" -");
    const quoteText = parts[0].trim();
    const author = parts[1] ? parts[1].trim() : "Unknown";

    // Step 1c: Update the page with fetched quote
    document.getElementById("quote").textContent = quoteText;
    document.getElementById("author").textContent = author;
  } catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quote").textContent = "Error loading quote";
  }
}

// Add a click event listener to the "New quote" button
document.getElementById("new-quote").addEventListener("click", () => {
  displayRandomQuote();
});

const quoteForm = document.getElementById("quote-form");
const messageArea = document.getElementById("message-area");

quoteForm.addEventListener("submit", async (event) => {
  // stop the browser from refreshing the page
  event.preventDefault();

  // update and format the content of the message area
  messageArea.textContent = "Sending...";
  messageArea.style.color = "black";

  // Get the content of the quote and author input area
  const quoteValue = document.getElementById("input-quote").value;
  const authorValue = document.getElementById("input-author").value;

  // format the quote and author data as a JavaScript object
  const newQuoteData = {
    quote: quoteValue,
    author: authorValue,
  };

  try {
    // Make the POST request to the backend
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell backend we are sending JSON
      },
      body: JSON.stringify(newQuoteData), // Convert JS object to JSON string
    });

    // Check if the backend accepted the quote
    if (response.ok) {
      // Success!
      messageArea.textContent = "Quote added successfully! ✅";
      messageArea.style.color = "green";

      // Clear the form boxes so the user can add another one
      quoteForm.reset();
    } else {
      // Backend returned an error (like 400 Bad Request)
      const errorText = await response.text();
      messageArea.textContent = "Error: " + errorText;
      messageArea.style.color = "red";
    }
  } catch (error) {
    // There was a network error (backend is down)
    console.error("Post Error:", error);
    messageArea.textContent = "Could not connect to the server. ❌";
    messageArea.style.color = "red";
  }
});

// show a random quote when page loads (initial load)
displayRandomQuote();
