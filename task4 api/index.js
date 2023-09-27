import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import  userRoutes  from "./routes/users.js"; // Import named export

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/", userRoutes);

app.get("/", (req, res) => {
  try {
    res.send("Hello Express");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.all("*", (req, res) => res.send("This route is an error"));

app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
 