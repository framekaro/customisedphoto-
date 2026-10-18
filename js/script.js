/* =====================================================
   FRAMEKARO - MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. GET HTML ELEMENTS
   ===================================================== */

const productsGrid =
  document.getElementById("productsGrid");

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");

const orderModal =
  document.getElementById("orderModal");

const modalOverlay =
  document.getElementById("modalOverlay");

const closeModal =
  document.getElementById("closeModal");

const orderForm =
  document.getElementById("orderForm");

const selectedProduct =
  document.getElementById("selectedProduct");

const selectedProductText =
  document.getElementById("selectedProductText");

const photoInput =
  document.getElementById("photo");

const photoPreview =
  document.getElementById("photoPreview");

const customerName =
  document.getElementById("customerName");

const customerPhone =
  document.getElementById("customerPhone");

const customerAddress =
  document.getElementById("customerAddress");

const quantityInput =
  document.getElementById("quantity");

const minusBtn =
  document.getElementById("minusBtn");

const plusBtn =
  document.getElementById("plusBtn");

const orderTotal =
  document.getElementById("orderTotal");

const whatsappContact =
  document.getElementById("whatsappContact");

const callContact =
  document.getElementById("callContact");

const currentYear =
  document.getElementById("currentYear");


/* =====================================================
   2. CURRENT ORDER
   ===================================================== */

let currentProduct = null;


/* =====================================================
   3. CREATE PRODUCT CARDS
   ===================================================== */

