document.addEventListener("DOMContentLoaded", function () {
  let quotes = [
    {
      text: "“Believe you can and you’re halfway there.” – Theodore Roosevelt. ",
      text: "“Don’t watch the clock; do what it does. Keep going.” – Sam Levenson.",
      text: "“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt.",
      text: "“Our greatest glory is not in never falling, but in rising every time we fall.” – Confucius.",
    },
  ];

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  }

  // Event listener for "Show New Quote" button
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);

  // Function to add quote using the form in HTML
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
      const newQuote = { text, category };
      quotes.push(newQuote);

      document.getElementById(
        "quoteDisplay"
      ).textContent = `"${text}" — ${category}`;
      textInput.value = "";
      categoryInput.value = "";
      alert("Quote added from HTML form!");
    } else {
      alert("Please enter both quote text and category.");
    }
  }

  // BONUS: Function to dynamically create and add a new form
  function createAddQuoteForm() {
    const form = document.createElement("form");

    const quoteInput = document.createElement("input");
    quoteInput.placeholder = "Enter quote";
    quoteInput.required = true;

    const categoryInput = document.createElement("input");
    categoryInput.placeholder = "Enter category";
    categoryInput.required = true;

    const submitButton = document.createElement("button");
    submitButton.textContent = "Add Quote (Dynamic)";
    submitButton.type = "submit";

    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(submitButton);

    document.body.appendChild(form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const newQuote = {
        text: quoteInput.value.trim(),
        category: categoryInput.value.trim(),
      };

      if (newQuote.text && newQuote.category) {
        quotes.push(newQuote);
        alert("Quote added from dynamically created form!");
        document.getElementById(
          "quoteDisplay"
        ).textContent = `"${newQuote.text}" — ${newQuote.category}`;
        form.reset();
      }
    });
  }

  // Call the dynamic form function so the form appears
  createAddQuoteForm();
});
