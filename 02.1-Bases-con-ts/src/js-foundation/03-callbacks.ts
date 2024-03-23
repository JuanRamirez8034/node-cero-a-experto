export interface User {
  id: number;
  name: string;
}

const users: Array<User> = [
  {
    id: 1,
    name: "User number one",
  },
  {
    id: 2,
    name: "User number two",
  }
];


export function getUserById(id:number, callBack: (err?:string, user?:User)=>void): void{
  const user = users.find(function(user){
    return user.id === id
  });

  if(!user){
    return callBack(`User with id ${id} no found`);
  }

  callBack(undefined, user);
}