// Load initial quotes from localStorage or use defaults
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

// Display a random quote based on selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory); // save filter

  const filtered =
    selectedCategory === "All"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerHTML = `"${randomQuote.text}"<br><span class="quote-category">— ${randomQuote.category}</span>`;

  // Save last viewed quote
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Populate the dropdown with unique categories
function populateCategories() {
  const uniqueCategories = Array.from(new Set(quotes.map((q) => q.category)));
  categoryFilter.innerHTML = '<option value="All">All Categories</option>';
  uniqueCategories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedCategory = localStorage.getItem("selectedCategory");
  if (
    savedCategory &&
    [...categoryFilter.options].some((opt) => opt.value === savedCategory)
  ) {
    categoryFilter.value = savedCategory;
  }
}

// Add a new quote
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

// Restore last viewed quote
function restoreLastQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    quoteDisplay.innerHTML = `"${quote.text}"<br><span class="quote-category">— ${quote.category}</span>`;
  }
}

// Simulate server fetching quotes
function fetchServerQuotes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { text: "Persistence guarantees results.", category: "Motivational" },
        { text: "Stay hungry, stay foolish.", category: "Inspirational" },
      ]);
    }, 1500);
  });
}

// Notify user of sync updates
function showNotification(message) {
  const note = document.createElement("div");
  note.textContent = message;
  note.style.position = "fixed";
  note.style.bottom = "20px";
  note.style.right = "20px";
  note.style.backgroundColor = "#333";
  note.style.color = "#fff";
  note.style.padding = "10px 15px";
  note.style.borderRadius = "5px";
  note.style.zIndex = "1000";

  document.body.appendChild(note);
  setTimeout(() => note.remove(), 5000);
}

// Sync quotes from server and resolve conflicts (server wins)
function syncWithServer() {
  fetchServerQuotes().then((serverQuotes) => {
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

    const newQuotes = serverQuotes.filter(
      (serverQuote) =>
        !localQuotes.some(
          (localQuote) =>
            localQuote.text === serverQuote.text &&
            localQuote.category === serverQuote.category
        )
    );

    if (newQuotes.length > 0) {
      const mergedQuotes = [...localQuotes, ...newQuotes];
      quotes = mergedQuotes;
      saveQuotes();
      populateCategories();
      showNotification(`${newQuotes.length} new quote(s) synced from server.`);
    }
  });
}

// Event Listeners
newQuoteButton.addEventListener("click", filterQuotes);
categoryFilter.addEventListener("change", filterQuotes);

// Initial Setup
populateCategories();
restoreLastQuote();
syncWithServer(); // initial sync
setInterval(syncWithServer, 60000); // periodic sync every 60s
