const users = [
  {
    id: 1,
    name: "User number one",
  },
  {
    id: 2,
    name: "User number two",
  }
];


const getUserById = (id, callBack) => {
  const user = users.find(user => user.id === id);
  (!user)
    ? callBack(`User with id ${id} no found`)
    : callBack(null, user);
}


module.exports = {
  getUserById
}