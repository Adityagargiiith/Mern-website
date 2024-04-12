const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
const e = require("express");
const employeemodel = require("./employee");
const multer = require("multer");
// const multer = require("multer");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/files", express.static("files"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// require("./pdfDetails");
const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" }
);
// const PdfSchema = mongoose.model("PdfDetails");
// require("./pdfDetails");

const PdfSchema = mongoose.model("PdfDetails", PdfDetailsSchema);
const upload = multer({ storage: storage });

// const upload = multer({ dest: "./files" });
app.post("/upload-files", upload.single("chimsFile2"), async (req, res) => {
  console.log(req.file);
  // res.send(req.file);
  const title = req.file.originalname;
  const pdf = req.file.filename;
  console.log(title);
  console.log(pdf);
  try {
    const pdfDetails = new PdfSchema({ pdf, title });
    await pdfDetails.save();
    res.status(201).send({ pdfDetailsId: pdfDetails._id, pdfDetails });
  } catch (error) {
    res.status(400).send;
  }
});
app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

// const app

mongoose.connect(
  "mongodb+srv://gargaditya2405:05dx9FW99PHBg2za@arkadatabase.6xgb4kx.mongodb.net/?retryWrites=true&w=majority&appName=ArkaDatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  employeemodel
    .findOne({ $or: [{ username: email }, { email: email }] })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.status(201).json(user);
        } else {
          res.status(210).json("the password is incorrect");
        }
      } else {
        res.status(210).json("User not found");
      }
    })
    .catch((error) => {
      console.error("Error in login:", error);
      res.status(500).json("An error occurred while logging in");
    });
});

const purchaseSchema = new mongoose.Schema({
  user: String,
  date: String,
  linkToPurchase: String,
  componentName: String,
  quantity: Number,
  chimsFile: String,
  quoteFile: String,
  project: String,
  team: String,
  pdfDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PdfDetails", // Referring to PdfDetailsSchema model
  },
  // chimsFiledata: String,
  // quoteFiledata: String,
  approval: { type: String, default: "Pending" },
  orderNo: { type: String, default: "" },
  billNo: { type: String, default: "" },
  trackingNo: { type: String, default: "" },
  description: { type: String, default: "" },
  grossamount: { type: String, default: "" },
  netamount: { type: String, default: "" },
  paidby: { type: String, default: "" },
  recipient: { type: String, default: "" },
  datepayment: { type: String, default: "" },

});

const Purchase = mongoose.model("Purchase", purchaseSchema);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// Handle form submission
app.post("/purchase", async (req, res) => {
  try {
    const { pdfDetailsId, remarks, ...purchaseData } = req.body;

    // Create a new Purchase document with the pdfDetails reference
    const purchase = new Purchase({
      ...purchaseData,
      pdfDetails: pdfDetailsId, // Pass the pdfDetailsId directly
      remarks,
    });
    await purchase.save();

    res.status(201).send(purchase);
  } catch (error) {
    res.status(400).send(error);
  }
});

// app.post("/purchase", async (req, res) => {
//   try {
//     const { pdfDetailsId, ...purchaseData } = req.body;

//     // Create a new Purchase document with the pdfDetails reference
//     const purchase = new Purchase({
//       ...purchaseData,
//       pdfDetails: pdfDetailsId,
//     });
//     await  purchase.save();

//     res.status(201).send(purchase);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
app.get("/purchase", async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("pdfDetails");
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", (req, res) => {
  employeemodel
    .create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


app.put("/purchase/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { orderNo, approval, billNo, trackingNo,description,grossamount,netamount,paidby,recipient,datepayment } = req.body;

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      id,
      {
        orderNo,
        approval,
        billNo,
        trackingNo,
        description,
        grossamount,
        netamount,
        paidby,
        recipient,
        datepayment,
      },
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(updatedPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
