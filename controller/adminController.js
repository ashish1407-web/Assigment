const bookSchema = require('../Schema/bookSchema')
const createBook = async function (req, res) {
        try{
        let bookDetails=req.body
        if (!bookDetails.bookName) { return res.status(400).send({ status: false, message: "bookName is required" }) }
    
        if (!bookDetails.authorName) { return res.status(400).send({ status: false, message: "authorName is required" }) }
        
        if (!bookDetails.price) { return res.status(400).send({ status: false, message: "price is required" }) }
      
        if(!bookDetails.description) {return res.status(400).send({status:false,message:"Description is required"})}

        //if (typeof college.isDeleted !== " boolean") { return res.status(400).send({ status: false, message: "value must be in boolean" }) } 
        let bookCreated = await bookSchema.create(bookDetails)
       return res.status(201).send({ status:true,data: bookCreated })
    }catch (error){
        console.log(error.message)
        res.status(500).send(error.message)
    
    }
}
const fetchBookById = async function (req, res) {

    try {
        const queryParams = req.query
        const {
            bookId
        } = queryParams
        if (bookId) {
            if (!(bookId.length == 24)) {
                return res.status(400).send({ status: false, message: "Invalid bookId" })
            }
        }

            const books = await bookSchema.find({_id:bookId}).select({_id:0})

            if (books.length == 0) {
                return res.status(404).send({ status: false, message: "No books found" });
            } else {
                res.status(200).send({
                    status: true,
                    message: "book found",
                    data: books
                })
            }
        }
        catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}
const updateBook=async function(req,res){
    try{
    const params = req.params.bookId
    const requestUpdateBody = req.body
    console.log(params)
    const {bookName,authorName,price,description } = requestUpdateBody;
    const searchBook = await bookSchema.findById({
        _id: params,
    })
    if (!searchBook) {
        return res.status(404).send({ status: false, message: `Book does not exist by this ${params}.` })
    }
    if (searchBook.isDeleted == false) {
        const changeDetails = await bookSchema.findOneAndUpdate({ _id: params }, { bookName:bookName, authorName: authorName, price:price,description:description}, { new: true })

        res.status(200).send({ status: true, message: "Successfully updated book details.", data: changeDetails })
    } else {
        return res.status(400).send({ status: false, message: "Unable to update details.Book has been already deleted" })
    }
} catch (err) {
    return res.status(500).send({ status: false, Error: err.message })
}
}
const deleteBook=async function(req,res){
    try{
    const params = req.params.bookId
    const searchBook = await bookSchema.findById({
        _id: params,
    })
    if (!searchBook) {
        return res.status(404).send({ status: false, message: `Book does not exist by this ${params}.` })
    }
    if (searchBook.isDeleted == false) {
        const changeDetails = await bookSchema.findOneAndUpdate({ _id: params }, { isDelete:true}, { new: true })

        res.status(200).send({ status: true, message: "Successfully book deleted successfully."})
    } else {
        return res.status(400).send({ status: false, message: "Unable to find the Book for delete operation" })
    }
} catch (err) {
    return res.status(500).send({ status: false, Error: err.message })
}
}
module.exports={createBook,fetchBookById,updateBook,deleteBook}









