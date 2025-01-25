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
                                    <button class="add-to-cart">Add to Cart</button>
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

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex !== -1) {
            // If item exists, increase quantity
            cart[existingItemIndex].quantity += 1;
            alert(`${item.name} quantity has been increased by 1!`);
        } else {
            // Otherwise, add item with quantity 1
            item.quantity = 1;
            cart.push(item);
            alert(`${item.name} has been added to your cart!`);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Optionally refresh the cart display (e.g., if you're showing the cart on another page)
        updateCartDisplay();
    };

    // Optional: Function to update the cart display (for visual feedback)
    const updateCartDisplay = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsContainer = document.getElementById('cart-items');
        
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 220px; height: 330px; object-fit: cover; margin-right: 20px; border: 1px solid #ddd;" />
                    <div>
                        <h4 style="margin: 0;">${item.name}</h4>
                        <p style="margin: 5px 0;">Price: USD ${item.price}</p>
                        <p style="margin: 5px 0;">Quantity: ${item.quantity}</p>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    };

});
