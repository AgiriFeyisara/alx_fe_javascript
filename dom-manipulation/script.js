document.addEventListener("DOMContentLoaded", function () {
  let quotes = [
    {
      text: "“Believe you can and you’re halfway there.” – Theodore Roosevelt. ",
      text: "“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson.",
      text: "“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt.",
      text: "“Our greatest glory is not in never falling, but in rising every time we fall.” – Confucius.",
    },
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");

  // Populate category dropdown
  function updateCategoryOptions() {
    const categories = new Set(quotes.map((q) => q.category));
    categoryFilter.innerHTML = '<option value="All">All</option>';
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  // Display a random quote based on selected category
  function showRandomQuote() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes =
      selectedCategory === "All"
        ? quotes
        : quotes.filter((q) => q.category === selectedCategory);

    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes found in this category.";
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = filteredQuotes[randomIndex].text;
  }

  // Add new quote from user input
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();

    if (newText === "" || newCategory === "") {
      alert("Please fill in both the quote and category.");
      return;
    }

    quotes.push({ text: newText, category: newCategory });

    textInput.value = "";
    categoryInput.value = "";

    updateCategoryOptions();
    alert("Quote added successfully!");
  }

  // Event listeners
  newQuoteButton.addEventListener("click", showRandomQuote);
  categoryFilter.addEventListener("change", showRandomQuote);

  // Initial setup
  updateCategoryOptions();
});
