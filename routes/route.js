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
                    title: 'Welcome to SSR POC',
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
            cart = cart && JSON.parse(cart);
            return h.view('cart', cart);
        }
    }
];