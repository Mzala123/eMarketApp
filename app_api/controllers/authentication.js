var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
 };

 
 module.exports.register = function(req, res){
    if(!req.body.name || !req.body.email || !req.body.phonenumber || !req.body.userRole 
        || !req.body.password){
        sendJsonResponse(res, 404, {
          "message" : "All fields required"  
        });
        return;
    }
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.phonenumber = req.body.phonenumber;
    user.userRole = req.body.userRole;


    user.setPassword(req.body.password);

    user.save(function(err){
        var token;
        if(err){
            sendJsonResponse(res, 404, err);
        }
        else{
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token" : token
            })
        }
    })
}



module.exports.login = function(req, res){
   // var user = new User();
    if(!req.body.email || !req.body.password || req.body.userRole){
        sendJsonResponse(res, 404, {
            "message" : "All fields required!"
        });
        return;
    }
    passport.authenticate('local', function(err, user, info){
      var token;
      if(err){
          sendJsonResponse(res, 404, err);
          return;
      }

      if(user){
         token = user.generateJwt();
         sendJsonResponse(res, 200, {
             "token" : token
         });
      }
      else{
          sendJsonResponse(res, 401, info);
      }
    })(req, res);
}

module.exports.loginByRole = function(req, res){
        var email = req.query.email;
        if(!email){
            sendJsonResponse(res, 404, {"message":"email is required"});
        }
        else{
            User
              .find({email:email})
             // .select('-_id -name -email -phonenumber -salt -hash -__v')
              .exec(function(err, user){
                if(!user){
                    sendJsonResponse(res, 404, {"message":"no such user account available"});
                }
                else if(err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, user);

                console.log(user);
              })

        }
}


