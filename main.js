let cart = document.querySelectorAll('.add_to_cart');

for (let i=0; i < cart.length; i++){
    cart[i].addEventListener('click', ()=>{
        console.log("added to cart")
    })
}