//category page
//preventDefault()
let submit_btn = document.querySelector("form");

submit_btn.addEventListener("submit", (e) => {
  e.preventDefault();

  let pid = document.getElementById("productId").value;

  if (pid) {
    updateData();
  } else {
    categoryTable();
  }
});

//form validation function
let validateCat = () => {
  let imgUrl = document.getElementById("categoryImg");
  let category = document.getElementById("category");

  let urlError = document.getElementById("urlError");
  let categoryError = document.getElementById("categoryError");

  let isCheck = true;

  // Image
  if (imgUrl.value === "") {
    urlError.innerText = "Please fill out this field !";
    imgUrl.style.border = "2px solid red";
    isCheck = false;
  } else {
    urlError.innerText = "";
    imgUrl.style.border = "";
  }

  if (category.value === "") {
    categoryError.innerText = "Please fill out this field !";
    category.style.border = "2px solid red";
    isCheck = false;
  } else if (category.value.length < 3) {
    categoryError.innerText = "Category must be atleast 3 letters!";
    category.style.border = "2px solid red";
    isCheck = false;
  } else {
    categoryError.innerText = "";
    category.style.border = "";
  }

  return isCheck;
};

//add data to form
let categoryTable = () => {
  //validation
  if (!validateCat()) return;

  let catList = JSON.parse(localStorage.getItem("catList")) || [];

  let imgUrl = document.getElementById("categoryImg");
  let categoryValue = document.getElementById("category").value.trim();

  let duplicate = catList.filter((ele) => {
    return ele.category.toLowerCase() === categoryValue.toLowerCase();
  });

  if (duplicate.length > 0) {
    Swal.fire({
      icon: "error",
      title: "This category name already exists!",
    });
    return;
  }

  let regData = {
    productId: Date.now(),
    imgUrl: imgUrl.value,
    category: document.getElementById("category").value,
  };

  catList.push(regData);

  localStorage.setItem("catList", JSON.stringify(catList));

  Swal.fire({
    icon: "success",
    title: "Category Added!",
    timer: 1500,
    showConfirmButton: false,
  });

  loadData();

  document.getElementById("categoryImg").value = "";
  document.getElementById("category").value = "";
};

let loadData = () => {
  //get tbody id
  let tbody = document.getElementById("catTable");

  //get array from local storage
  let catList = JSON.parse(localStorage.getItem("catList")) || [];
  // console.log(catList)

  let tr = "";
  if (catList != null) {
    //using forEach()
    catList.forEach((ele, index) => {
      tr += `<tr>
                    <td>${index + 1}</td>
                    <td>${ele.productId}</td>
                    <td><img src="${ele.imgUrl}" alt="${ele.category}" width="80px" height="80px" />  </td> 
                    <td>${ele.category}</td>  
                    <td>
                    <button type="button" class = "update-btn" onclick="updatePro(${ele.productId})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class = "delete-btn" onclick="deletePro(${ele.productId})"><i class="fa-solid fa-trash-can"></i></button>    
                    </td> 
                </tr>`;
    });
  } else {
    tr += `<tr><td colspan="5" align="center">No Record Found</td></tr>`;
  }

  // console.log(tr)

  tbody.innerHTML = tr;
};
loadData();

//update category

let updatePro = (productId) => {
  // console.log(productId);
  let categoryList = JSON.parse(localStorage.getItem("catList"));
  // console.log(categoryList)

  let fpl = categoryList.filter((ele) => {
    if (ele.productId == productId) {
      return ele;
    }
  });

  // console.log(fpl);
  let [singleProduct] = fpl;

  // console.log(singleProduct)

  document.getElementById("productId").value = singleProduct.productId;
  document.getElementById("categoryImg").value = singleProduct.imgUrl;
  document.getElementById("category").value = singleProduct.category;

  document.querySelector("#updatebtn").style.display = "block";
  document.querySelector("#submitbtn").style.display = "none";
};

let updateData = () => {
  if (!validateCat()) return;

  let pid = document.getElementById("productId").value;

  let pimage = document.getElementById("categoryImg").value;
  let pcategory = document.getElementById("category").value;

  let pl = JSON.parse(localStorage.getItem("catList")) || [];

  // Check duplicate while updating
  let duplicate = pl.filter((ele) => {
    return (
      ele.category.toLowerCase() === pcategory.toLowerCase() &&
      ele.productId != pid
    );
  });

  if (duplicate.length > 0) {
    Swal.fire({
      icon: "error",
      title: "This category name already exists!",
    });
    return;
  }

  let productData = {
    productId: Number(pid),
    imgUrl: pimage,
    category: pcategory,
  };

  let upl = pl.map((ele) => {
    if (ele.productId == pid) {
      return productData;
    } else {
      return ele;
    }
  });

  localStorage.setItem("catList", JSON.stringify(upl));

  Swal.fire({
    icon: "success",
    title: "Updated!",
    timer: 1500,
    showConfirmButton: false,
  });

  loadData();

  document.getElementById("productId").value = "";
  document.getElementById("category").value = "";
  document.getElementById("categoryImg").value = "";

  document.querySelector("#updatebtn").style.display = "none";
  document.querySelector("#submitbtn").style.display = "block";
};

//delete category
let deletePro = (productId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this category?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let categoryList = JSON.parse(localStorage.getItem("catList")) || [];

      let fpl = categoryList.filter((ele) => {
        return ele.productId != productId;
      });

      localStorage.setItem("catList", JSON.stringify(fpl));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Category deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      loadData();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        icon: "info",
        title: "Safe!",
        text: "Your category is safe",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};
