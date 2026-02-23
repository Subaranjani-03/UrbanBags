// product page
//preventDefault()
let submit_btn = document.querySelector("form");

submit_btn.addEventListener("submit", (e) => {
  e.preventDefault();

  let pid = document.getElementById("productId").value;

  if (pid) {
    updateData();
  } else {
    regForm();
  }
});

//form validation function
let validateForm = () => {
  let imgUrl = document.getElementById("img-url");
  let prodName = document.getElementById("prod-name");
  let category = document.getElementById("category");
  let price = document.getElementById("price");
  let stock = document.getElementById("stock");
  let offer = document.getElementById("offer");

  let urlError = document.getElementById("urlError");
  let prodError = document.getElementById("prodError");
  let categoryError = document.getElementById("categoryError");
  let priceError = document.getElementById("priceError");
  let stockError = document.getElementById("stockError");
  let offerError = document.getElementById("offerError");

  let isCheck = true;

  // Image
  if (imgUrl.value === "") {
    urlError.innerText = "Please fill out valid URL !";
    imgUrl.style.border = "2px solid red";
    isCheck = false;
  } else {
    urlError.innerText = "";
    imgUrl.style.border = "";
  }

  // Product Name
  if (prodName.value === "") {
    prodError.innerText = "Please fill out this field !";
    prodName.style.border = "2px solid red";
    isCheck = false;
  } else if (!/^[A-Za-z\s]+$/.test(prodName.value)) {
    prodError.innerText = "Must contain only alphabets!";
    prodName.style.border = "2px solid red";
    isCheck = false;
  } else if (prodName.value.length < 3) {
    prodError.innerText = "Must be at least 3 letters!";
    prodName.style.border = "2px solid red";
    isCheck = false;
  } else {
    prodError.innerText = "";
    prodName.style.border = "";
  }

  // Category
  if (category.value.trim() === "") {
    categoryError.innerText = "Please fill out this field !";
    category.style.border = "2px solid red";
    isCheck = false;
  } else {
    categoryError.innerText = "";
    category.style.border = "";
  }

  // Price
  if (price.value === "") {
    priceError.innerText = "Please fill out this field !";
    price.style.border = "2px solid red";
    isCheck = false;
  } else if (Number(price.value) <= 0) {
    priceError.innerText = "Negative Value not Allowed!";
    price.style.border = "2px solid red";
    isCheck = false;
  } else {
    priceError.innerText = "";
    price.style.border = "";
  }

  // Stock
  if (stock.value === "") {
    stockError.innerText = "Please fill out this field !";
    stock.style.border = "2px solid red";
    isCheck = false;
  } else if (Number(stock.value) <= 0) {
    stockError.innerText = "Negative Value not Allowed!";
    stock.style.border = "2px solid red";
    isCheck = false;
  } else {
    stockError.innerText = "";
    stock.style.border = "";
  }

  // Offer
  if (offer.value === "") {
    offerError.innerText = "Please fill out this field !";
    offer.style.border = "2px solid red";
    isCheck = false;
  } else if (Number(offer.value) < 0) {
    offerError.innerText = "Negative Value not Allowed!";
    offer.style.border = "2px solid red";
    isCheck = false;
  } else {
    offerError.innerText = "";
    offer.style.border = "";
  }

  return isCheck;
};

//add data to form
let regForm = () => {
  //validation
  if (!validateForm()) return;

  let prodList = JSON.parse(localStorage.getItem("prodList")) || [];

  let imgUrl = document.getElementById("img-url");
  let prodName = document.getElementById("prod-name");
  let category = document.getElementById("category");
  let price = document.getElementById("price");
  let stock = document.getElementById("stock");
  let offer = document.getElementById("offer");

  //Duplicate Product Name Check
  let duplicate = prodList.filter((ele) => {
    return ele.prodName.toLowerCase() === prodName.value.toLowerCase();
  });

  if (duplicate.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Product name already exists!",
    });
    return;
  }

  //object creation
  let regData = {
    productId: Date.now(),
    imgUrl: imgUrl.value,
    prodName: prodName.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
    offer: offer.value,
  };

  //push object to array
  prodList.push(regData);

  //set array to local storage
  localStorage.setItem("prodList", JSON.stringify(prodList));

  Swal.fire({
    icon: "success",
    title: "Product Added!",
    timer: 1500,
    showConfirmButton: false,
  });

  loadData();

  document.querySelector("form").reset();
};

