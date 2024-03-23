import { User } from "./03-callbacks";

export const users : User[] = [
  {
    id: 1,
    name: "User number one",
  },
  {
    id: 2,
    name: "User number two",
  }
];


export const getUserById = (id:number, callBack:(err?:string, user?:User)=>void) => {
  const user = users.find(user => user.id === id);
  (!user)
    ? callBack(`User with id ${id} no found`)
    : callBack(undefined, user);
}