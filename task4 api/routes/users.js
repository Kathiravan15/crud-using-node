import Express from "express";
import { getUsers, createUsers ,getUser ,deleteUser, putUser} from "../controllers/users.js";

const userRoutes = Express.Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/user", createUsers);
userRoutes.get("/user/:id", getUser);
userRoutes.delete("/user/:id",deleteUser)
userRoutes.put("/user/:id",putUser)


export default userRoutes;
