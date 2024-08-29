import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function UpdateBook() {
  const { id } = useParams();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: " ",
    title: " ",
    author: " ",
    price: " ",
    desc: " ",
    language: " ",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:1000/api/v1/book/update-book",
        Data,
        { headers }
      );
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
      console.log(response.data);
      alert(response.data.message);
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://127.0.0.1:1000/api/v1/book/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className=" bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          ></input>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          ></input>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          ></input>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            ></input>
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            ></input>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description of book
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="description of book"
            name="desc"
            required
            valye={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transistion-all duration-300"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
}

export default UpdateBook;
