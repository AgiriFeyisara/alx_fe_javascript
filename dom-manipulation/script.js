// Load quotes from local storage or use default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivational",
  },
  {
    text: "Imagination is more important than knowledge.",
    category: "Inspirational",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate unique categories into the dropdown
function populateCategories() {
  const uniqueCategories = Array.from(new Set(quotes.map((q) => q.category)));
  categoryFilter.innerHTML = '<option value="All">All Categories</option>';

  uniqueCategories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore previously selected category from localStorage
  const savedCategory = localStorage.getItem("selectedCategory");
  if (
    savedCategory &&
    [...categoryFilter.options].some((opt) => opt.value === savedCategory)
  ) {
    categoryFilter.value = savedCategory;
  }
}

// Show a quote based on current filter
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory); // remember user's choice

  const filteredQuotes =
    selectedCategory === "All"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }

  const randomQuote =
    filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  quoteDisplay.innerHTML = `"${randomQuote.text}"<br><span class="quote-category">— ${randomQuote.category}</span>`;

  // Save last shown quote to sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Add new quote and update dropdown
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();

  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}

// Restore last viewed quote from session
function restoreLastQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
    quoteDisplay.innerHTML = `"${lastQuote.text}"<br><span class="quote-category">— ${lastQuote.category}</span>`;
  }
}

// Set up event listeners
newQuoteButton.addEventListener("click", filterQuotes);
categoryFilter.addEventListener("change", filterQuotes);

// Initial setup
populateCategories();
restoreLastQuote();
