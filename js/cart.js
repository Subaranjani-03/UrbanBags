let cartContainer = document.getElementById("cartContainer");

const renderCart = () => {

  let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

  if (!cartContainer) return;

  if (cartList.length === 0) {

    cartContainer.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:30px;">
          <h3>No Records Found</h3>
        </td>
      </tr>
    `;

    document.getElementById("subtotal").innerText = "0.00";
    document.getElementById("delivery").innerText = "0.00";
    document.getElementById("total").innerText = "0.00";

    Swal.fire({
      icon: "info",
      title: "Cart is Empty",
      text: "Please add products to cart"
    });

    return;
  }

  let subtotal = 0;
  let data = "";

  cartList.forEach((ele, index) => {

    let price = Number(ele.price);
    let offer = Number(ele.offer);

    let finalPrice = price - (price * offer) / 100;
    let totalItemPrice = finalPrice * ele.quantity;

    subtotal += totalItemPrice;

    data += `
      <tr>

        <td class="product-details">
          <img src="${ele.imgUrl}" alt="${ele.prodName}" />
          <div>
            <h4>${ele.prodName}</h4>
          </div>
        </td>

        <td class="quantity-box">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${ele.quantity}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>

        <td>Rs ${finalPrice.toFixed(2)}</td>

        <td>Rs ${totalItemPrice.toFixed(2)}</td>

        <td>
          <i class="fa-solid fa-trash delete-btn"
             onclick="removeItem(${index})"></i>
        </td>

      </tr>
    `;
  });

  cartContainer.innerHTML = data;

  let delivery = subtotal > 0 ? 5.00 : 0.00;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("delivery").innerText = delivery.toFixed(2);
  document.getElementById("total").innerText = (subtotal + delivery).toFixed(2);
};


// const changeQty = (index, change) => {

//   let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

//   cartList[index].quantity += change;

//   if (cartList[index].quantity < 1) {
//     cartList[index].quantity = 1;
//   }

//   localStorage.setItem("cartList", JSON.stringify(cartList));
//   renderCart();
// };

const changeQty = (index, change) => {

  let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
  let prodList = JSON.parse(localStorage.getItem("prodList")) || [];

  let item = cartList[index];

  // 🔹 Find stock from admin list
  let productData = prodList.find(ele => ele.productId == item.productId);

  let stock;

  if (productData) {
    stock = Number(productData.stock);
  } else {
    // For static HTML products
    stock = Number(item.stock || 0);
  }

  // If increasing quantity
  if (change === 1) {

    if (item.quantity + 1 > stock) {
      Swal.fire({
        icon: "error",
        title: "Insufficient Stock!",
        text: `Only ${stock} item(s) available`
      });
      return;
    }

  }

  item.quantity += change;

  if (item.quantity < 1) {
    item.quantity = 1;
  }

  localStorage.setItem("cartList", JSON.stringify(cartList));
  renderCart();
};

const removeItem = (index) => {

  let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

  cartList.splice(index, 1);

  localStorage.setItem("cartList", JSON.stringify(cartList));
  renderCart();
};

let checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {

  checkoutBtn.addEventListener("click", () => {

    let cartList = JSON.parse(localStorage.getItem("cartList")) || [];

    if (cartList.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart is Empty",
        text: "Add products before checkout"
      });
      return;
    }

    let subtotal = document.getElementById("subtotal").innerText;
    let delivery = document.getElementById("delivery").innerText;
    let total = document.getElementById("total").innerText;

    Swal.fire({
      title: "Payment Done!",
      html: `
        <p>Subtotal: Rs ${subtotal}</p>
        <p>Delivery: Rs ${delivery}</p>
        <p><b>Total Paid: Rs ${total}</b></p>
        <p>Thank you for shopping with UrbanBags!</p>
      `,
      icon: "success",
      confirmButtonText: "Close",
    }).then(() => {
      localStorage.removeItem("cartList");
      renderCart();
    });

  });

}

renderCart();


