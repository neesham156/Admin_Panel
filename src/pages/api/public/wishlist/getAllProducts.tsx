import { authVerifyHandler } from "database";
import Wishlist from "models/Wishlist";
import mongoose from "mongoose";

const handler = authVerifyHandler();
handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Wishlist.aggregate([
    {
      $match: {
        rId: new mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "products",
        let: { products: "$products" },
        pipeline: [{ $match: { $expr: { $in: ["$_id", "$$products"] } } }],
        as: "productsDetail",
      },
    },
    {
      $project: {
        _id: 1,
        rId: 1,
        productsDetail: 1,
        products: 1,
      },
    },
  ])
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", wishlist: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", wishlist: err });
    });
});
export default handler;
