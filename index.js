require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// إعداد الاتصال بقاعدة البيانات
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: "",
  database: "portfolio",
});

// الاتصال بقاعدة البيانات
db.connect((err) => {
  if (err) {
    console.error("خطأ في الاتصال بقاعدة البيانات:", err);
    return;
  }
  console.log("تم الاتصال بقاعدة البيانات بنجاح");
});

// إعداد middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.urlencoded({ extended: true }));

// إضافة middleware للتحقق من طلبات الصور
app.use((req, res, next) => {
  if (req.url.startsWith("/images/")) {
    console.log("Image request:", req.url); // للتحقق من طلبات الصور
  }
  next();
});

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// مسار API لإرسال الرسائل
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("خطأ في حفظ الرسالة:", err);
      res.status(500).json({ error: "حدث خطأ أثناء حفظ الرسالة" });
      return;
    }
    res.json({ success: true, message: "تم حفظ الرسالة بنجاح" });
  });
});

// مسار API لجلب المشاريع
app.get("/api/projects", (req, res) => {
  const query = "SELECT * FROM projects ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("خطأ في جلب المشاريع:", err);
      res.status(500).json({ error: "حدث خطأ أثناء جلب المشاريع" });
      return;
    }
    res.json(results);
  });
});

// مسار لعرض صور المشروع
app.get("/project-preview", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "project-preview.html"));
});

// مسار API لجلب تفاصيل المشروع
app.get("/api/project-images/:id", (req, res) => {
  const projectId = req.params.id;
  let images = [];

  switch (projectId) {
    case "1":
      images = ["images/coursepage.png"];
      break;
    case "2":
      images = [
        "images/2-2.png",
        "images/2-3.png",
        "images/2-4.png",
        "images/2-5.png",
      ];
      break;
    case "3":
      images = ["images/3-1.png"];
      break;
  }

  res.json({ images });
});

app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
