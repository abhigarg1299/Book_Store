import { user } from "../models/user.js";

//add book to faviourite
//delete book from faviourite

export const addBookToFavourite = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    console.log(bookid, id);
    const userData = await user.findById(id);
    console.log(userData);
    const isBookFavourite = userData.favourites.includes(bookid);
    console.log(isBookFavourite);
    if (isBookFavourite) {
      return res.status(200).json({
        message: "Book is already in favourite",
      });
    }
    await user.findByIdAndUpdate(id, {
      $push: { favourites: bookid },
    });

    return res.status(200).json({
      message: "Book is added to favourites",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteBookFromFavourite = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    console.log(bookid, id);
    const userData = await user.findById(id);
    console.log(userData);
    const isBookFavourite = userData.favourites.includes(bookid);
    console.log(isBookFavourite);
    if (isBookFavourite) {
      await user.findByIdAndUpdate(id, {
        $pull: { favourites: bookid },
      });
    }
    return res.status(200).json({
      message: "Book is Removed from favourites",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getFavouriteBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    console.log(id);
    const userData = await user.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.status(200).json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
