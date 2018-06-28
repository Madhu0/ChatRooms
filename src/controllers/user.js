const BaseController = require('./base');
const UserModel = require('../models').User;
const UserDao = require('../dao/user');
const ApiError = require('../error');
const getQueryParamsFromUrl = require('../helpers').getQueryParamsFromUrl;

class UserController extends BaseController {
  constructor(req, res) {
    super(req, res);
  }

  createUser() {
    // console.log('body', this.req.body, typeof this.req.body);
    // const userDetails = JSON.parse(this.req.body);
    const newUser = new UserModel(this.req.body);
    UserDao.createUser(newUser, (err, res) => {
      if (err) {
        this.sendAsJson(new ApiError(err), 400);
        return;
      }
      this.sendAsJson(newUser, 200);
    });
  }

  getUser() {
    const queryObj = getQueryParamsFromUrl(this.req.url);
    UserDao.getUser(queryObj, (err, res) => {
      if (err) {
        this.sendAsJson(new ApiError(err), 400);
        return;
      };
      this.sendAsJson(res, 200);
    });
  }
}

module.exports = UserController;