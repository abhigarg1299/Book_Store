import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
const RecentlyAdded = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://book-store-backend-zkn3.onrender.com/api/v1/book/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently added books</h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid   grid-cols-1 sm:grid-cols -3 md:grid-cols-4 gap-4">
        {data &&
          data.map((items, i) => (
            <div key={i}>
              <BookCard Data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
