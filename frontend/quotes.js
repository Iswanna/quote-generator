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
  event.preventDefault();

  const quoteValue = document.getElementById("input-quote").value.trim();
  const authorValue = document.getElementById("input-author").value.trim();

  // --- NEW FRONTEND VALIDATION ---
  if (quoteValue === "" || authorValue === "") {
    messageArea.textContent = "Please provide both a quote and an author.";
    messageArea.style.color = "orange";
    return; // STOP HERE: Don't even try to fetch
  }
  // -------------------------------

  messageArea.textContent = "Sending...";
  messageArea.style.color = "black";

  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote: quoteValue, author: authorValue }),
    });

    if (response.ok) {
      messageArea.textContent = "Quote added successfully! ✅";
      messageArea.style.color = "green";
      quoteForm.reset();
      
      setTimeout(() => { messageArea.textContent = ""; }, 5000);
    } else {
      // This will now show the specific error messages from the backend 
      // like "The quote text cannot be empty."
      const errorText = await response.text();
      messageArea.textContent = "Error: " + errorText;
      messageArea.style.color = "red";
    }
  } catch (error) {
    messageArea.textContent = "Could not connect to the server. ❌";
    messageArea.style.color = "red";
  }
});

// show a random quote when page loads (initial load)
displayRandomQuote();
