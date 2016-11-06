var User = function() {}

User = function(username, password, email) {
  this.username = username
  this.password = password
  this.email = email
}

// User = function(obj) {
//   this.username = obj.username
//   this.password = obj.password
//   this.email = obj.email
// }

module.exports = new User()
