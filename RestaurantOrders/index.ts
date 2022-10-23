import { restaurants, Restaurant } from "./restaurants";
import { orders, Order, PriceBracket } from "./orders";

/// Add your getMaxPrice() function below:
function getMaxPrice(price: PriceBracket) : number {
  switch(price) {
    case PriceBracket.Low:
      return 10.0;
    case PriceBracket.Medium:
      return 20.0;
    case PriceBracket.High:
      return 30.0;
  }
}

/// Add your getOrders() function below:
function getOrders(price : PriceBracket, orders : Order[][]) : Order[][] {
  const filteredOrders : Order[][] = []
  orders.forEach(value => {
    const tmp : Order[]= []
    value.filter(elem => {
      if(elem.price <= getMaxPrice(price)){
        tmp.push(elem)
      }
    })
    if(tmp.length > 0) {
      filteredOrders.push(tmp)
    }
  })

  return filteredOrders
}


/// Add your printOrders() function below:
function printOrders(restaurants: Restaurant[], filteredOrders: Order[][]) {
  filteredOrders.forEach((order, index) => {
    if(order.length > 0) {
      console.log(`${restaurants[index].name}`)
      order.forEach(item => {
        console.log(`- ${item.name}: ${item.price}`)
      });
    }
  });
}

/// Main
const elligibleOrders = getOrders(PriceBracket.Low, orders);
printOrders(restaurants, elligibleOrders);