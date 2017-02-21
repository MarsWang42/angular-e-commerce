angular
  .module('app.admin', [])
  .controller('AdminController', ['Product', AdminController]);

function AdminController(Product) {
  var admin         = this;
  admin.productData = {}; // the object to hold the data from our form
  admin.uploadFiles = uploadFiles;

  // bind the create product function to the controller
  admin.createProduct = createProduct;

  /**
   * Get all the product categories so we can show them in our form
   */
  Product.getCategories()
    .then(function(results) {
      admin.categories = results.data;
    });

  /**
   * Create a new product
   */
  function createProduct() {
    console.log(admin.productData)
    Product.create(admin.productData) 
      .then(function(data) {
        // clear the form
        admin.productData = {};

        // show a message that the product was successfully created
        // show a link to view that product
        admin.successMessage = 'Product created!';
        admin.newProductId   = data._id;
        admin.newProductName = data.name;
      });
  }

  /**
   * Loop over the files being uploaded, save them to Stamplay
   * Store the ids into admin.productData.pictures
   */
  function uploadFiles(files) {
    // use our product service to pass the files to Stamplay
    console.log(files)
    Product.createPicture(files)
      .then(function(data) {
        // add the pictures array to our productData
        admin.productData.pictures = data.pictures;
      });
  }

}
