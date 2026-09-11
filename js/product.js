/* ========================================
   FRAMEKARO - PRODUCT DETAIL
======================================== */

const urlParams = new URLSearchParams(window.location.search);

const productId = urlParams.get("id");

const product =
    products.find(function(item) {
        return item.id === productId;
    });


const container =
    document.getElementById("product-detail-container");


if (product) {

    container.innerHTML = `

        <div class="product-detail-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-detail-image"
            >

            <div class="product-detail-info">

                <h1>
                    ${product.name}
                </h1>

                <p>
                    ${product.description}
                </p>

                <div class="product-detail-price">
                    ₹${product.price}
                </div>

                <a
                    href="order.html?id=${product.id}"
                    class="product-order-btn"
                >
                    Order Now
                </a>

            </div>

        </div>

    `;

} else {

    container.innerHTML = `

        <div class="product-not-found">

            <h1>
                Product Not Found
            </h1>

            <p>
                Sorry, this product is not available.
            </p>

            <a
                href="products.html"
                class="product-order-btn"
            >
                Back to Products
            </a>

        </div>

    `;

}
