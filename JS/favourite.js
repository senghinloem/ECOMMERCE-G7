document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.querySelector('.favourites');

    // Retrieve favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // If there are no favorite items, show a message
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="no-favourites">
                <h5>You have no items in your Favourite.</h5>
            </div>
            <a href="products.html" class="shop-link">Click here for shopping.</a>
        `;
    } else {
        // Render favorite items in a column layout
        favoritesContainer.innerHTML = `
            <div class="favorite-items-container">
                ${favorites
                    .map(item => `
                        <div class="favorite-item">
                            <img src="${item.image}" alt="${item.name}" class="favorite-image">
                            <div class="favorite-details">
                                <h4 class="product-name">${item.name}</h4>
                                <p class="product-price">${item.price}</p>
                                <div class="buttons">
                                    <button class="remove-favorite">Remove</button>
                                    <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}" data-id="${item.id}" data-image="${item.image}">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `)
                    .join('')}
            </div>
        `;

        // Add functionality to remove items from favorites
        document.querySelectorAll('.remove-favorite').forEach((button, index) => {
            button.addEventListener('click', () => {
                removeFavorite(index);
            });
        });

        // Add functionality to move items to the cart
        document.querySelectorAll('.add-to-cart').forEach((button, index) => {
            button.addEventListener('click', () => {
                addToCart(index);
            });
        });
    }

    // Function to remove an item from favorites
    const removeFavorite = (index) => {
        favorites.splice(index, 1); // Remove the item by index
        localStorage.setItem('favorites', JSON.stringify(favorites));
        location.reload(); // Refresh the page to update the UI
    };

    // Function to add an item to the cart
    const addToCart = (index) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = favorites[index];
        
        // Parse the price to remove any currency symbols or extra characters and convert it to a float
        let price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); 
    
        // If parsing fails (price is NaN), set it to a default value (e.g., 0)
        if (isNaN(price)) {
            price = 0; // or handle it accordingly
            alert("Invalid price detected for " + item.name);
        }
    
        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
        if (existingItemIndex !== -1) {
            // If item exists, increase quantity
            cart[existingItemIndex].quantity += 1;
            alert(`${item.name} quantity has been increased by 1!`);
        } else {
            // Otherwise, add item with quantity 1
            item.quantity = 1;
            item.price = price; // Store the parsed price
            cart.push(item);
            alert(`${item.name} has been added to your cart!`);
        }
    
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    

    // Function to update totals in yourcart.js
    const updateCartTotals = () => {
        if (typeof window.updateCartDisplay === 'function') {
            window.updateCartDisplay();
        }
    };
});