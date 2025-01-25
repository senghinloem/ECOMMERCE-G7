document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalSpan = document.querySelector('.details span:nth-child(2)');
    const discountSpan = document.querySelector('.details span:nth-child(4)');
    const shippingSpan = document.querySelector('.details span:nth-child(6)');
    const totalPriceLabel = document.querySelector('.checkout--footer .price');
    const checkoutButton = document.querySelector('.checkout-btn');

    const checkoutFormContainer = document.getElementById('checkout-form');
    const cancelCheckoutButton = document.getElementById('cancel-checkout');
    const paymentForm = document.getElementById('payment-form');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Ensure all quantities are positive
    cart = cart.map(item => ({
        ...item,
        quantity: item.quantity > 0 ? item.quantity : 1,
    }));
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart

    const updateCartVisibility = () => {
        const noCartElements = document.getElementsByClassName('no-carts');
        const summaryElements = document.getElementsByClassName('master-container');

        if (cart.length === 0) {
            Array.from(noCartElements).forEach(el => (el.style.display = 'block'));
            Array.from(summaryElements).forEach(el => (el.style.display = 'none'));
        } else {
            Array.from(noCartElements).forEach(el => (el.style.display = 'none'));
            Array.from(summaryElements).forEach(el => (el.style.display = 'block'));
        }
    };

    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 220px; height: 330px; object-fit: cover; margin-right: 20px; border: 1px solid #ddd;" />
                    <div>
                        <h4 style="margin: 0;">${item.name}</h4>
                        <p style="margin: 5px 0;">Price: USD ${item.price}</p>
                        <p style="margin: 5px 0;">Quantity: 
                            <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity" style="width: 42px; outline: none; border: none; font-size:18px;" />
                        </p>
                        <button class="delete" data-index="${index}" style="padding: 5px 10px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer;">Delete</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            subtotal += parseFloat(item.price) * parseInt(item.quantity);
        });

        // Calculate Discount and Shipping based on Subtotal
        const discount = subtotal > 50 ? subtotal * 0.1 : 0;
        const shipping = subtotal > 0 && subtotal < 100 ? 10 : 0;
        const total = subtotal - discount + shipping;

        // Update the display for subtotal, discount, shipping, and total
        subtotalSpan.textContent = `USD ${subtotal.toFixed(2)}`;
        discountSpan.textContent = `USD ${discount.toFixed(2)}`;
        shippingSpan.textContent = `USD ${shipping.toFixed(2)}`;
        totalPriceLabel.innerHTML = `<sup>$</sup>${total.toFixed(2)}`;

        updateCartVisibility();
    };

    const deleteItem = index => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('delete')) {
            const index = event.target.getAttribute('data-index');
            deleteItem(index);
        }
    });

    cartItemsContainer.addEventListener('input', event => {
        if (event.target.classList.contains('quantity')) {
            const index = event.target.getAttribute('data-index');
            const newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        }
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        checkoutFormContainer.style.display = 'block';
    });

    cancelCheckoutButton.addEventListener('click', () => {
        checkoutFormContainer.style.display = 'none';
    });

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Payment successful! Thank you for your purchase.');

        // Generate PDF invoice
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Walkbag", 105, 15, { align: 'center' });
        doc.setFontSize(12);
        doc.text("Invoice", 105, 30, { align: 'center' });
        doc.line(10, 35, 200, 35);

        const date = new Date().toLocaleDateString();
        doc.text(`Date: ${date}`, 20, 40);
        doc.text(`Customer: ${document.getElementById('name').value}`, 20, 50);
        doc.text(`Email: ${document.getElementById('email').value}`, 20, 60);

        let yOffset = 70;
        doc.text('Item', 20, yOffset);
        doc.text('Quantity', 100, yOffset);
        doc.text('Price', 160, yOffset);
        doc.line(10, yOffset + 2, 200, yOffset + 2);
        yOffset += 10;

        cart.forEach(item => {
            doc.text(`${item.name}`, 20, yOffset);
            doc.text(`${item.quantity}`, 100, yOffset);
            doc.text(`USD ${(item.price * item.quantity).toFixed(2)}`, 160, yOffset);
            yOffset += 10;
        });

        const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
        const discount = subtotal > 50 ? subtotal * 0.1 : 0;
        const shipping = subtotal > 0 && subtotal < 100 ? 10 : 0;
        const total = subtotal - discount + shipping;

        doc.text(`Subtotal: USD ${subtotal.toFixed(2)}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Discount: USD ${discount.toFixed(2)}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Shipping: USD ${shipping.toFixed(2)}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Total: USD ${total.toFixed(2)}`, 20, yOffset);

        doc.save('invoice.pdf');

        checkoutFormContainer.style.display = 'none';
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    updateCartDisplay();
});
