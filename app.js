// This is a copy of the date received through API
let dataCopy = [];

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

        // just copy all the information from data to dataCopy
        // I made this decision so I will be able to search throgh the dataCopy when I add an item in the cart
        for (let i = 0; i < data.length; i++) {
            dataCopy[i] = data[i];
        }
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
    product.classList.add('product-container-in-cart', 'display-flex', 'space-between');


    // loop through the dataCopy and when the product clicked is found add it in the cart
    for (let i = 0; i < dataCopy.length; i++) {
        if (dataCopy[i].name == productName.textContent) {
          
            product.innerHTML = `
                <h3 class="product-name">${dataCopy[i].name}
                <span class="info-sign"> &#128712;
                    <div class="short-descripton-about-product display-flex padding-10">
                        <p>This is a short description about this awesome product that appear only on hover.</p>
                    </div>
                </span>
                </h3>

                <input type="number" name="quantity" id="product-qunatit" value="1">
                <h3 class="value">$${dataCopy[i].price}.00</h3>
            `;
        }
    }

    document.querySelector('.col-product-info').append(product);
}