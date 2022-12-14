import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

const publicPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(publicPath));

const URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5050;

console.log(URI);
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }); //db file

app.use(express.json());

app.get("/users", (req, res) => {
  res.send("testing");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
