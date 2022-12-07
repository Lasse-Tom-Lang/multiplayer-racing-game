import express from "express"
const app = express()
import { v4 as uuidv4 } from 'uuid';

app.listen(80, () => {
  console.log("Server listens on port 80")
})

app.get("/createRoom", (req, res) => {
  res.json({id: uuidv4()})
  res.end()
})