let cart = [];

module.exports = [
    {  
        method: 'GET',
        path: '/css/{file*}',
        handler: {
          directory: { 
            path: 'css'
          }
        }
    },
    {  
        method: 'GET',
        path: '/helpers/{file*}',
        handler: {
            directory: {
                path: 'helpers'
            }
        }
    },
    {
        path: '/',
        method: 'GET',
        handler: {
            view: {
                template: 'index',
                context: {
                    title: `<h2>Welcome to SSR POC</h2> <p>This Project is basically designed to practice on SSR using
                    hapi and handlebar. with help of this project you will be able to view list of products
                    add them to cart and finally checkout.</p>`,
                    message: '<a href="/products">View Products</a>'
                }
            }
        }
    },
    {
        path: '/products',
        method: 'GET',
        handler: (req, h) => {
            let context= require('./../data/products');
            return h.view('products', context);
        }
    },
    {
        path: '/postCart',
        method: 'POST',
        handler: (req) => {
            cart = req.payload;  
            return cart;
        }
    },
    {
        path: '/cart',
        method: 'GET',
        handler: (req, h) => {
            cart = cart || [];
            return h.view('cart', JSON.parse(cart));
        }
    }
];