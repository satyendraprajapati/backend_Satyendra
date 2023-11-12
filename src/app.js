import express, { text } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public  "));

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

export default app;
