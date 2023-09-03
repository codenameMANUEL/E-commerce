$(document).ready(function(){
   
    function countCartItem(){
        let count = 0;
        if(localStorage.getItem("carts")){
            arr =  JSON.parse(localStorage.getItem('carts'))
            count = arr.length;
        }
        $('#cart-item-count').html(count)
    }
    countCartItem()
    // add to cart
    $(".add_to_cart").click(function(){

        let arr = []
        let id = $(this).attr('data-attr')
        let qty = 1
        let price = $(this).prev().find('.new_price').text()
        let img = $(this).parent().find('.container img').attr('src')
       
        if(id){
            if(localStorage.getItem("carts")){
                arr =  JSON.parse(localStorage.getItem('carts'))
                let item = arr.find(x=>x.id == id );
                if(item){
                    item.qty++;
                }else{
                    arr.push({
                        id,
                        qty,
                        price,
                        img
                    })   
                }
            
            }else{
                
                arr.push({
                    id,
                    qty,
                    price,
                    img
                })
              
            }
            localStorage.setItem('carts',JSON.stringify(arr))
            countCartItem()
        }
    })

    if($('.avaliableList')){
        let arr = []
        if(localStorage.getItem("carts")){
            arr =  JSON.parse(localStorage.getItem('carts'))

            if(arr.length){
                $('.unavaliablelist').hide()
            }
        }
        let html ='';
       
        for(let i=0;i<arr.length;i++){
            let a = arr[i];
            let total = (parseFloat(a.price.replace('₦','').replace(',','')) * parseInt(a.qty)).toLocaleString()
            html += ` <tr>
            <td><img src="${a.img}"></td>
            <td>${a.price}</td>
            <td>
                <button class="sub-btn">-</button>
                <span>${a.qty}</span>
                <button class="add-btn">+</button>
            </td>
            <td>₦${total}</td>
            <td><button class="delete-btn" data-attr=${a.id}>Delete</button></td>
        </tr>`
        }
        $('.tbody').html(html)
    }

    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const qtyElement = e.target.previousElementSibling;
            let qty = parseInt(qtyElement.innerText);
            qtyElement.innerText = ++qty;
    
            // You'd also update the Total Price here based on the price and qty
        });
    });
    
    document.querySelectorAll('.sub-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const qtyElement = e.target.nextElementSibling;
            let qty = parseInt(qtyElement.innerText);
            if(qty > 1) {
                qtyElement.innerText = --qty;
            }
    
            // You'd also update the Total Price here based on the price and qty
        });
    });
    
    // For delete functionality
const deleteButtons = document.querySelectorAll('.delete-btn');

// Function to handle delete button click
function handleDeleteClick(event) {
    let id = event.target.getAttribute('data-attr')
    let arr = []
    if(localStorage.getItem("carts")){
        arr =  JSON.parse(localStorage.getItem('carts'))
        arr = arr.filter(x=>x.id != id);
        localStorage.setItem('carts',JSON.stringify(arr))
        countCartItem()
        
    }
    
    let row = event.target.closest('tr'); // Find the closest table row to the clicked button
    if (row) {
        row.remove(); // Remove the row from the table
    }
}

// Attach click event listeners to all delete buttons
deleteButtons.forEach(button => {
    button.addEventListener('click', handleDeleteClick);
});

});

