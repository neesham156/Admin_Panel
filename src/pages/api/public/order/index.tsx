import { authVerifyHandler } from "database";
import Order from "models/Order";
import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  const order = new Order({ rId: _id, ...req.body });
  order
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", order: order });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", order: err });
    });
});

handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Order.aggregate([
    {
      $match: req.query._id
        ? { _id: new mongoose.Types.ObjectId(req.query._id) }
        : { cId: new mongoose.Types.ObjectId(req.query.cId) },
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
      res.status(201).json({ success: "Record Found", order: result[0] });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", order: err });
    });
});

handler.put(async (req: any, res: any) => {
  await Order.findOneAndUpdate(
    { cId: new mongoose.Types.ObjectId(req.body.$set.cId) },
    req.body,
    { returnOriginal: false }
  )
    .then((result) => {
      res.status(200).json({ success: "Record Updated.", order: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", order: err });
    });
});
handler.delete(async (req: any, res: any) => {
  // console.log(req.query)
  await Order.deleteOne({ _id: req.query._id })
    .then((result: any) => {
      res.status(200).json({ success: "Record Deleted.", order: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", order: err });
    });
});
export default handler;
