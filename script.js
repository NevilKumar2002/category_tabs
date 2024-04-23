// Function to fetch product data from API based on category
function fetchProducts(category) {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const categoryData = data.categories.find(cat => cat.category_name === category);
            populateProducts(categoryData.category_products);
        })
        .catch(error => console.error('Error fetching product data:', error));
}

// Function to populate product cards with fetched data
function populateProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear previous product cards

    products.forEach(product => {
        // Parse price and compare_at_price to numbers
        const price = parseFloat(product.price);
        const compareAtPrice = parseFloat(product.compare_at_price);

        // Calculate discount percentage
        const discountPercentage = ((compareAtPrice - price) / compareAtPrice) * 100;

        // Determine if badge should be displayed
        const showBadge = product.badge_text && product.badge_text.trim() !== '';

        // Create product card HTML
       
        const productCard = `
        <div class="product-card">
        <div class="image-container">
          <img src="${product.image}" alt="Product Image">
          ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
        </div>
       <div class="product-first-container">
    
       <h3>${product.title}</h3>
       
       <ul class="vendor-info" >
       <li>${product.vendor}</li>
       </ul>
       </div>
        <div class="product-second-container">
        <p class="price">Rs ${price.toFixed(2)}</p>
        <p class="compared-price">${compareAtPrice.toFixed(2)}</p>
        <p class="discount"> ${discountPercentage.toFixed(2)}% Off</p>
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
      
        `;

        // Append product card to container
        productContainer.insertAdjacentHTML('beforeend', productCard);
    });
}

// Function to show products based on category and update active tab
function showProducts(category, button) {
    fetchProducts(category);
    setActiveTab(button);
}

// Function to set the active tab button
function setActiveTab(button) {
    // Remove active class from all tab buttons
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add active class to the clicked tab button
    button.classList.add('active');
}

// Update event listeners for tab buttons to pass the clicked button to showProducts function
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            showProducts(tab.textContent.trim(), tab); // Pass the category and the clicked button
        });
    });
});

// Initial load: show products for 'Men' category
document.addEventListener('DOMContentLoaded', function() {
    showProducts('Men', document.querySelector('.tab')); // Pass the 'Men' category and the first tab button
});
