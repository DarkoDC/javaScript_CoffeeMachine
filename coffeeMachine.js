const input = require('sync-input')

function Coffee(water, milk, coffeeBeans, money) {
  this.water = water;
  this.milk = milk;
  this.coffeeBeans = coffeeBeans;
  this.money = money;
}

function CoffeeMachine(water, milk, coffeeBeans, disposableCups, money) {
  this.water = water;
  this.milk = milk;
  this.coffeeBeans = coffeeBeans;
  this.disposableCups = disposableCups;
  this.money = money;

  this.sell = coffee => {
    let shortage = this.checkShortage(coffee);
    if (shortage.length > 0) {
      shortage.forEach(elem => console.log(`Sorry, not enough ${elem}!`))    
      return
    }
    this.water -= coffee.water;
    this.milk -= coffee.milk;
    this.coffeeBeans -= coffee.coffeeBeans;
    this.disposableCups--;
    this.money += coffee.money;
    console.log("I have enough resources, making you a coffee!");
  }
  
  this.checkShortage = coffee => {
    let shortage = [];
    if (this.water < coffee.water) {
      shortage.push("water");
    }
    if (this.milk < coffee.milk) {
      shortage.push("milk");
    }
    if (this.coffeeBeans < coffee.coffeeBeans) {
      shortage.push("coffeeBeans");
    }
    if (this.disposableCups < coffee.disposableCups) {
      shortage.push("disposableCups");
    }
    return shortage;
  }
  
  this.fill = () => {
    this.water += Number(input("Write how many ml of water you want to add: "));
    this.milk += Number(input("Write how many ml of milk  you want to add: "));
    this.coffeeBeans += Number(input("Write how many grams of coffee beans you want to add: "));
    this.disposableCups += Number(input("Write how many disposable cups you want to add: "));
  }

  this.takeMoney = () => {
    console.log("I gave you $" + this.money);
    this.money = 0;
  }

  this.printStatus = () => {
    console.log(`The coffee machine has:
    ${this.water} ml of water
    ${this.milk} ml of milk
    ${this.coffeeBeans} g of coffee beans
    ${this.disposableCups} disposable cups
    $${this.money} of money`);
  }  
}

let coffeMachine = new CoffeeMachine(400, 540, 120, 9, 550);

let espresso = new Coffee(250, 0, 16, 4);
let latte = new Coffee(350, 75, 20, 7);
let cappuccino = new Coffee(200, 100, 12, 6);
let coffees = [espresso, latte, cappuccino];
    
let exit = false;
while (!exit) {
  let action = input("Write action (buy, fill, take, remaining, exit):"); 
  switch (action) {
    case "buy": 
      let choice = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:" ); 
      if (choice == "back") {
         break; 
      }
      coffeMachine.sell(coffees[choice - 1]);
      break;
    case "fill":
      coffeMachine.fill();
      break;
    case "take":
      coffeMachine.takeMoney();
      break;
    case "remaining":
      coffeMachine.printStatus();
      break;
    case "exit":
      exit = true;
      break;
  }
}

