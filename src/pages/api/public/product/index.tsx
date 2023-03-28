import { authVerifyHandler } from "database";
import Product from "models/Product";
import Retailer from "models/Booking";
import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;

  if (req.query._id) {
    Product.findOne(req.query)
      .then((result: any) => {
        res.status(201).json({ success: "Success.", record: result });
      })
      .catch((err: any) => {
        res.status(403).json({ error: "Something went wrong.", record: err });
      });
  } else
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
                $expr: { $in: ["$_id", "$$product.pId"] },
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
        res.status(201).json({ success: "Success.", record: result });
      })
      .catch((err: any) => {
        res.status(403).json({ error: "Something went wrong.", record: err });
      });
});
export default handler;
