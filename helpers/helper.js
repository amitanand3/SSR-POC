let selectedProds = [];

function addToCart(ctx) {
    ctx = ctx.root.products[ctx.index];

    if (!selectedProds.length) {
        selectedProds.push(ctx);
    } else {
        let itemExists = false;
        selectedProds.forEach((item) => {
            if (item.name === ctx.name) {
                item.qty = ++item.qty;
                itemExists = true;
            }
        });

        if (!itemExists) selectedProds.push(ctx);
    }
}

function goToCart() {
    fetch('/postCart', {
        method: 'POST',
        body: JSON.stringify({
            selectedProds
        })
    }).then(() => {
        window.location = '/cart';
    });
}

function removeFromCart(ctx) {
    selectedProds = (selectedProds.length && selectedProds) || (ctx.root.selectedProds);
    selectedProds.splice(ctx.index, 1);
    goToCart();
}

function purchase() {
    alert("Hurray!! you have succesfully purchased items.");
    window.location = "/";
}