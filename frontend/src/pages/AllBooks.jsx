import React from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";
function AllBooks() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-store-backend-zkn3.onrender.com/api/v1/book/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 h-screen px-12 my-8 mt-0 mb-0">
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols -3 md:grid-cols-4 gap-4 mb-2">
        {data &&
          data.map((items, i) => (
            <div key={i}>
              <BookCard Data={items} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllBooks;
