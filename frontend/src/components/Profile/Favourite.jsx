import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
function Favourite() {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://127.0.0.1:1000/api/v1/favourite/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);
  return (
    <>
      {FavouriteBooks.length === 0 && (
        <div className="text-5xl font-semibold h-[100%] justify-center text-zinc-500 flex items-center  w-full ">
          No Favourite Books
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard Data={items} favourite={true}></BookCard>
            </div>
          ))}
      </div>
    </>
  );
}

export default Favourite;