let loadData = () => {
  //get tbody id
  let tbody = document.getElementById("prodTable");

  //get array from local storage
  let prodList = JSON.parse(localStorage.getItem("prodList")) || [];

  // console.log(prodList)

  let tr = "";

  //using forEach()
  if (prodList != null) {
    prodList.forEach((ele, index) => {
      tr += `<tr>
                    <td>${index + 1}</td>
                    <td>${ele.productId}</td>
                    <td><img src="${ele.imgUrl}" alt="${ele.prodName}" width="80px" height="80px" border = '1px solid purple'/>  </td> 
                    <td>${ele.prodName}</td>   
                    <td>${ele.category}</td>   
                    <td>${ele.price}</td>   
                    <td>${ele.stock}</td>   
                    <td>${ele.offer}</td>   
                    <td>
                    <button type="button" class = "update-btn" onclick="updatePro(${ele.productId})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class = "delete-btn" onclick="deletePro(${ele.productId})"><i class="fa-solid fa-trash-can"></i></button>    
                    </td>
                </tr>`;
    });
  } else {
    tr += `<tr><td colspan="9" align="center">No Record Found</td></tr>`;
  }

  // console.log(tr)

  tbody.innerHTML = tr;
};
// Load categories into dropdown
let loadCategories = () => {
  let categorySelect = document.getElementById("category");
  let catList = JSON.parse(localStorage.getItem("catList")) || [];

  // Reset dropdown
  categorySelect.innerHTML = `<option value="">Select Category</option>`;

  catList.forEach((ele) => {
    categorySelect.innerHTML += `
      <option value="${ele.category}">
        ${ele.category}
      </option>
    `;
  });
};
loadData();
loadCategories();

//update product

let updatePro = (productId) => {
  // console.log(productId);
  let productList = JSON.parse(localStorage.getItem("prodList"));
  // console.log(productList)

  let fpl = productList.filter((ele) => {
    if (ele.productId == productId) {
      return ele;
    }
  });

  // console.log(fpl);
  let [singleProduct] = fpl;

  // console.log(singleProduct)

  document.getElementById("productId").value = singleProduct.productId;
  document.getElementById("img-url").value = singleProduct.imgUrl;
  document.getElementById("prod-name").value = singleProduct.prodName;
  document.getElementById("category").value = singleProduct.category;
  document.getElementById("price").value = singleProduct.price;
  document.getElementById("stock").value = singleProduct.stock;
  document.getElementById("offer").value = singleProduct.offer;

  document.querySelector("#updatebtn").style.display = "block";
  document.querySelector("#submitbtn").style.display = "none";
};

let updateData = () => {
  //validation
  if (!validateForm()) return;

  let pid = document.getElementById("productId").value;
  let prodName = document.getElementById("prod-name").value;
  let pl = JSON.parse(localStorage.getItem("prodList")) || [];

  //  Duplicate Check
  let duplicate = pl.filter((ele) => {
    return (
      ele.prodName.toLowerCase() === prodName.toLowerCase() &&
      ele.productId != pid
    );
  });

  if (duplicate.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Product name already exists!",
    });
    return;
  }

  let productData = {
    productId: Number(pid),
    imgUrl: document.getElementById("img-url").value,
    prodName: document.getElementById("prod-name").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    stock: document.getElementById("stock").value,
    offer: document.getElementById("offer").value,
  };

  let upl = pl.map((ele) => {
    if (ele.productId == pid) {
      return productData;
    } else {
      return ele;
    }
  });
  localStorage.setItem("prodList", JSON.stringify(upl));

  Swal.fire({
    icon: "success",
    title: "Updated!",
    timer: 1500,
    showConfirmButton: false,
  });

  loadData();

  let form = document.querySelector("form");
  form.reset();
  document.getElementById("productId").value = "";

  document.querySelector("#updatebtn").style.display = "none";
  document.querySelector("#submitbtn").style.display = "block";
};

// delete product
let deletePro = (productId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let productList = JSON.parse(localStorage.getItem("prodList")) || [];

      let updatedList = productList.filter((ele) => {
        return ele.productId != productId;
      });

      localStorage.setItem("prodList", JSON.stringify(updatedList));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      loadData();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        icon: "info",
        title: "Safe!",
        text: "Your product is safe",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};
