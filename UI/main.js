$(document).ready(function () {
  function countCartItem() {
    let count = 0;
    if (localStorage.getItem("carts")) {
      arr = JSON.parse(localStorage.getItem("carts"));
      count = arr.length;
    }
    
    $("#cart-item-count").html(count);
  }
  countCartItem();

  // add to cart
  $(document).on("click",'.add_to_cart',function(){
    let arr = [];
    let id = $(this).attr("data-attr");
    let qty = 1;
    let price = $(this).prev().find(".new_price").text();
    let img = $(this).parent().find(".container img").attr("src");

    if (id) {
      if (localStorage.getItem("carts")) {
        arr = JSON.parse(localStorage.getItem("carts"));
        let item = arr.find((x) => x.id == id);
        if (item) {
          item.qty++;
        } else {
          arr.push({
            id,
            qty,
            price,
            img,
          });
        }
      } else {
        arr.push({
          id,
          qty,
          price,
          img,
        });
      }
      localStorage.setItem("carts", JSON.stringify(arr));
      countCartItem();
    }
  })

  if ($(".avaliableList")) {
    let arr = [];
    if (localStorage.getItem("carts")) {
      arr = JSON.parse(localStorage.getItem("carts"));

      if (arr.length) {
        $(".unavaliablelist").hide();
      }
    }
    let html = "";

    for (let i = 0; i < arr.length; i++) {
      let a = arr[i];
      let total = (
        parseFloat(a.price.toString().replace("₦", "").replace(",", "")) * parseInt(a.qty)
      ).toLocaleString();
      html += ` <tr>
            <td><img src="${a.img}"></td>
            <td>${a.price}</td>
            <td>
                <span>${a.qty}</span>
            </td>
            <td>₦${total}</td>
            <td><button class="delete-btn" data-attr=${a.id}>Delete</button></td>
        </tr>`;
    }
    $(".tbody").html(html);
  }

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const qtyElement = e.target.previousElementSibling;
      let qty = parseInt(qtyElement.innerText);
      qtyElement.innerText = ++qty;

      // You'd also update the Total Price here based on the price and qty
    });
  });

  function fetchProduct() {
    $.ajax({
      method:"GET",
      url: "https://e-commerce-0r6p.onrender.com/products",
      success: (arr) => {
        let html = "";
        $(".lds-ripple").hide()
        for (let i = 0; i < arr.length; i++) {
          let a = arr[i];
          let total = (
            //parseFloat(a.price.replace("₦", "").replace(",", "")) *
            parseInt(a.qty)
          ).toLocaleString();
          html += `<div class="product_list">
          <a href="/ui/product.html?id=${a._id}">
          <div class="container">
              <img src="${a.avatar}"
                  alt="">
                  <div class="top-right" >
                      <p>sale</p>
                  </div>
          </div>
          <p style="padding-top: 5px; font-size: 20px;" class="product_name">${a.title}</p>
          <p style="font-size: 14px;" class="product_id">${a.productId}</p>
          <div class="price_diff">
              <p class="old_price">&#8358;${a.old_price}</p>
              <p class="new_price">&#8358;${a.price}</p>
          </div>
          </a>
          
          <button class="add_to_cart" data-attr="${a.productId}">ADD TO CART</button>
          </div>`;
        }
        $(".product_row").html(html);
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  document.querySelectorAll(".sub-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const qtyElement = e.target.nextElementSibling;
      let qty = parseInt(qtyElement.innerText);
      if (qty > 1) {
        qtyElement.innerText = --qty;
      }

      // You'd also update the Total Price here based on the price and qty
    });
  });

  // For delete functionality
  const deleteButtons = document.querySelectorAll(".delete-btn");

  // Function to handle delete button click
  function handleDeleteClick(event) {
    let id = event.target.getAttribute("data-attr");
    let arr = [];
    if (localStorage.getItem("carts")) {
      arr = JSON.parse(localStorage.getItem("carts"));
      arr = arr.filter((x) => x.id != id);
      localStorage.setItem("carts", JSON.stringify(arr));
      countCartItem();
    }

    let row = event.target.closest("tr"); // Find the closest table row to the clicked button
    if (row) {
      row.remove(); // Remove the row from the table
    }
  }
  // SEND CART INFO TO WHATSAPP

  // <a href=}
	// target='_blank'
	// rel='noreferrer'></a>;

  // CHECKOUT VALUE
  let firstName = document.getElementById("fristNameCheckout");
  let lastName = document.getElementById("lastNameCheckout");
  let address = document.getElementById("addressCheckout");
  let city = document.getElementById("cityCheckout");
  let telNumber = document.getElementById("telCheckout");
  let email = document.getElementById("emailCheckout");
  let submitButton = document.getElementById("submitButton");

 if(submitButton){
  submitButton.addEventListener("click", function() {
  
    let item = localStorage.getItem('carts')
    if(item){
     
      let arr =  JSON.parse(item);
      let text =  "Hi BuddyStores, here are my order %0D"
      for (let i = 0; i < arr.length; i++) {
        let a = arr[i];
        let total = (
          parseFloat(a.price.replace("₦", "").replace(",", "")) * parseInt(a.qty)
        ).toLocaleString();

        console.log("hzcbdhbchzbjcnajcndj")
      
      text +=`${a.id} x *${a.qty}*  ${total} %0D` 
      }
      let firstNameInputValue = firstName.value;
      let lastNameInputValue = lastName.value;
      let addressInputValue = address.value;
      let cityInputValue = city.value;
      let telNumberInputValue = telNumber.value;
      let emailInputValue = email.value;
      
      text += `%0D %0D User Details %0D
      Fullname :*${firstNameInputValue}* *${lastNameInputValue}* %0D
      Address: *${addressInputValue}* %0D
      City: *${cityInputValue}* %0D
      Phone: *${telNumberInputValue}*%0D
      Email: ${emailInputValue}
      `
      localStorage.clear()
      
      // location.href="https://google.com"
      location.href=`https://wa.me/+2347025514897?text=${text}`
    }

  });
 }



  // Attach click event listeners to all delete buttons
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteClick);
  });

  if( $(".product_row")){
    
    fetchProduct()
  }


  if($(".checkBTN")){
    $(".checkBTN").click(function(){
      let item = localStorage.getItem('carts')
      if(item){

          location.href="checkout.html"
//         let arr =  JSON.parse(item);
//         let text =  "Hello welcome to"
//         for (let i = 0; i < arr.length; i++) {
//           let a = arr[i];
//           let total = (
//             parseFloat(a.price.replace("₦", "").replace(",", "")) * parseInt(a.qty)
//           ).toLocaleString();
        
//         text +=`${a.id} x *${a.qty}*  ${total}` 
//         }
//         let firstNameInputValue = firstName.value;
//         let lastNameInputValue = lastName.value;
//         let addressInputValue = address.value;
//         let cityInputValue = city.value;
//         let telNumberInputValue = telNumber.value;
//         let emailInputValue = email.value;
        
//         text += `
//         User Details
//         *${firstNameInputValue}*
//         *${lastNameInputValue}*
//         *${addressInputValue}*
//         *${cityInputValue}*
//         *${telNumberInputValue}*
//         *${emailInputValue}*
//         `
// //2347025514897
//         location.href=`https://wa.me/+2348169971030?text=${text}`

      }
    })
  }




  


});
