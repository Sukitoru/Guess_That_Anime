import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
