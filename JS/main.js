// Existing code for Add to Cart functionality
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const name = button.getAttribute('data-name');
          const price = button.getAttribute('data-price');
          const id = button.getAttribute('data-id');
          const image = button.getAttribute('data-image'); // Add image URL

          const cartItem = { name, price, id, image }; // Include image in cart item

          // Retrieve existing cart from localStorage or initialize an empty array
          const cart = JSON.parse(localStorage.getItem('cart')) || [];

          // Add the new item to the cart
          cart.push(cartItem);

          // Save the updated cart back to localStorage
          localStorage.setItem('cart', JSON.stringify(cart));

          alert(`${name} has been added to your cart!`);
      });
  });
});

// Existing code for Favorites functionality
document.addEventListener('DOMContentLoaded', () => {
  // Fetch favorites from localStorage or initialize an empty array
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Function to update the icon class based on the favorite status
  const updateFavoritesIcon = (icon, productName) => {
      const isFavorite = favorites.some(item => item.name === productName);
      if (isFavorite) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid');
      } else {
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
      }
  };

  // Function to handle toggling favorite items
  const toggleFavorite = (event) => {
      const icon = event.target;
      const productName = icon.closest('.card').querySelector('.product-name-trending').textContent;
      const productPrice = icon.closest('.card').querySelector('p').textContent.trim();
      const productImage = icon.closest('.card').querySelector('img').src;

      const existingIndex = favorites.findIndex(item => item.name === productName);

      if (existingIndex === -1) {
          // Add the item to favorites
          favorites.push({ name: productName, price: productPrice, image: productImage });
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid');
      } else {
          // Remove the item from favorites
          favorites.splice(existingIndex, 1);
          icon.classList.remove('fa-solid');
          icon.classList.add('fa-regular');
      }

      // Update the favorites array in localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  // Initialize heart icons for products
  document.querySelectorAll('.fa-heart').forEach(icon => {
      const productName = icon.closest('.card').querySelector('.product-name-trending').textContent;
      updateFavoritesIcon(icon, productName);
      icon.addEventListener('click', toggleFavorite);
  });
});
