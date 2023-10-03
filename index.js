import path from "path";
import express from "express";
import { fileURLToPath } from "url";
const app = express();
const PORT = 3000;
express.json([]);
app.get("/", (req, res) => {
  res.send("GET Request Called");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/image/:id", function (req, res, next) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  var options = {
    root: path.join(__dirname, "public"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  var fileName = req.params.id + ".png";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});
