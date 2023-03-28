import { authVerifyHandler } from "database";
import Cart from "models/Cart";
import mongoose from "mongoose";

const handler = authVerifyHandler();
handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Cart.aggregate([
    {
      $match: {
        rId: new mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "products",
        let: { products: "$cartItems" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$products.pId"] },
              // variant: { $elemMatch: { _id: "$$products.vId" } },
              // "variant.$": 1,
            },
          },
        ],
        as: "productsDetail",
      },
    },

    {
      $project: {
        _id: 1,
        rId: 1,
        dId: 1,
        productsDetail: 1,
        cartItems: 1,
      },
    },
  ])
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", cart: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", cart: err });
    });
});
export default handler;
