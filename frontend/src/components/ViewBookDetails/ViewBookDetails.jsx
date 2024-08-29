import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function ViewBookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);
  const isloggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://127.0.0.1:1000/api/v1/book/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://127.0.0.1:1000/api/v1/favourite/add-book-to-faviourite",
      {},
      { headers }
    );

    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://127.0.0.1:1000/api/v1/cart/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const BookDelete = async () => {
    const response = await axios.delete(
      "http://127.0.0.1:1000/api/v1/book/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {Data && (
        <div className="  px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          <div className=" w-full lg:w-3/6 ">
            <div className=" flex flex-col lg:flex-row items-center justify-center bg-zinc-800 p-12">
              <img
                src={Data.url}
                alt="/"
                className="  h-[50vh] md:h-[60vh] lg:h-[70vh] rounded px-10"
              ></img>

              {isloggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 ">
                  <button
                    className="bg-white  rounded lg:rounded-full text-3xl  p-3 text-red-500 flex items-center justify-center"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>
                  <button
                    className="text-white mt-8 md:mt-0 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 bg-blue-500 text-blue-500 flex items-cente justify-center  "
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}

              {isloggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 ">
                  <Link
                    to={`/updateBook/${id}`}
                    className="bg-white  rounded lg:rounded-full text-4xl lg:text-3xl   p-3  flex items-center justify-center"
                  >
                    <FaEdit />
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </Link>
                  <button
                    className=" text-red-500 mt-8 md:mt-0 rounded lg:rounded-full text-4xl lg:text-3xl  p-3  lg:mt-8 bg-white  flex items-cente justify-center  "
                    onClick={BookDelete}
                  >
                    <MdDeleteOutline />
                    <span className="ms-4 block lg:hidden">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4  w-full lg:w-3/6 ">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1"> by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl"> {Data.desc}</p>
            <p className=" flex mt-4 items-center justify-start text-zinc-400 ">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: Rs{Data.price}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
}

export default ViewBookDetails;
