/* =====================================================
   FRAMEKARO - COMPLETE WEBSITE JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. HTML ELEMENTS
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
   CART ELEMENTS
   ===================================================== */

const cartBtn =
  document.getElementById("cartBtn");

const cartCount =
  document.getElementById("cartCount");

const cartModal =
  document.getElementById("cartModal");

const cartOverlay =
  document.getElementById("cartOverlay");

const cartClose =
  document.getElementById("cartClose");

const cartItems =
  document.getElementById("cartItems");

const cartEmpty =
  document.getElementById("cartEmpty");

const cartTotal =
  document.getElementById("cartTotal");

const cartOrderBtn =
  document.getElementById("cartOrderBtn");


/* =====================================================
   2. VARIABLES
   ===================================================== */

let currentProduct = null;


/*
 * Cart browser में temporarily save रहेगा.
 * Page refresh करने पर भी cart बना रहेगा.
 */

let cart = [];


/* =====================================================
   3. LOAD CART
   ===================================================== */

try {

  const savedCart =
    localStorage.getItem("framekaroCart");

  if (savedCart) {

    cart =
      JSON.parse(savedCart);

  }

} catch (error) {

  cart = [];

}


/* =====================================================
   4. SAVE CART
   ===================================================== */

function saveCart() {

  try {

    localStorage.setItem(
      "framekaroCart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.log(
      "Cart save नहीं हो पाया।"
    );

  }

}


/* =====================================================
   5. FIND PRODUCT
   ===================================================== */

function findProduct(productId) {

  return PRODUCTS.find(function(product) {

    return product.id === productId;

  });

}


/* =====================================================
   6. RENDER PRODUCTS
   ===================================================== */
function renderProducts() {

  if (!productsGrid) {
    return;
  }

  productsGrid.innerHTML = "";

  PRODUCTS.forEach(function(product) {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `

      <div class="product-image">

  <div class="frame-showcase">

    <div class="frame-outer">

      <div class="frame-inner">

        <div class="frame-photo">

          <span>
            YOUR PHOTO
          </span>

        </div>

      </div>

    </div>

  </div>


  <img
    src="${product.image}"
    alt="${product.name}"
    class="real-product-image"
    loading="lazy"
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
            Add to Cart
          </button>

        </div>

      </div>

    `;

    productsGrid.appendChild(card);

  });


  /*
   * Real image successfully load होने पर
   * placeholder की जगह actual image दिखेगी.
   */

  const realImages =
    document.querySelectorAll(".real-product-image");


  realImages.forEach(function(image) {

    image.addEventListener(
      "load",
      function() {

        image.classList.add("loaded");

      }
    );


    image.addEventListener(
      "error",
      function() {

        image.style.display = "none";

      }
    );

  });


  /*
   * Add to Cart buttons
   */

  const orderButtons =
    document.querySelectorAll(".order-btn");


  orderButtons.forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        const productId =
          button.getAttribute(
            "data-product-id"
          );

        addToCart(productId);

      }
    );

  });

}



/* =====================================================
   7. ADD TO CART
   ===================================================== */

function addToCart(productId) {

  const product =
    findProduct(productId);


  if (!product) {
    return;
  }


  const existingItem =
    cart.find(function(item) {

      return item.id === productId;

    });


  if (existingItem) {

    if (
      existingItem.quantity <
      STORE.maxQuantity
    ) {

      existingItem.quantity += 1;

    }

  } else {

    cart.push({

      id: product.id,

      name: product.name,

      size: product.size,

      price: product.price,

      image: product.image,

      quantity: 1

    });

  }


  saveCart();

  renderCart();

  updateCartCount();


  /*
   * छोटा visual feedback
   */

  showCartFeedback();

}


/* =====================================================
   8. CART FEEDBACK
   ===================================================== */

