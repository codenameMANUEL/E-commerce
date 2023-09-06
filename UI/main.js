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
        parseFloat(a.price.replace("₦", "").replace(",", "")) * parseInt(a.qty)
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
       
        for (let i = 0; i < arr.length; i++) {
          let a = arr[i];
          let total = (
            //parseFloat(a.price.replace("₦", "").replace(",", "")) *
            parseInt(a.qty)
          ).toLocaleString();
          html += `<div class="product_list">
          <div class="container">
              <img src="https://images.pexels.com/photos/13936049/pexels-photo-13936049.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="">
                  <div class="top-right" >
                      <p>sale</p>
                  </div>
          </div>
          <p style="padding-top: 5px; font-size: 20px;" class="product_name">${a.title}</p>
          <p style="font-size: 14px;" class="product_id">ZFRT98</p>
          <div class="price_diff">
              <p class="old_price">&#8358;40,000</p>
              <p class="new_price">&#8358;${a.price}</p>
          </div>
          <button class="add_to_cart" data-attr="${a._id}">ADD TO CART</button>
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
        let arr =  JSON.parse(item);
        let text =  "Hello welcome to "
        for (let i = 0; i < arr.length; i++) {
          let a = arr[i];
          let total = (
            parseFloat(a.price.replace("₦", "").replace(",", "")) * parseInt(a.qty)
          ).toLocaleString();

        
        text +=`
        
        ${a.id} x *${a.qty}*  ${total}
        
        User Details
        *Anestin Jude*
        *abc@gmail.com*
        *090876545672*
        ` 
        }

        location.href=`https://wa.me/+2348121230526?text=${text}`

      }
    })
  }


});
