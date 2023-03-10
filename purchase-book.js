function purchaseBook(bookDetails, discountPercentage, taxPercentage, term) {

  const TAX_RATE = 0.01; // 1%
  const IDR_CURRENCY = "id-ID";

  let originalPrice = bookDetails.price;
  let discountAmount = originalPrice * discountPercentage * 0.01;
  let priceAfterDiscount = originalPrice - discountAmount;
  let taxAmount = priceAfterDiscount * taxPercentage * TAX_RATE;
  let priceAfterTax = priceAfterDiscount + taxAmount;

  let creditDue = priceAfterTax / term;
  let pricePerTerm = creditDue + (creditDue * taxPercentage * TAX_RATE);

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

  let prices = Array.from({ length: term }, (_, index) => {
      const termIndex = index + 1;
      const price = creditDue + (creditDue * taxPercentage * TAX_RATE);
      output += `<tr><td>Price for term ${termIndex}</td><td>${price.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}</td></tr>`;
      return price;
  });

  output += `</table>`;
  console.log(output);
  return prices;
}