function showCartFeedback() {

  if (!cartBtn) {
    return;
  }


  cartBtn.animate(

    [
      {
        transform: "scale(1)"
      },

      {
        transform: "scale(1.15)"
      },

      {
        transform: "scale(1)"
      }
    ],

    {
      duration: 350
    }

  );

}


/* =====================================================
   9. UPDATE CART COUNT
   ===================================================== */

function updateCartCount() {

  if (!cartCount) {
    return;
  }


  const totalItems =
    cart.reduce(
      function(total, item) {

        return total + item.quantity;

      },
      0
    );


  cartCount.textContent =
    totalItems;


  /*
   * Empty cart पर 0 दिखेगा.
   * चाहें तो बाद में इसे hide भी कर सकते हैं.
   */

}


/* =====================================================
   10. CART TOTAL
   ===================================================== */

function getCartTotal() {

  return cart.reduce(

    function(total, item) {

      return total +
        (item.price * item.quantity);

    },

    0

  );

}


/* =====================================================
   11. RENDER CART
   ===================================================== */

function renderCart() {

  if (!cartItems) {
    return;
  }


  cartItems.innerHTML = "";


  if (cart.length === 0) {

    cartEmpty.classList.add("active");

    cartOrderBtn.disabled = true;

    cartOrderBtn.style.opacity = "0.5";

  } else {

    cartEmpty.classList.remove("active");

    cartOrderBtn.disabled = false;

    cartOrderBtn.style.opacity = "1";


    cart.forEach(function(item) {

      const itemTotal =
        item.price * item.quantity;


      const cartItem =
        document.createElement("div");


      cartItem.className =
        "cart-item";


      cartItem.innerHTML = `

        <div class="cart-item-image">

          <img
            src="${item.image}"
            alt="${item.name}"
            onerror="this.style.display='none';"
          >

        </div>


        <div class="cart-item-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            ${item.size}
          </p>


          <div class="cart-item-controls">

            <button
              type="button"
              class="cart-qty-btn"
              data-action="minus"
              data-id="${item.id}"
            >
              −
            </button>


            <span class="cart-qty">
              ${item.quantity}
            </span>


            <button
              type="button"
              class="cart-qty-btn"
              data-action="plus"
              data-id="${item.id}"
            >
              +
            </button>


            <button
              type="button"
              class="cart-remove"
              data-action="remove"
              data-id="${item.id}"
            >
              Remove
            </button>

          </div>

        </div>


        <div class="cart-item-price">

          ${STORE.currency}${itemTotal}

        </div>

      `;


      cartItems.appendChild(cartItem);

    });

  }


  const total =
    getCartTotal();


  cartTotal.textContent =
    `${STORE.currency}${total}`;

}


/* =====================================================
   12. CART ITEM ACTIONS
   ===================================================== */

if (cartItems) {

  cartItems.addEventListener(
    "click",
    function(event) {

      const button =
        event.target.closest(
          "button"
        );


      if (!button) {
        return;
      }


      const productId =
        button.getAttribute(
          "data-id"
        );


      const action =
        button.getAttribute(
          "data-action"
        );


      const item =
        cart.find(function(cartItem) {

          return cartItem.id === productId;

        });


      if (!item) {
        return;
      }


      /* ---------- MINUS ---------- */

      if (action === "minus") {

        if (item.quantity > 1) {

          item.quantity -= 1;

        } else {

          /*
           * Quantity 1 पर minus करने से
           * item remove नहीं होगा.
           */

          return;

        }

      }


      /* ---------- PLUS ---------- */

      if (action === "plus") {

        if (
          item.quantity <
          STORE.maxQuantity
        ) {

          item.quantity += 1;

        }

      }


      /* ---------- REMOVE ---------- */

      if (action === "remove") {

        cart =
          cart.filter(function(cartItem) {

            return cartItem.id !== productId;

          });

      }


      saveCart();

      renderCart();

      updateCartCount();

    }
  );

}


