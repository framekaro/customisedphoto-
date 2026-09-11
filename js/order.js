const GOOGLE_SHEET_URL =
    "https://script.google.com/macros/s/AKfycbxX1jQkC7qAHacAAgoRydEpe1klRLQkj-fBRIn0cO83gpE6Y00kcc7TSiazGuXrsY_c/exec";

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

    const photoCount =
        selectedPhotos.length;

    const customerName =
        document.getElementById("customer-name").value.trim();

    const customerMobile =
        document.getElementById("customer-mobile").value.trim();

    const customerPincode =
        document.getElementById("customer-pincode").value.trim();

    const customerCity =
        document.getElementById("customer-city").value.trim();

    const customerDistrict =
        document.getElementById("customer-district").value.trim();

    const customerState =
        document.getElementById("customer-state").value.trim();


    orderSummary.innerHTML = `
        <div class="summary-row">
            <strong>Product</strong>
            <span>${selectedProduct.name}</span>
        </div>

        <div class="summary-row">
            <strong>Price</strong>
            <span>₹${selectedProduct.price}</span>
        </div>

        <div class="summary-row">
            <strong>Quantity</strong>
            <span>${quantity}</span>
        </div>

        <div class="summary-row">
            <strong>Photos</strong>
            <span>${photoCount}</span>
        </div>

        ${
            customerName
                ? `
                <div class="summary-row">
                    <strong>Name</strong>
                    <span>${customerName}</span>
                </div>
                `
                : ""
        }

        ${
            customerMobile
                ? `
                <div class="summary-row">
                    <strong>Mobile</strong>
                    <span>${customerMobile}</span>
                </div>
                `
                : ""
        }

        ${
            customerPincode
                ? `
                <div class="summary-row">
                    <strong>PIN Code</strong>
                    <span>${customerPincode}</span>
                </div>
                `
                : ""
        }

        ${
            customerCity
                ? `
                <div class="summary-row">
                    <strong>Post Office</strong>
                    <span>${customerCity}</span>
                </div>
                `
                : ""
        }

        ${
            customerDistrict
                ? `
                <div class="summary-row">
                    <strong>District</strong>
                    <span>${customerDistrict}</span>
                </div>
                `
                : ""
        }

        ${
            customerState
                ? `
                <div class="summary-row">
                    <strong>State</strong>
                    <span>${customerState}</span>
                </div>
                `
                : ""
        }

        <hr>

        <div class="summary-total">
            <strong>Total Amount</strong>
            <strong>₹${total}</strong>
        </div>
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

        const submitButton =
    orderForm.querySelector(".submit-order-btn");

if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerText = "Submitting Order...";
}
        
        fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
        "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({

        customerName: name,

        customerMobile: mobile,

        customerPincode:
            document.getElementById(
                "customer-pincode"
            ).value.trim(),

        customerCity:
            document.getElementById(
                "customer-city"
            ).value.trim(),

        customerDistrict:
            document.getElementById(
                "customer-district"
            ).value.trim(),

        customerState:
            document.getElementById(
                "customer-state"
            ).value.trim(),

        customerAddress: address,

        customerLandmark:
            document.getElementById(
                "customer-landmark"
            ).value.trim(),

        productName:
            selectedProduct.name,

        quantity:
            Number(quantityInput.value) || 1,

        totalAmount:
            selectedProduct.price *
            (Number(quantityInput.value) || 1),

        photoCount:
            selectedPhotos.length
    })
})
.then(function () {

    document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="order-success-overlay">
        <div class="order-success-box">

            <div class="success-icon">✓</div>

            <h2>Order Placed Successfully!</h2>

            <p>
                Thank you for choosing <strong>FrameKaro</strong>.
            </p>

            <p class="success-note">
                आपका order successfully receive हो गया है।
                हमारी team जल्द ही आपसे contact करेगी।
            </p>

            <button
                type="button"
                class="success-close-btn"
                onclick="this.closest('.order-success-overlay').remove()"
            >
                Done
            </button>

        </div>
    </div>
    `
);

})
.catch(function () {
if (submitButton) {
    submitButton.disabled = false;
    submitButton.innerText = "Place Order";
}

alert(
    "Order submit nahi ho paaya. Please try again."
);
    
});

    }
);
