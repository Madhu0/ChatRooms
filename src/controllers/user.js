const BaseController = require('./base');
const UserModel = require('../models').User;
const UserDao = require('../dao/user');
const ApiError = require('../error');

class UserController extends BaseController {
  constructor(req, res) {
    super(req, res);
  }

  createUser() {
    // console.log('body', this.req.body, typeof this.req.body);
    // const userDetails = JSON.parse(this.req.body);
    const newUser = new UserModel(this.req.body);
    try {
      UserDao.createUser(newUser, (err, res) => {
        if (err) {
          throw new ApiError(err);
        }
      });
      const user = this.find(newUser);
      this.sendAsJson(user, 200);
    } catch (err) {
      this.sendAsJson(err, 401);
    }
  }
}

module.exports = UserController;