/* =====================================================
   13. OPEN CART
   ===================================================== */

function openCart() {

  renderCart();

  updateCartCount();


  cartModal.classList.add(
    "active"
  );


  cartModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================================
   14. CLOSE CART
   ===================================================== */

function closeCart() {

  cartModal.classList.remove(
    "active"
  );


  cartModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =====================================================
   15. CART BUTTON
   ===================================================== */

if (cartBtn) {

  cartBtn.addEventListener(
    "click",
    openCart
  );

}


if (cartClose) {

  cartClose.addEventListener(
    "click",
    closeCart
  );

}


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    closeCart
  );

}


/* =====================================================
   16. OPEN ORDER MODAL
   ===================================================== */

function openOrderModal(productId) {

  const product =
    findProduct(productId);


  if (!product) {
    return;
  }


  currentProduct =
    product;


  selectedProduct.value =
    product.id;


  selectedProductText.textContent =

    `${product.name} • ` +
    `${product.size} • ` +
    `${STORE.currency}` +
    `${product.price}`;


  quantityInput.value =
    1;


  updateTotal();


  photoInput.value =
    "";


  photoPreview.innerHTML = `

    <span>
      Photo Preview
    </span>

  `;


  orderModal.classList.add(
    "active"
  );


  orderModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* =====================================================
   17. CLOSE ORDER MODAL
   ===================================================== */

function closeOrderModal() {

  orderModal.classList.remove(
    "active"
  );


  orderModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =====================================================
   18. ORDER MODAL EVENTS
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


/* =====================================================
   19. ESC KEY
   ===================================================== */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "Escape"
    ) {

      if (
        orderModal.classList.contains(
          "active"
        )
      ) {

        closeOrderModal();

      }


      if (
        cartModal.classList.contains(
          "active"
        )
      ) {

        closeCart();

      }

    }

  }
);


/* =====================================================
   20. PHOTO PREVIEW
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


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        alert(
          "कृपया केवल image file चुनें।"
        );


        photoInput.value =
          "";


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
   21. SINGLE PRODUCT QUANTITY
   ===================================================== */

if (minusBtn) {

  minusBtn.addEventListener(
    "click",
    function() {

      let quantity =
        parseInt(
          quantityInput.value
        ) || 1;


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
        parseInt(
          quantityInput.value
        ) || 1;


      if (
        quantity <
        STORE.maxQuantity
      ) {

        quantity++;

        quantityInput.value =
          quantity;

        updateTotal();

      }

    }
  );

}


/* =====================================================
   22. UPDATE SINGLE PRODUCT TOTAL
   ===================================================== */

function updateTotal() {

  if (!currentProduct) {
    return;
  }


  const quantity =
    parseInt(
      quantityInput.value
    ) || 1;


  const total =
    currentProduct.price *
    quantity;


  orderTotal.textContent =

    `${STORE.currency}${total}`;

}


/* =====================================================
   23. MOBILE MENU
   ===================================================== */

if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    function() {

      mobileMenu.classList.toggle(
        "active"
      );


      if (
        mobileMenu.classList.contains(
          "active"
        )
      ) {

        menuBtn.textContent =
          "×";

      } else {

        menuBtn.textContent =
          "☰";

      }

    }
  );

}


/* =====================================================
   24. MOBILE MENU LINKS
   ===================================================== */

if (mobileMenu) {

  const mobileLinks =
    mobileMenu.querySelectorAll(
      "a"
    );


  mobileLinks.forEach(
    function(link) {

      link.addEventListener(
        "click",
        function() {

          mobileMenu.classList.remove(
            "active"
          );


          menuBtn.textContent =
            "☰";

        }
      );

    }
  );

}


/* =====================================================
   25. CONTACT LINKS
   ===================================================== */

if (whatsappContact) {

  whatsappContact.href =

    `https://wa.me/` +
    `${STORE.whatsapp}`;

}


