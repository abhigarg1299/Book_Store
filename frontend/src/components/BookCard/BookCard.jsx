import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function BookCard({ Data, favourite }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: Data._id,
  };
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://127.0.0.1:1000/api/v1/favourite/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${Data._id}`}>
        <div className="">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={Data.url} alt="/" className="h-[25vh]"></img>
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">
            {Data.title}
          </h2>
          <p className="mt-4 text-zinc-400 font-semibold-400 ">
            {" "}
            by {Data.author}
          </p>
          <p className="mt-4  text-zinc-200 font-semibold-200 text-xl">
            Rs. {Data.price}
          </p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 ,t-4"
          onClick={handleRemoveBook}
        >
          Remove From Favvourite
        </button>
      )}
    </div>
  );
}

export default BookCard;
