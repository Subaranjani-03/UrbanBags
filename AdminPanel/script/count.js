let prod = JSON.parse(localStorage.getItem("prodList")) || [];
document.querySelector(".sub-card1 .dash-card-amt").innerText = prod.length + "+";

let cat = JSON.parse(localStorage.getItem("catList")) || [];
document.querySelector(".sub-card2 .dash-card-amt").innerText = cat.length +'+'

let reg = JSON.parse(localStorage.getItem("regList")) || []; 
document.querySelector(".sub-card3 .dash-card-amt").innerText = reg.length + "+";

let totalStock = prod.reduce((acc, ele) => {
  return acc + Number(ele.stock);
}, 0);
document.querySelector(".sub-card4 .dash-card-amt").innerText = totalStock + "+";
