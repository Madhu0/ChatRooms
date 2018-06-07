class User {
  constructor({ name, avatar, id, email }) {
    this.name = name;
    this.avatar = avatar;
    this.email = email;
    if (id) {
      this.id = id;
    } else {
      // create a new id
    }
  }

  get(key) {
    return this[key];
  }
}

class Group {
  constructor({ name, avatar, id, members }) {
    this.name = name;
    this.avatar = avatar;
    if (id) {
      this.id = id;
    } else {
      // create new id
    }
  }

  get(key) {
    return this[key];
  }
}

module.exports = { User, Group };