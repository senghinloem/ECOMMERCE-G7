class ShoppingCart {
    constructor() {
      this.cart = [];
    }
  
    addProduct(product) {
      this.cart.push(product);
      console.log(`${product.name} added to cart!`);
    }
  
    removeProduct(productName) {
      this.cart = this.cart.filter(product => product.name !== productName);
      console.log(`${productName} removed from cart!`);
    }
  
    showCart() {
      console.log("Your cart:", this.cart);
    }
  }
  
  // Example usage:
  const cart = new ShoppingCart();
  cart.addProduct({ name: "Laptop", price: 1200 });
  cart.addProduct({ name: "Mouse", price: 25 });
  cart.showCart();
  cart.removeProduct("Mouse");
  cart.showCart();
  