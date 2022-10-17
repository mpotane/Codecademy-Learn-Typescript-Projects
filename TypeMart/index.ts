import products from './products'

const productName : string = products[0].name
let shipping : number
let taxPercent : number
let taxTotal : number
let total : number
let shippingAddress : string

const product = products.filter(({name:pname}) => pname == productName)[0]

const price = Number(product.price)

if (product.preOrder) {
  console.log("Delivery on the way!")
}

if (price > 25) {
  shipping = 0
  console.log("Free shipping")
} else {
  shipping = 5
  console.log(`Shipping fee is ${shipping}`)
}

shippingAddress = 'New York'

if (shippingAddress.match(/new york/i)) {
  taxPercent = 0.1
} else {
  taxPercent = 0.05
}

taxTotal = price * taxPercent

total = price + taxTotal + shipping

console.log(`
Product:  ${product.name}
Address:  ${shippingAddress}
Price:    $${product.price}
Tax:      $${taxTotal.toFixed(2)}
Shipping: $${shipping.toFixed(2)}
Total:    $${total.toFixed(2)}
`);