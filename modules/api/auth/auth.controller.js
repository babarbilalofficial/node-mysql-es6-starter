import STATUS from "../../status.codes";
import logger from "../../logger";
import config from "../../../config";
import Users from "../users/users.model";
import Utils from "../../utils";

let controller = {};

let makeVerifyLink = (length) => {
  var str = "123456789abcdefghijklmonpqrstuvwxyz";
  var link = "";
  for (var i = 0; i < length; i++) {
    link = link + str[Math.round(Math.random() * str.length - 1)];
  }
  link = link + "-" + new Date().getTime();
  return link;
}

// Login api controller
controller.login = async (req, res) => {
  let user = await Users.getUserByLogin(req.body.username);
  if (user) {
    Utils.comparePassword(req.body.password, user.password, (err, matched) => {
      if (matched) {
        delete user.password;
        user.token = Utils.createToken(user, req);
        res.json(user);
      } else {
        res.status(STATUS.UNAUTHORIZED).json({
          msg: "Invalid password!"
        });
      }
    });
  } else {
    res.status(STATUS.UNAUTHORIZED).json({
      msg: "Invalid username!"
    });
  }
};

// reset password api controller
controller.resetPassword = async (req, res) => {
 
};

// Confirm email api controller
controller.confirmEmail = async (req, res) => {
  
};

// Create account api controller
controller.createAccount = async (req, res) => {
  if(req.body) {
    let user = await Users.getUserByLoginOrEmail(req.body.username, req.body.email);
    if (!user.length) {
      req.body.password = req.body.password ? req.body.password : "";
      Utils.encryptPassword(req.body.password, async (err, hash) => {
        req.body.password = hash;
        let newUser = await Users.createUser(req.body);
        delete newUser.password;
        newUser.token = Utils.createToken(newUser, req);
        res.json(newUser);
      });
    } else {
      res.status(STATUS.BAD_REQUEST).json({
        msg: "Username or email already exists"
      });
    }
  } else {
    res.status(STATUS.BAD_REQUEST).send();
  }
};

// Forgot password api controller
controller.forgotPassword = async (req, res) => {
  
};


export default controller;
