const User = require('../models').User;
const BaseDao = require('./base');
const ApiError = require('../error');

class UserDao extends BaseDao {
  constructor() {
    super('Users');
  }

  createUser(userDetails, callback) {
    const user = this.find({ email: userDetails.email });
    console.log('user', user);
    if (user) {
      throw new ApiError({ type: 'EMAIL_ALREADY_EXIST', code: 1, message: 'Email already regitered with user' });
    }

    this.insert(userDetails, (err, res) => {
      if (err) {
        console.log('Error in creation');
        throw err;
      }
      callback(err, res);
      console.log('User created successfully');
    });
  }

  findUserByEmail(email) {
    const user = this.find({ email });
    console.log('User', user);
    return user;
  }
}

const UserDaoObj = new UserDao();
module.exports = UserDaoObj;