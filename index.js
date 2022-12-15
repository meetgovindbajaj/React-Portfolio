const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path");
const PORT = 5000;
const { notFound, errorHandler } = require("./middlewares/error");
__dirname = path.resolve();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
require("./db/conn");
const info_router = require("./routers/Info");
const image_router = require("./routers/Image");
const project_router = require("./routers/Project");
const p = require("./utils/P");
const Time = require("./utils/time");

require("dotenv").config();
app.use(
  express.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(compression({
    level: 6,
    threshold: 0,
  }));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "no-referrer" },
  })
);
app.use(morgan("dev"));
app.use("/api/info", info_router);
app.use("/api/image", image_router);
app.use("/api/project", project_router);
app.use("/", (req, res) => {
  res.send("You Have Opened Govind Bajaj's Server");
});
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("public"));
//   app.get("*", function (request, response) {
//     response.set("Cache-Control", "public, max-age=300, s-maxage=600");
//     response.sendFile(path.resolve(__dirname, "public", "index.html"));
//   });
// }
app.use(notFound);
app.use(errorHandler);
app.get("*",(req,res)=>{
  res.set("Cache-Control","public,max-age=5256000,s-maxage=31536000")
})
app.listen(PORT, () => {
  p(
    `\n\n[ Node Server ]\n\nUrl\t: http://localhost:${PORT}\nTime\t: ${Time()}\n`
  );
});
