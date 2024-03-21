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


function getUserById(id, callBack){
  const user = users.find(function(user){
    return user.id === id
  });

  if(!user){
    return callBack(`User with id ${id} no found`);
  }

  callBack(null, user);
}


module.exports = {
  getUserById
}