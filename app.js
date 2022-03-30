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
  
        // arrage the data in descending order by the price
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