import { v4 as uuidv4 } from 'uuid';


let users = [];

export const getUsers = (req, res) => {
  res.send(users);
}

export const createUsers = (req, res) => {
  console.log('hi')
  const user = req.body;
  console.log('users', users);
  users.push({...user,id:uuidv4()});
  res.send("User sent successfully");
}

export const getUser =(req,res) => {
    const singleUser = users.filter((user)=>user.id===req.params.id)
    res.send(singleUser);
}


export const deleteUser=(req,res)=>{
    users= users.filter((user)=>user.id !==req.params.id)
    res.send("Delete Successfully!!!")
}

export const putUser=(req,res)=>{
    const user=user.find((user)=>user.id ===req.params.id)

    user.name =req.body.name;
    user.empid=req.body.empid;
    user.email=req.body.email;
    user.contact=req.body.contact;

    res.send("Updated Succefully___")

}