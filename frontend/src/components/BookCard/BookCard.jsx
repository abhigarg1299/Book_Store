import React from "react";
import { Link } from "react-router-dom";

function BookCard({ Data }) {
  console.log(Data);
  return (
    <>
      <Link to={`/view-book-details/${Data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={Data.url} alt="/" className="h-[25vh]"></img>
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">
            {Data.title}
          </h2>
          <h2 className="mt-4 text-zinc-400 font-semibold-400 ">
            {" "}
            by {Data.author}
          </h2>
          <h2 className="mt-4  text-zinc-200 font-semibold-200 text-xl">
            Rs. {Data.price}
          </h2>
        </div>
      </Link>
    </>
  );
}

export default BookCard;
