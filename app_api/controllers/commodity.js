var mongoose = require('mongoose');
var Product = mongoose.model('Product');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

 module.exports.createProduct = function(req, res){
     if(!req.body.clientName || !req.body.name || !req.body.quantity ||
        !req.body.description || !req.body.price){
            sendJsonResponse(res, 404, {
                "message" : "All fields required when creating a product"  
              });
              return;
        }
        Product.create({
            clientName: req.body.clientName,
            name: req.body.name,
            quantity: req.body.quantity,
            description: req.body.description,
            price: req.body.price
            
        }, function(err, product){
            if(err){
                sendJsonResponse(res, 404, err);
            }
            else{
                sendJsonResponse(res, 201, product);
            }
        })    
 }

 module.exports.productByFarmer = function(req, res){
     var email = req.query.email;
     if(!email){
        sendJsonResponse(res, 404, {"message":"email is required"});
     }
     else{
         Product
            .find({clientName:{$elemMatch:{email}}})
            .exec(function(err, product){
                if(!product){
                    sendJsonResponse(res, 404, {"message":"You dont have any products"});
                }
                else if(err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                else{
                    sendJsonResponse(res, 200, product); 
                    console.log(product);
                }
            })
     }

 }

 module.exports.allProducts = function(req, res){
      Product
        .find({})
        .exec(function(err, product){
            if(!product){
                sendJsonResponse(res, 404, {"message":"no products available"});
            }
            else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            else{
                sendJsonResponse(res, 200, product); 
                console.log(product);
            }
        })
 }

 module.exports.productReadOne = function(req, res){
     if(req.params && req.params.productid){
         Product
          .findById(req.params.productid)
          .exec(function(err, product){
              if(!product){
                  sendJsonResponse(res, 404,{"message":"product not found"});

              }
              else if(err){
                  sendJsonResponse(res, 404, err);
                  return;
              }
              sendJsonResponse(res, 200, product);
          })
     }
     else{
         sendJsonResponse(res, 404, {"message":"no product id in request"});
     }
 }

 module.exports.updateProduct = function(req, res){
     if(!req.params.productid){
        sendJsonResponse(res, 404, {"message" : "Not found, productid is required"}); 
        return;  
     }
     Product
       .findById(req.params.productid)
       .exec(
           function(err, product){
               if(!product){
                sendJsonResponse(res, 404,{"message" : "product not found"}); 
               } else if(err){
                   sendJsonResponse(res, 404, err);
                   return;
               }
               product.name = req.body.name;
               product.quantity = req.body.quantity;
               product.price = req.body.price;
               product.description = req.body.description;
               product.save(function(err, product){
                  if(err){
                    sendJsonResponse(res, 404, err);
                  }
                  else{
                  sendJsonResponse(res, 200, product);
                  }
               })
           }
       )

 }

 module.exports.deleteProduct = function(req, res){
     var productid = req.params.productid;
    // sendJsonResponse(res, 404, {"message":"we here kodi"});
    if(productid){
         Product
            .findByIdAndRemove(productid)
            .exec(
                function(err, product){
                    if(err){
                        sendJsonResponse(res, 404, err);
                    }
                    sendJsonResponse(res, 204, null);
                }
            )
     }else{
         sendJsonResponse(res, 404, {"message":"product id is required"});
     }
 }