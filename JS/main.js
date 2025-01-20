document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-total");

    // Handle Add to Cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", event => {
            const productElement = event.target.closest(".product");
            const id = productElement.dataset.id;
            const name = productElement.dataset.name;
            const price = parseFloat(productElement.dataset.price);

            // Check if the item is already in the cart
            const existingItem = cartItems.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    // Update Cart Display
    function updateCart() {
        // Clear cart items container
        cartItemsContainer.innerHTML = "";

        // Rebuild cart
        let total = 0;
        cartItems.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(listItem);

            total += item.price * item.quantity;
        });

        // Update total
        cartTotalElement.textContent = total.toFixed(2);
    }
});
