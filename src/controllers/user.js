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
    try {
      UserDao.createUser(newUser, (err, res) => {
        if (err) {
          throw new ApiError(err);
        }
        console.log(res);
        this.sendAsJson(newUser, 200);
      });
      // const user = this.getUser(newUser);
    } catch (err) {
      console.log(err);
      this.sendAsJson(err, 400);
    }
  }

  getUser() {
    try {
      const queryObj = getQueryParamsFromUrl(this.req.url);
      UserDao.getUser(queryObj, (resp, err) => {
        if (err) throw err;
        console.log('in getUser', resp);
        this.sendAsJson(resp, 200);
      });
    } catch(exec) {
      console.log(exec);
      this.sendAsJson(exec, 500);
    }
  }
}

module.exports = UserController;