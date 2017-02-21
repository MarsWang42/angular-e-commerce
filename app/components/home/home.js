angular
  .module('app.home', [])
  .controller('HomeController', ['Product', HomeController]);

function HomeController(Product) {
  var home = this;

  // get all the products here
  Product.all()
    .then(function(products) {
      home.products = products.data;
    });
}
