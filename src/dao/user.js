const BaseDao = require('./base');

class UserDao extends BaseDao {
  constructor() {
    super('Users');
  }

  createUser(userDetails, callback) {
    const user = this.find({ email: userDetails.email }, (err, res) => {
      if (err) {
        callback(err, null)
      }
      
      if (res.length === 0) {
        this.insert(userDetails, (err, res) => {
          if (err) {
            callback(err, null);
          }
        });
      } else {
        callback({ type: 'EMAIL_ALREADY_EXIST', code: 1, message: 'Email already regitered with user' }, null);
      }
    });
  }

  findUserByEmail(email) {
    const user = this.find({ email });
    // console.log('User', user);
    return user;
  }

  getUser(query, callback) {
    const user = this.find(query, (err, res) => {
      console.log(res, err);
      if (err || res.length !== 0) {
        callback(err, res);
      } else {
        callback({ type: 'EMAIL_DOESN\'T_EXIST', code: 1, message: 'User not found with given emailId' })
      }
    });
  }
}

const UserDaoObj = new UserDao();
module.exports = UserDaoObj;