/* ========================================
   FRAMEKARO - PRODUCT DATA
======================================== */

const products = [
    {
        id: "frame-001",
        name: "Classic Photo Frame",
        price: 499,
        image: "images/products/classic-frame.jpg",
        description: "A beautiful classic frame for your favorite memories."
    },
{
        id: "frame-001",
        name: "Classic Photo Frame",
        price: 499,
        image: "images/products/classic-frame.jpg",
        description: "A beautiful classic frame for your favorite memories."
    },
   
    {
        id: "frame-002",
        name: "Premium Photo Frame",
        price: 699,
        image: "images/products/premium-frame.jpg",
        description: "Premium quality frame with an elegant finish."
    },

    {
        id: "frame-003",
        name: "Family Photo Frame",
        price: 899,
        image: "images/products/family-frame.jpg",
        description: "Perfect frame for family memories and special moments."
    }
];


/* ========================================
   DISPLAY PRODUCTS
======================================== */

const productsContainer =
    document.getElementById("products-container");


if (productsContainer) {

    products.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
            >

            <div class="product-info">

                <h2>${product.name}</h2>

                <p>${product.description}</p>

                <div class="product-price">
                    ₹${product.price}
                </div>

                <a
                    href="product.html?id=${product.id}"
                    class="product-btn"
                >
                    View Details
                </a>

            </div>
        `;

        productsContainer.appendChild(productCard);

    });

}
