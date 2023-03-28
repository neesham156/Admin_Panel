import { authVerifyHandler } from "database";
import Product from "models/Product";
import Retailer from "models/Booking";
import mongoose from "mongoose";
const handler = authVerifyHandler();
handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  Retailer.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(_id) } },
    {
      $lookup: {
        from: "distributors",
        localField: "dId",
        foreignField: "_id",
        as: "dis",
      },
    },
    { $unwind: "$dis" },
    {
      $lookup: {
        from: "products",
        let: { product: "$dis.assign_product" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$product.pId"],
              },
            },
          },
          {
            $match: {
              $expr: {
                $eq: [
                  "$category",
                  new mongoose.Types.ObjectId(req.body.category),
                ],
              },
            },
          },
        ],
        as: "products",
      },
    },
    {
      $project: {
        _id: 0,
        products: 1,
      },
    },
  ])
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", products: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", category: err });
    });
});
export default handler;
