module.exports = _ => {
  let passnum = 100

  return {
    check: function(num, cb) {
      if (passnum === parseInt(num)) {
        passnum = passnum + (passnum / 2);
        cb(null)
      } else {
        cb(true)
      }
    }
  }
}