import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This allows us to use req.body directly

const port = process.env.PORT || 3000;

// Data storage (In-memory)
const quotes = [
  {
    quote: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

// Helper function
function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// GET Route: Returns a random quote as a string
app.get("/", (req, res) => {
  const quote = randomQuote();
  res.send(`"${quote.quote}" -${quote.author}`);
});

// POST Route: Adds a new quote with validation
app.post("/", (req, res) => {
  const body = req.body;

  // 1. Check if the keys exist in the request
  if (!body.quote || !body.author) {
    return res.status(400).send("Both 'quote' and 'author' are required fields.");
  }

  // 2. Validation: Trim whitespace and check length
  // This prevents saving quotes that are just empty strings or spaces
  const cleanQuote = body.quote.trim();
  const cleanAuthor = body.author.trim();

  if (cleanQuote.length === 0) {
    return res.status(400).send("The quote text cannot be empty.");
  }

  if (cleanAuthor.length === 0) {
    return res.status(400).send("The author name cannot be empty.");
  }

  // 3. Save the validated and cleaned data
  const newQuote = {
    quote: cleanQuote,
    author: cleanAuthor,
  };

  quotes.push(newQuote);

  console.log("New quote added:", newQuote);
  
  // Send a success status and message
  res.status(201).send("ok");
});

app.listen(port, () => {
  console.log(`Quote server listening on port ${port}`);
});