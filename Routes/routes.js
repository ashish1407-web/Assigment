const express = require('express');
const router = express.Router();


const adminController=require("../controller/adminController")
const userController=require("../controller/userController")

router.post("/admin/createBook",adminController.createBook)
router.put("/admin/updateBook/:bookId",adminController.updateBook);
router.get("/admin/fetchBook",adminController.fetchBookById);
router.delete("/admin/deleteBook/:bookId",adminController.deleteBook)
router.post("/registerUser",userController.registerUser)
router.post("/loginUser",userController.LoginUser)
router.put("/updateUser",userController.updateAddressByUser)
module.exports = router;