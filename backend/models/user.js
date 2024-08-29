import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      requires: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAACUCAMAAADxqtj8AAAAVFBMVEXu7u5mZmbx8fFgYGDU1NTGxsb09PRXV1fq6urZ2dltbW2KioqgoKD39/djY2NdXV21tbWUlJR3d3fMzMyEhIT9/f19fX3i4uJSUlJNTU2mpqaurq6VKd0XAAACX0lEQVR4nO3ZYXOiMBSFYUgQIioBxMLq//+fGwQtoWynE3bm3Oyed6ZfAOWZ9JKxNkkiTqEBu6IeF/W4qMdFPS7qcVGPi3pc1OOiHhf1uKjHRT0u6nFRj4t6XNTjoh4X9biox0U9LupxUY+LelzU46Ie1/+uV3lwu2++X2+uh9AyuF5l5VCE9aszcP2xPYWt/rU8CdCX51vQ1N+E6C9Br7xQv/cNqA+++c7X/0ivlHI/66OR6JU53M91v75VJPqksa6PbHWvOPSXe5G6bJuvjsegV0anz4arz49D31eT3tb+dXHojZ3X/hDH2ufe9njpnvxqWF0lVJ/fT2b5vn1ptdbVIYanVql6sM2Sr/pz1zXXOPb72g1K0SzfWam+T1YrL1Of13rcY6zH//ycsDgoUJ8/hnl/9Gd/vtgcP38F4vRu5ot0zp/96bRp0uzNl6efxubFX32udHit2zdfmt7Dp6n2Zz9RjXueq/Y1PML0+aNIvbzZV6p7nq7szBelH/f5dNVi9t3YzJ8YqnIaHln6Wq/xi41znPn3RE2zL0mf+zO/5qvXyk/8cXgE6dWj2MKPs+/+JFTJyS4PPmdfjH65z2/Mfm4a6x/UZabk6Otqe+Unft98eSTc7Ev5JvC2PfPvOSk3zurStDL0fx6bb9KliLVvPza2yh9UWRH6MLxbfRH672aeeur/Vf34fUdIAvacxByz0I577/0X/tOvwhOgB0Y9LupxUY+LelzU46IeF/W4qMdFPS7qcVGPi3pc1OOiHhf1uKjHRT0u6nFRj4t6XNTjoh4X9biox0U9rsj1vwF24yQ4vvhD6QAAAABJRU5ErkJggg==",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],

    order: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const user = mongoose.model("user", userSchema);
