let selectedProds = [];

function addToCart(ctx) {
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