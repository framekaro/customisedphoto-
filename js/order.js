/* ========================================
   FRAMEKARO - ORDER SYSTEM
======================================== */


/* ========================================
   GET PRODUCT FROM URL
======================================== */

const orderParams =
    new URLSearchParams(window.location.search);

const orderProductId =
    orderParams.get("id");


const selectedProduct =
    products.find(function(product) {

        return product.id === orderProductId;

    });



/* ========================================
   ELEMENTS
======================================== */

const selectedProductBox =
    document.getElementById("selected-product");

const orderSummary =
    document.getElementById("order-summary-content");

const quantityInput =
    document.getElementById("quantity");

const photoUpload =
    document.getElementById("photo-upload");

const photoPreview =
    document.getElementById("photo-preview");



/* ========================================
   SHOW SELECTED PRODUCT
======================================== */

if (selectedProduct) {

    selectedProductBox.innerHTML = `

        <strong>
            ${selectedProduct.name}
        </strong>

        <br>

        Price:
        ₹${selectedProduct.price}

    `;

} else {

    selectedProductBox.innerHTML = `

        <p>
            No product selected.
        </p>

        <a href="products.html">
            Choose a Product
        </a>

    `;

}



/* ========================================
   MULTIPLE IMAGE SYSTEM
======================================== */

let selectedPhotos = [];



photoUpload.addEventListener(
    "change",
    function(event) {

        const files =
            Array.from(event.target.files);


        files.forEach(function(file) {

            if (!file.type.startsWith("image/")) {
                return;
            }


            selectedPhotos.push(file);

        });


        photoUpload.value = "";

        showPhotoPreview();

    }
);



/* ========================================
   SHOW PHOTO PREVIEW
======================================== */

function showPhotoPreview() {

    photoPreview.innerHTML = "";


    selectedPhotos.forEach(
        function(file, index) {

            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    const wrapper =
                        document.createElement("div");


                    wrapper.style.position =
                        "relative";


                    wrapper.innerHTML = `

                        <img
                            src="${event.target.result}"
                            alt="Selected Photo"
                        >

                        <button
                            type="button"
                            class="remove-photo-btn"
                            data-index="${index}"
                        >
                            ×
                        </button>

                    `;


                    photoPreview.appendChild(
                        wrapper
                    );


                    const removeButton =
                        wrapper.querySelector(
                            ".remove-photo-btn"
                        );


                    removeButton.addEventListener(
                        "click",
                        function() {

                            const removeIndex =
                                Number(
                                    this.dataset.index
                                );


                            selectedPhotos.splice(
                                removeIndex,
                                1
                            );


                            showPhotoPreview();

                        }
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}



/* ========================================
   PRICE CALCULATION
======================================== */

function updateOrderSummary() {

    if (!selectedProduct) {
        return;
    }


    const quantity =
        Number(quantityInput.value) || 1;


    const total =
        selectedProduct.price * quantity;


    orderSummary.innerHTML = `

        <p>
            <strong>Frame:</strong>
            ${selectedProduct.name}
        </p>

        <p>
            <strong>Price:</strong>
            ₹${selectedProduct.price}
        </p>

        <p>
            <strong>Quantity:</strong>
            ${quantity}
        </p>

        <hr>

        <p>
            <strong>Total:</strong>
            ₹${total}
        </p>

    `;

}



quantityInput.addEventListener(
    "input",
    updateOrderSummary
);


updateOrderSummary();



/* ========================================
   ORDER FORM
======================================== */

const orderForm =
    document.getElementById("order-form");


orderForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customer-name"
            ).value.trim();


        const mobile =
            document.getElementById(
                "customer-mobile"
            ).value.trim();


        const address =
            document.getElementById(
                "customer-address"
            ).value.trim();


        if (!selectedProduct) {

            alert(
                "Please select a product first."
            );

            return;

        }


        if (selectedPhotos.length === 0) {

            alert(
                "Please upload at least one photo."
            );

            return;

        }


        alert(
            "Order form is ready. Final order submission will be added in the next step."
        );

    }
);