if (callContact) {

  callContact.href =

    `tel:+${STORE.phone}`;

}


/* =====================================================
   26. WHATSAPP - SINGLE PRODUCT ORDER
   ===================================================== */
if (orderForm) {

  orderForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      if (!currentProduct) {

        alert(
          "कृपया पहले कोई Frame चुनें।"
        );

        return;

      }


      const photo =
        photoInput.files[0];


      if (!photo) {

        alert(
          "कृपया अपनी Photo upload करें।"
        );

        photoInput.focus();

        return;

      }


      const name =
        customerName.value.trim();


      const phone =
        customerPhone.value.trim();


      const address =
        customerAddress.value.trim();


      if (
        name.length < 2
      ) {

        alert(
          "कृपया अपना सही नाम डालें।"
        );

        customerName.focus();

        return;

      }


      const phonePattern =
        /^[6-9][0-9]{9}$/;


      if (
        !phonePattern.test(phone)
      ) {

        alert(
          "कृपया 10 digit का सही mobile number डालें।"
        );

        customerPhone.focus();

        return;

      }


      if (
        address.length < 10
      ) {

        alert(
          "कृपया पूरा delivery address डालें।"
        );

        customerAddress.focus();

        return;

      }


      const quantity =
        parseInt(
          quantityInput.value
        ) || 1;


      const total =
        currentProduct.price *
        quantity;


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
Customer ने photo select की है।

🚚 ${STORE.deliveryMessage}

Please confirm my order.

Thank you!
*${STORE.name}*`;


      const whatsappURL =

        `https://wa.me/` +
        `${STORE.whatsapp}` +
        `?text=` +
        encodeURIComponent(
          message
        );


      window.open(
        whatsappURL,
        "_blank"
      );


      closeOrderModal();

    }
  );

}


/* =====================================================
   27. CART → WHATSAPP ORDER
   ===================================================== */

if (cartOrderBtn) {

  cartOrderBtn.addEventListener(
    "click",
    function() {

      if (
        cart.length === 0
      ) {

        alert(
          "आपका Cart खाली है।"
        );

        return;

      }


      /*
       * Cart के products की list
       */

      let productLines = "";


      cart.forEach(
        function(item, index) {

          const itemTotal =
            item.price *
            item.quantity;


          productLines +=

`${index + 1}. ${item.name}
   Size: ${item.size}
   Quantity: ${item.quantity}
   Price: ${STORE.currency}${item.price}
   Subtotal: ${STORE.currency}${itemTotal}

`;

        }
      );


      const total =
        getCartTotal();


      /*
       * Customer को अभी
       * WhatsApp पर भेजेंगे.
       *
       * इसके बाद customer अपनी
       * photos भेज सकता है.
       */

      let message =

`🖼️ *${STORE.name} - New Order*

━━━━━━━━━━━━━━━━━━

📦 *Order Details*

${productLines}

━━━━━━━━━━━━━━━━━━

💰 *TOTAL: ${STORE.currency}${total}*

━━━━━━━━━━━━━━━━━━

📸 *Photos*

मैं अपने selected products की photos
WhatsApp पर इस message के बाद भेजूंगा/भेजूंगी।

🚚 ${STORE.deliveryMessage}

Please confirm my order.

Thank you!
*${STORE.name}*`;


      const whatsappURL =

        `https://wa.me/` +
        `${STORE.whatsapp}` +
        `?text=` +
        encodeURIComponent(
          message
        );


      window.open(
        whatsappURL,
        "_blank"
      );


      /*
       * Order भेजने के बाद cart clear
       */

      cart = [];

      saveCart();

      renderCart();

      updateCartCount();

      closeCart();

    }
  );

}


/* =====================================================
   28. CURRENT YEAR
   ===================================================== */

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =====================================================
   29. INITIALIZE
   ===================================================== */

renderProducts();

renderCart();

updateCartCount();