function renderProducts() {

  if (!productsGrid) {
    return;
  }

  productsGrid.innerHTML = "";

  PRODUCTS.forEach(function(product) {

    const card =
      document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.style.display='none';"
        >

        <span class="product-badge">
          ${product.badge}
        </span>

      </div>


      <div class="product-content">

        <h3>
          ${product.name}
        </h3>

        <p class="product-size">
          ${product.size}
        </p>

        <div class="product-bottom">

          <div class="product-price">

            ${STORE.currency}${product.price}

            <small>
              ${STORE.deliveryMessage}
            </small>

          </div>


          <button
            type="button"
            class="order-btn"
            data-product-id="${product.id}"
          >
            Order करें
          </button>

        </div>

      </div>

    `;

    productsGrid.appendChild(card);

  });


  /*
   * सभी Order buttons पर click event
   */

  const orderButtons =
    document.querySelectorAll(".order-btn");


  orderButtons.forEach(function(button) {

    button.addEventListener("click", function() {

      const productId =
        button.getAttribute("data-product-id");

      openOrderModal(productId);

    });

  });

}


/* =====================================================
   4. FIND PRODUCT
   ===================================================== */

function findProduct(productId) {

  return PRODUCTS.find(function(product) {

    return product.id === productId;

  });

}


/* =====================================================
   5. OPEN ORDER MODAL
   ===================================================== */

function openOrderModal(productId) {

  const product =
    findProduct(productId);


  if (!product) {
    return;
  }


  currentProduct = product;


  selectedProduct.value =
    product.id;


  selectedProductText.textContent =
    `${product.name} • ${product.size} • ${STORE.currency}${product.price}`;


  quantityInput.value = 1;


  updateTotal();


  photoInput.value = "";


  photoPreview.innerHTML = `
    <span>
      Photo Preview
    </span>
  `;


  orderModal.classList.add("active");

  orderModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================================
   6. CLOSE ORDER MODAL
   ===================================================== */

function closeOrderModal() {

  orderModal.classList.remove("active");

  orderModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =====================================================
   7. MODAL EVENTS
   ===================================================== */

if (closeModal) {

  closeModal.addEventListener(
    "click",
    closeOrderModal
  );

}


if (modalOverlay) {

  modalOverlay.addEventListener(
    "click",
    closeOrderModal
  );

}


/*
 * ESC key से modal close
 */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape" &&
      orderModal.classList.contains("active")
    ) {

      closeOrderModal();

    }

  }
);


/* =====================================================
   8. PHOTO PREVIEW
   ===================================================== */

if (photoInput) {

  photoInput.addEventListener(
    "change",
    function() {

      const file =
        photoInput.files[0];


      if (!file) {

        photoPreview.innerHTML = `
          <span>
            Photo Preview
          </span>
        `;

        return;

      }


      /*
       * केवल image files allow
       */

      if (!file.type.startsWith("image/")) {

        alert(
          "कृपया केवल image file चुनें।"
        );

        photoInput.value = "";

        return;

      }


      const reader =
        new FileReader();


      reader.onload =
        function(event) {

          photoPreview.innerHTML = `

            <img
              src="${event.target.result}"
              alt="Selected Photo"
            >

          `;

        };


      reader.readAsDataURL(file);

    }
  );

}


/* =====================================================
   9. QUANTITY
   ===================================================== */

if (minusBtn) {

  minusBtn.addEventListener(
    "click",
    function() {

      let quantity =
        parseInt(quantityInput.value) || 1;


      if (quantity > 1) {

        quantity--;

        quantityInput.value =
          quantity;

        updateTotal();

      }

    }
  );

}


if (plusBtn) {

  plusBtn.addEventListener(
    "click",
    function() {

      let quantity =
        parseInt(quantityInput.value) || 1;


      if (quantity < STORE.maxQuantity) {

        quantity++;

        quantityInput.value =
          quantity;

        updateTotal();

      }

    }
  );

}


/* =====================================================
   10. UPDATE TOTAL
   ===================================================== */

function updateTotal() {

  if (!currentProduct) {
    return;
  }


  const quantity =
    parseInt(quantityInput.value) || 1;


  const total =
    currentProduct.price * quantity;


  orderTotal.textContent =
    `${STORE.currency}${total}`;

}


/* =====================================================
   11. MOBILE MENU
   ===================================================== */

if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    function() {

      mobileMenu.classList.toggle(
        "active"
      );


      /*
       * Menu icon बदलना
       */

      if (
        mobileMenu.classList.contains("active")
      ) {

        menuBtn.textContent = "×";

      } else {

        menuBtn.textContent = "☰";

      }

    }
  );

}


/*
 * Mobile menu link click होने पर
 * menu automatically close
 */

if (mobileMenu) {

  const mobileLinks =
    mobileMenu.querySelectorAll("a");


  mobileLinks.forEach(function(link) {

    link.addEventListener(
      "click",
      function() {

        mobileMenu.classList.remove(
          "active"
        );

        menuBtn.textContent = "☰";

      }
    );

  });

}


/* =====================================================
   12. CONTACT LINKS
   ===================================================== */

if (whatsappContact) {

  whatsappContact.href =
    `https://wa.me/${STORE.whatsapp}`;

}


if (callContact) {

  callContact.href =
    `tel:+${STORE.phone}`;

}


/* =====================================================
   13. WHATSAPP ORDER
   ===================================================== */

if (orderForm) {

  orderForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      /*
       * Product check
       */

      if (!currentProduct) {

        alert(
          "कृपया पहले कोई Frame चुनें।"
        );

        return;

      }


      /*
       * Photo check
       */

      const photo =
        photoInput.files[0];


      if (!photo) {

        alert(
          "कृपया अपनी Photo upload करें।"
        );

        photoInput.focus();

        return;

      }


      /*
       * Customer details
       */

      const name =
        customerName.value.trim();


      const phone =
        customerPhone.value.trim();


      const address =
        customerAddress.value.trim();


      /*
       * Name validation
       */

      if (name.length < 2) {

        alert(
          "कृपया अपना सही नाम डालें।"
        );

        customerName.focus();

        return;

      }


      /*
       * Mobile validation
       */

      const phonePattern =
        /^[6-9][0-9]{9}$/;


      if (!phonePattern.test(phone)) {

        alert(
          "कृपया 10 digit का सही mobile number डालें।"
        );

        customerPhone.focus();

        return;

      }


      /*
       * Address validation
       */

      if (address.length < 10) {

        alert(
          "कृपया पूरा delivery address डालें।"
        );

        customerAddress.focus();

        return;

      }


      /*
       * Quantity
       */

      const quantity =
        parseInt(quantityInput.value) || 1;


      /*
       * Total
       */

      const total =
        currentProduct.price * quantity;


      /*
       * WhatsApp message
       */

      let message =

`🖼️ *${STORE.name} - New Order*

━━━━━━━━━━━━━━━━━━

📦 *Product Details*

Product: ${currentProduct.name}
Size: ${currentProduct.size}
Product ID: ${currentProduct.id}
Quantity: ${quantity}

Price: ${STORE.currency}${currentProduct.price}
Total: ${STORE.currency}${total}

━━━━━━━━━━━━━━━━━━

👤 *Customer Details*

Name: ${name}
Mobile: ${phone}

📍 Address:
${address}

━━━━━━━━━━━━━━━━━━

📸 Photo:
Customer ने photo upload की है।

🚚 ${STORE.deliveryMessage}

Please confirm my order.

Thank you!
*${STORE.name}*`;


      /*
       * WhatsApp URL
       */

      const whatsappURL =

        `https://wa.me/${STORE.whatsapp}?text=` +
        encodeURIComponent(message);


      /*
       * WhatsApp open
       */

      window.open(
        whatsappURL,
        "_blank"
      );


      /*
       * Modal close
       */

      closeOrderModal();

    }
  );

}


/* =====================================================
   14. CURRENT YEAR
   ===================================================== */

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =====================================================
   15. INITIALIZE WEBSITE
   ===================================================== */

renderProducts();
