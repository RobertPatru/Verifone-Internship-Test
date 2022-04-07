fetch('http://private-32dcc-products72.apiary-mock.com/product', {
    method: 'GET',
})
    .then(response => {
        // if the response is okay it means that the status is between 200 and 299
        // HTTP response codes 200 – 299 are good news: the request has been accepted, a new request has been created, or a certain problem was solved.
        if (response.ok) {
            console.log("SUCCESS");
        }
        else {
            console.log("NOT SUCCESSFUL");
        }

        return response.json();
    })
    .then(data => {
        let products = '';
  
        // sort the data in descending order by the price
        data.sort( (a, b) =>{
            return a.price - b.price;
        } );

        for (let i = 0; i < data.length; i++) {
            products += `
            <div class="product-container display-flex space-between padding-10">
                <h3 class="product-title">${data[i].name}</h3>
                <div class="price-container">Price: <span class="price">$${data[i].price}</span></div>
                <div class="add-to-cart-button display-flex">
                    <i class="fas fa-regular fa-cart-arrow-down fa-1x"></i>
                    <span>Add to cart</span>
                </div>
            </div>
            `; 
        }
  

        document.querySelector('.products-section').innerHTML = products;
    })
    .catch(error => console.log('ERROR'));


// Since the add to cart button are added in the DOM through JS. I will do this instead selecting every button:
document.body.addEventListener('click', verifyElement);

function verifyElement(element) {
    // if the element clicked contains "X" class then do something
    // I aded the "else" because inside the buttons we have a span and icon and they don't have the add-to-cart-buttotn class

    if (element.target.classList.contains('add-to-cart-button')) {
        // this long sibling thing will return the product name
        addToCart(element.target.previousSibling.previousSibling.previousSibling.previousSibling)
    }
    else if (element.target.parentElement.classList.contains('add-to-cart-button')) {
        // I know that this looks ridiculous but I don't have a lot of time to think
        addToCart(element.target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling)
    }
}

function addToCart(productName) {
    productName.parentElement.remove();
    
    // create the div that will be the container for the new element added into the card
    let product = document.createElement('div');

    // add classes for the newly created div
    product.classList.add('product-container-in-cart', 'display-flex', 'space-between', 'item');

    
    product.innerHTML = `
        <h3 class="product-name">${productName.textContent}
        <span class="info-sign"> &#128712;
            <div class="short-descripton-about-product display-flex padding-10">
                <p>This is a short description about this awesome product that appear only on hover.</p>
            </div>
        </span>
        </h3>
        <input type="number" name="quantity" class="product-qunatity" value="1">
        <h3 class="value">$${productName.nextSibling.nextSibling.children[0].innerText.replace('$', '')}</h3>
    `;
     

    document.querySelector('.col-product-info').append(product);

   // update the price when add to cart is pressed
    updatePrice();  
}

// update the price
function updatePrice () {
    const itemsElements = document.querySelectorAll('.item');
    const quantityElements = document.querySelectorAll('.product-qunatity');
    const priceElements = document.querySelectorAll('.value');
    
    // ##########################################################

    let totalSum = 0;

    // calucate the total by multiplying the price and qunnatity of each element in cart and then suming them togheter
    for (let i = 0; i < itemsElements.length; i++) {
        let price = parseFloat(priceElements[i].innerText.replace('$', ''));
        totalSum += parseFloat(quantityElements[i].value) * price;
    }

    document.querySelector('.total-value').innerHTML = `$ ${totalSum.toFixed(2)}`;
}

// when the quantity of a product is changed fire up updatePrice function
document.body.addEventListener('change', (event) => {
    if (event.target.classList.contains('product-qunatity')) {
        updatePrice();
    }
});


// when the quantity of a product is changed to zero, the product is removed from the card and added to the item list
document.body.addEventListener('change', (event) => {
    if (event.target.classList.contains('product-qunatity') && event.target.value < 1) {

         // create the div that will be the container for the new element added into the card
        let product = document.createElement('div');
        product.classList.add('product-container', 'display-flex', 'space-between', 'padding-10')

        // create the element
        product.innerHTML = `
       
                <h3 class="product-title">${event.target.previousSibling.previousSibling.innerText}</h3>
                <div class="price-container">Price: <span class="price">${event.target.nextSibling.nextSibling.innerText.replace(' ', '')}</span></div>
                <div class="add-to-cart-button display-flex">
                    <i class="fas fa-regular fa-cart-arrow-down fa-1x"></i>
                    <span>Add to cart</span>
                </div>
          
        `; 

        // append the element into the item list
        document.querySelector('.products-section').append(product);

        // remove the element from the cart
         event.target.parentElement.remove();
    }  
});