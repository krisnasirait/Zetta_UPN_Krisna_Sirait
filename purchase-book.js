function purchaseBook(bookDetails, discountPercentage, taxPercentage, term, stockAmount, purchasedAmount) {
    const TAX_RATE = 0.05; // 5%
    const IDR_CURRENCY = "IDR";

    let originalPrice = bookDetails.price;
    let discountAmount = originalPrice * discountPercentage * 0.01;
    let priceAfterDiscount = originalPrice - discountAmount;
    let taxAmount = priceAfterDiscount * taxPercentage * TAX_RATE;
    let priceAfterTax = priceAfterDiscount + taxAmount;

    let creditDue = priceAfterTax / term;

    let output = "";
    output += `<table>`;
    output += `<tr><th>Item</th><th>Amount</th></tr>`;
    output += `<tr><td>Book details</td><td>${bookDetails.title} by ${bookDetails.author} (${bookDetails.year})</td></tr>`;
    output += `<tr><td>Original price</td><td>${originalPrice.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;
    output += `<tr><td>Discount amount (${discountPercentage}%)</td><td>${discountAmount.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;
    output += `<tr><td>Price after discount</td><td>${priceAfterDiscount.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;
    output += `<tr><td>Tax amount (${taxPercentage}%)</td><td>${taxAmount.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;
    output += `<tr><td>Price after tax</td><td>${priceAfterTax.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;
    output += `<tr><td>Credit due every month</td><td>${creditDue.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;

    let totalPrice = 0;
    let remainingStock = stockAmount;

    for (let i = 0; i < purchasedAmount; i++) {
        if (remainingStock <= 0) {
            alert("Purchase cannot be completed, stock is not enough");
            break;
        }
        totalPrice += priceAfterTax;
        remainingStock--;
    }

    if (remainingStock > 0) {
        alert(`Purchase completed, ${remainingStock} books left in stock.`);
    } else {
        alert("Purchase completed, no more books left in stock.");
    }

    let prices = Array.from({ length: term }, (_, index) => {
        const termIndex = index + 1;
        const price = creditDue + (creditDue * taxPercentage * TAX_RATE);
        output += `<tr><td>Price for term ${termIndex}</td><td>${price.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;
        return price;
    });

    output += `</table>`;
    console.log(output);
    return {
        totalPrice: totalPrice,
        remainingStock: remainingStock,
        prices: prices
    };
}

function handleForm() {
    event.preventDefault()
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const price = document.getElementById("price").value;
    const discount = document.getElementById("discount").value;
    const term = document.getElementById("term").value;
    const stock = document.getElementById("stock").value;
    const purchased = document.getElementById("purchased").value;
  
    if (!title || !author || !year || !price || !discount || !term || !stock || !purchased) {
      alert("Please fill in all fields.");
      return;
    }
  
    const bookDetails = {
      title: title,
      author: author,
      year: parseInt(year),
      price: parseFloat(price)
    };
  
    const discountPercentage = parseFloat(discount);
    const termInt = parseInt(term);
    const stockInt = parseInt(stock);
    const purchasedInt = parseInt(purchased);
  
    const { remainingStock, prices } = purchaseBook(bookDetails, discountPercentage, 0.05, termInt, stockInt, purchasedInt);
  
    if (remainingStock < 0) {
      alert("Purchase cannot be completed, stock is not enough");
      return;
    }
  
    let output = document.getElementById("output");
    output.innerHTML = "";
  
    let table = document.createElement("table");
    table.classList.add("table");
  
    let headerRow = document.createElement("tr");
    let bookTitleHeader = document.createElement("th");
    bookTitleHeader.innerText = "Book Title";
    let authorHeader = document.createElement("th");
    authorHeader.innerText = "Author";
    let yearHeader = document.createElement("th");
    yearHeader.innerText = "Year";
    let termHeader = document.createElement("th");
    termHeader.innerText = "Term";
    let priceHeader = document.createElement("th");
    priceHeader.innerText = "Price";
    headerRow.appendChild(bookTitleHeader);
    headerRow.appendChild(authorHeader);
    headerRow.appendChild(yearHeader);
    headerRow.appendChild(termHeader);
    headerRow.appendChild(priceHeader);
    table.appendChild(headerRow);
  
    prices.forEach((price, index) => {
      const termIndex = index + 1;
      let row = document.createElement("tr");
      let bookTitleCell = document.createElement("td");
      bookTitleCell.innerText = bookDetails.title;
      let authorCell = document.createElement("td");
      authorCell.innerText = bookDetails.author;
      let yearCell = document.createElement("td");
      yearCell.innerText = bookDetails.year;
      let termCell = document.createElement("td");
      termCell.innerText = `Term ${termIndex}`;
      let priceCell = document.createElement("td");
      priceCell.innerText = price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
      row.appendChild(bookTitleCell);
      row.appendChild(authorCell);
      row.appendChild(yearCell);
      row.appendChild(termCell);
      row.appendChild(priceCell);
      table.appendChild(row);
    });
  
    output.appendChild(table);
    let remainingStockOutput = document.createElement("p");
    remainingStockOutput.innerText = `Remaining stock: ${remainingStock}`;
    output.appendChild(remainingStockOutput);
  }
  
  const form = document.getElementById("purchase-form");
  form.addEventListener("submit", handleForm);