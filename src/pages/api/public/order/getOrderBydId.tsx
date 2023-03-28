import { authVerifyHandler } from "database";
import Order from "models/Order";

import mongoose from "mongoose";

const handler = authVerifyHandler();
handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Order.aggregate([
    {
      $match: {
        dId: new mongoose.Types.ObjectId(_id),
        // status: "Placed",
        status: { $not: { $regex: "Pending" } },
      },
    },
    {
      $lookup: {
        from: "products",
        let: { products: "$product" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$products.pId"] },
            },
          },
        ],
        as: "productsDetail",
      },
    },

    {
      $project: {
        _id: 1,
        productsDetail: 1,
        product: 1,
        cId: 1,
        rId: 1,
        gst: 1,
        totalPrice: 1,
        status: 1,
        paymentMode: 1,
        statusHistory: 1,
        transactions: 1,
        updatedAt: 1,
        createdAt: 1,
      },
    },
  ])
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", order: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", order: err });
    });
});
export default handler;
