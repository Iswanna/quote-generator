const API_URL = "http://127.0.0.1:3000";

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

// ...existing code...
// Add a click event listener to the "New quote" button
document.getElementById("new-quote").addEventListener("click", () => {
  displayRandomQuote();
});

// show a random quote when page loads
displayRandomQuote();