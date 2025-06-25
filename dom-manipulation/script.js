const quotes = [
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

// Update dropdown based on quote categories
function updateCategoryFilterOptions() {
  const categories = Array.from(new Set(quotes.map((q) => q.category)));
  categoryFilter.innerHTML = '<option value="All">All</option>';
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Display a random quote
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes =
    selectedCategory === "All"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
    return;
  }

  const randomQuote =
    filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  quoteDisplay.innerHTML = `
    "${randomQuote.text}"<br>
    <span class="quote-category">— ${randomQuote.category}</span>
  `;
}

// Add new quote from HTML input
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

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  // Update dropdown
  updateCategoryFilterOptions();

  alert("Quote added successfully!");
}

// ✅ Required: Function that dynamically creates a form (even if unused)
function createAddQuoteForm() {
  const form = document.createElement("form");

  const textInput = document.createElement("input");
  textInput.placeholder = "Enter a new quote";
  textInput.required = true;

  const categoryInput = document.createElement("input");
  categoryInput.placeholder = "Enter quote category";
  categoryInput.required = true;

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Quote (Dynamic Form)";

  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(submitBtn);

  document.body.appendChild(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const quoteText = textInput.value.trim();
    const quoteCategory = categoryInput.value.trim();

    if (!quoteText || !quoteCategory) {
      alert("Please fill in both fields.");
      return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });
    updateCategoryFilterOptions();
    quoteDisplay.innerHTML = `"${quoteText}"<br><span class="quote-category">— ${quoteCategory}</span>`;
    form.reset();
    alert("Quote added via dynamic form!");
  });
}

// Event listeners
newQuoteButton.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", showRandomQuote);

// Initial setup
updateCategoryFilterOptions();
createAddQuoteForm(); // Ensure this is defined as required
