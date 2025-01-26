// Function to add an item to the cart
function addToCart(productName, productImage, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
        name: productName,
        image: productImage,
        price: productPrice.replace('USD ', '').trim()
    };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' has been added to your cart!');
}

// Function to add an item to favorites
function addToFavorites(productName, productImage, productPrice) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteProduct = {
        name: productName,
        image: productImage,
        price: productPrice.replace('USD ', '').trim()
    };
    favorites.push(favoriteProduct);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(productName + ' has been added to your favorites!');
}

// Function to toggle heart color
function toggleHeartColor(heart) {
    heart.classList.toggle('favorited');  // Makes the heart red when clicked
}

// Add event listeners to buttons (e.g., Add to Cart)
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h2').innerText;
        const productImage = this.parentElement.parentElement.querySelector('img').src;
        const productPrice = this.parentElement.querySelector('p').innerText;
        addToCart(productName, productImage, productPrice);
    });
});

// Add event listeners to heart icons (to toggle red color and add to favorites)
document.querySelectorAll('.fa-heart').forEach((heart) => {
    heart.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h2').innerText;
        const productImage = this.parentElement.parentElement.querySelector('img').src;
        const productPrice = this.parentElement.querySelector('p').innerText;
        
        // Check if this product is already in favorites
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.some(item => item.name === productName);

        if (!isAlreadyFavorite) {
            // Add to favorites
            addToFavorites(productName, productImage, productPrice);  
            // Toggle the heart color
            toggleHeartColor(this);
        } else {
            // Remove from favorites
            favorites = favorites.filter(item => item.name !== productName);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            // Reset heart color to unfilled
            this.classList.remove('favorited');
        }
    });
});