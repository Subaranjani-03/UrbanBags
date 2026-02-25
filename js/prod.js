const showToast = (message, type = "success") => {
  let bgColor;

  if (type === "success") {
    bgColor = "linear-gradient(to right, #00b09b, #96c93d)";
  } else if (type === "warning") {
    bgColor = "linear-gradient(to right, #ff8008, #ffc837)";
  } else {
    bgColor = "linear-gradient(to right, #ff416c, #ff4b2b)";
  }

  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: {
      background: bgColor,
      borderRadius: "8px",
      fontSize: "1.2rem",
      padding: "20px",
    },
  }).showToast();
};

let loadProducts = () => {
  let container = document.getElementById("productsContainer");
  let prodList = JSON.parse(localStorage.getItem("prodList")) || [];

  if (container) {
    let data = "";

    prodList.forEach((ele) => {
      let originalPrice = Number(ele.price);
      let discountPercent = Number(ele.offer);
      let discountedPrice =
        originalPrice - (originalPrice * discountPercent) / 100;

      let ratingValue = (Math.random() * 1 + 4).toFixed(1);

      data += `
        <div class="product-card">

          <span class="offer-badge">${discountPercent}% OFF</span>

          <div class="upper-cart">
            <i class="fa-solid fa-heart wishlist"></i>
            <i class="fa-solid fa-share-nodes share"></i>
          </div>

          <div class="product-img">
            <img src="${ele.imgUrl}" alt="${ele.prodName}" />
          </div>

          <h3 class="product-name">${ele.prodName}</h3>

          <p class="product-category">${ele.category}</p>

          <div class="price-box">
            <p class="product-price">₹${discountedPrice.toFixed(0)}</p>
            <p class="product-strike">₹${originalPrice}</p>
          </div>

          <button 
            class="add-cart"
            data-id="${ele.productId}"
            data-name="${ele.prodName}"
            data-price="${ele.price}"
            data-offer="${ele.offer}"
            data-stock="${ele.stock}"
            data-img="${ele.imgUrl}">

            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>

          <div class="rating">
            <i class="fa-solid fa-star"></i>
            <span class="rating-value">${ratingValue}</span>
          </div>

        </div>
      `;
    });

    container.innerHTML += data;
  }
};

loadProducts();

// add to cart function
// document.addEventListener("click", function (e) {

//   // Check if clicked on any add-cart button
//   if (e.target.closest(".add-cart")) {

//     let btn = e.target.closest(".add-cart");

//     // Get cart from localStorage
//     let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

//     let productId = btn.dataset.id;

//     // Check if product already exists in cart
//     let existing = cartList.find(ele => ele.productId == productId);

//     if (existing) {
//       // Show warning if already added
//       // Swal.fire({
//       //   icon: "warning",
//       //   title: "Already in Cart!",
//       //   text: "This product is already added.",
//       //   timer: 1500,
//       //   showConfirmButton: false
//       // });
//       showToast("Already in Cart", "warning");
//       return; // Stop execution
//     }

//     // If not in cart → add
//     let product = {
//       productId: btn.dataset.id,
//       prodName: btn.dataset.name,
//       price: btn.dataset.price,
//       offer: btn.dataset.offer,
//       imgUrl: btn.dataset.img,
//       quantity: 1
//     };

//     cartList.push(product);

//     // Save updated cart back to localStorage
//     localStorage.setItem("cartList", JSON.stringify(cartList));

//     // Update cart count badge
//     updateCartCount();

//     // Swal.fire({
//     //   icon: "success",
//     //   title: "Added to Cart!",
//     //   timer: 1000,
//     //   showConfirmButton: false
//     // });
//     showToast("Item Added to Cart", "success");
//   }
// });

document.addEventListener("click", function (e) {
  if (e.target.closest(".add-cart")) {
    let btn = e.target.closest(".add-cart");

    let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    let prodList = JSON.parse(localStorage.getItem("prodList")) || [];

    let productId = btn.dataset.id;

    //  Check if product exists in admin list
    let productData = prodList.find((ele) => ele.productId == productId);

    let stock;

    if (productData) {
      // From admin panel
      stock = Number(productData.stock);
    } else {
      // From static HTML
      stock = Number(btn.dataset.stock);
    }

    if (!stock || stock <= 0) {
      showToast("Out of Stock!", "error");
      return;
    }

    let existing = cartList.find((ele) => ele.productId == productId);

    if (existing) {
      showToast("Product already added to cart!", "warning");
      return;
    }

    // ✅ Add new product
    let product = {
      productId: btn.dataset.id,
      prodName: btn.dataset.name,
      price: btn.dataset.price,
      offer: btn.dataset.offer,
      imgUrl: btn.dataset.img,
      stock: stock,
      quantity: 1,
    };

    cartList.push(product);

    localStorage.setItem("cartList", JSON.stringify(cartList));

    updateCartCount();
    showToast("Item Added to Cart", "success");
  }
});

function updateCartCount() {
  let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
  let count = document.getElementById("count");

  if (count) {
    if (cartList.length > 0) {
      count.innerText = cartList.length; // Only count products
      count.style.display = "block";
    } else {
      count.style.display = "none";
    }
  }
}

updateCartCount();
