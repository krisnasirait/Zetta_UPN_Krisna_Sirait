function purchaseBook(bookDetails, discountPercentage, taxPercentage) {

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

    return priceAfterTax;
}