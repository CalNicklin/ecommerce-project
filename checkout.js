const data = [{ "price": 5, "qty": 4 }, { "price": 5, "qty": 4 }, { "price": 5, "qty": 4 },
{ "price": 5, "qty": 4 }, { "price": 5, "qty": 4 }, { "price": 5, "qty": 4 },
{ "price": 5, "qty": 4 }, { "price": 5, "qty": 4 }, { "price": 5, "qty": 4 }, { "price": 5, "qty": 4 }];


const totalPrice = data.map(item => item.price * item.qty);
const orderTotal = totalPrice.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
);

console.log(totalPrice);
console.log(orderTotal);
