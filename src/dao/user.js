const User = require('../models').User;
const BaseDao = require('./base');
const ApiError = require('../error');

class UserDao extends BaseDao {
  constructor() {
    super('Users');
  }

  createUser(userDetails, callback) {
    const user = this.find({ email: userDetails.email }, (res, err) => {
      console.log('in create user', res, err);
      if (err) {
        throw err;
      }
      
      if (res.length === 0) {
        this.insert(userDetails, (err, res) => {
          if (err) {
            console.log('Error in creation');
            throw err;
          }
          callback(err, res);
          console.log('User created successfully');
        });
      } else {
        throw new ApiError({ type: 'EMAIL_ALREADY_EXIST', code: 1, message: 'Email already regitered with user' });
      }
    });
  }

  findUserByEmail(email) {
    const user = this.find({ email });
    // console.log('User', user);
    return user;
  }

  getUser(query, callback) {
    try{
      const user = this.find(query, callback);
      return user;
    } catch (e) {
      // log exception
      throw e;
    }
  }
}

const UserDaoObj = new UserDao();
module.exports = UserDaoObj;