const express = require('express');
const router = express.Router();


const adminController=require("../controller/adminController")

router.post("/admin/createBook",adminController.createBook)
router.put("/admin/updateBook",adminController.updateBook);
router.get("/admin/fetchBook",adminController.fetchBookById);
router.delete("/admin/deleteBook",adminController.deleteBook)
module.exports = router;