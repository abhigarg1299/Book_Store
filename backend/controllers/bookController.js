import { books } from "../models/book.js";
import { user } from "../models/user.js";
export const addBook = async (req, res) => {
  try {
    const { id } = req.headers;
    console.log(id);

    const User = await user.findById(id);
    console.log(User);
    if (User.role !== "admin") {
      return res.status(400).json({
        message: "You do not have accesss to perform admin work",
      });
    }
    const book = new books({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    console.log(book);
    await book.save();
    return res.status(200).json({
      message: "Book Added Successfully",
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    console.log(bookid);
    const book = await books.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({
      message: "Book Updated SuccessFully",
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await books.findByIdAndDelete(bookid);
    return res.status(200).json({
      message: "Deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
