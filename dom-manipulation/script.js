document.addEventListener("DOMContentLoaded", function () {
  let quotes = [
    {
      text: "“Believe you can and you’re halfway there.” – Theodore Roosevelt. ",
      text: "“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson.",
      text: "“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt.",
      text: "“Our greatest glory is not in never falling, but in rising every time we fall.” – Confucius.",
    },
  ];

  // Show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  }

  // Add event listener to button
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);

  // Add a new quote from form input
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
      const newQuote = { text, category };
      quotes.push(newQuote);

      // Show the newly added quote
      document.getElementById(
        "quoteDisplay"
      ).textContent = `"${text}" — ${category}`;

      // Clear the input fields
      textInput.value = "";
      categoryInput.value = "";

      alert("New quote added!");
    } else {
      alert("Please enter both quote text and category.");
    }
  }
});
