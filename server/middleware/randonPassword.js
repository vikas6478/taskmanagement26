const randomPassword = () => {
  let pass = "";
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%_-";

  for (let i = 0; i < 8; i++) {
    let randno = Math.floor(Math.random() * str.length);
    pass += str.charAt(randno);
  }

  return pass;
};

module.exports = {
  randomPassword,
};
