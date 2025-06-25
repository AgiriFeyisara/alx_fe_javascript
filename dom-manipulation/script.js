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

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Update category filter dropdown
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

// Show a random quote
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
  quoteDisplay.innerHTML = `"${randomQuote.text}"<br><span class="quote-category">— ${randomQuote.category}</span>`;

  // Save last viewed quote to sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Add quote from static form
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
  updateCategoryFilterOptions();

  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}

// Create a dynamic add-quote form (required in some assignments)
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
    saveQuotes();
    updateCategoryFilterOptions();
    quoteDisplay.innerHTML = `"${quoteText}"<br><span class="quote-category">— ${quoteCategory}</span>`;
    form.reset();
    alert("Quote added via dynamic form!");
  });
}

// Export quotes as JSON file
document.getElementById("exportBtn")?.addEventListener("click", function () {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
});

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (!Array.isArray(importedQuotes)) {
        alert("Invalid file format. JSON must be an array.");
        return;
      }

      const isValid = importedQuotes.every(
        (q) => typeof q.text === "string" && typeof q.category === "string"
      );

      if (!isValid) {
        alert(
          "Invalid quote data. Each quote must have 'text' and 'category'."
        );
        return;
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      updateCategoryFilterOptions();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Failed to read or parse the JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

document
  .getElementById("importFile")
  ?.addEventListener("change", importFromJsonFile);

// Event listeners
newQuoteButton.addEventListener("click", showRandomQuote);
categoryFilter.addEventListener("change", showRandomQuote);

// Display last viewed quote (sessionStorage)
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  quoteDisplay.innerHTML = `"${lastQuote.text}"<br><span class="quote-category">— ${lastQuote.category}</span>`;
}

// Initialize app
updateCategoryFilterOptions();
createAddQuoteForm(); // optional, required in some tasks
