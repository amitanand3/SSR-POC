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
        path: '/',
        method: 'GET',
        handler: {
            view: {
                template: 'index',
                context: {
                    title: 'Using handlebars in Hapi',
                    message: 'Tutorial'
                }
            }
        }
    },
    {
        path: '/products',
        method: 'GET',
        handler: (req, h) => {
            var context= require('./../data/products');
            return h.view('products', context);
        }
    },
    {
        path: '/checkout',
        method: 'POST',
        handler: {
            view: {
                template: 'checkout',
                context: {
                    title: 'Using handlebars in Hapi',
                    message: 'Tutorial'
                }
            }
        }
    }
];