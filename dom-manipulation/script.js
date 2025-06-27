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

// Populate the category dropdown dynamically
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

// Display a quote based on selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory); // save selected category

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

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote)); // Save last shown quote
}

// Restore last viewed quote from sessionStorage
function restoreLastQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    quoteDisplay.innerHTML = `"${quote.text}"<br><span class="quote-category">— ${quote.category}</span>`;
  }
}

// Add a new quote and update storage & dropdown
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

// ✅ REQUIRED: Fetch quotes from a real mock API using async/await
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Convert post titles into quote objects
    const serverQuotes = data.slice(0, 5).map((post) => ({
      text: post.title,
      category: "General",
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Failed to fetch server quotes:", error);
    return [];
  }
}

// Show a temporary notification on screen
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

// Sync quotes with server and merge new ones
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
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
    quotes = [...localQuotes, ...newQuotes];
    saveQuotes();
    populateCategories();
    showNotification(`${newQuotes.length} new quote(s) synced from server.`);
  }
}

// Event listeners
newQuoteButton.addEventListener("click", filterQuotes);
categoryFilter.addEventListener("change", filterQuotes);

// Initial setup
populateCategories();
restoreLastQuote();
syncWithServer(); // Initial sync
setInterval(syncWithServer, 60000); // Sync every 60 seconds
