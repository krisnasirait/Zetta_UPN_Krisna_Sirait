function purchaseBook(bookDetails, discountPercentage, taxPercentage, stock, purchased) {

  const TAX_RATE = 0.01; // 1%
  const IDR_CURRENCY = "id-ID";

  let originalPrice = bookDetails.price;
  let discountAmount = originalPrice * discountPercentage * 0.01;
  let priceAfterDiscount = originalPrice - discountAmount;
  let taxAmount = priceAfterDiscount * taxPercentage * TAX_RATE;
  let priceAfterTax = priceAfterDiscount + taxAmount;

  console.log(`Book details: ${bookDetails.title} by ${bookDetails.author} (${bookDetails.year})`);
  console.log(`Original price: ${originalPrice.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}`);
  console.log(`Discount amount (${discountPercentage}%): ${discountAmount.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}`);
  console.log(`Price after discount: ${priceAfterDiscount.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}`);
  console.log(`Tax amount (${taxPercentage}%): ${taxAmount.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}`);
  console.log(`Price after tax: ${priceAfterTax.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}`);

  let totalPrice = priceAfterTax * purchased;

  if (purchased > stock) {
      console.log(`Sorry, we only have ${stock} books in stock.`);
      return;
  }

  console.log(`Total price: ${totalPrice.toLocaleString(IDR_CURRENCY, { style: "currency", currency: "IDR" })}`);

  let remainingStock = stock - purchased;

  if (remainingStock > 0) {
      console.log(`There are ${remainingStock} books left in stock.`);
  } else {
      console.log("Sorry, the book is out of stock.");
  }

  return totalPrice;
}