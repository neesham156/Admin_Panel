import { authVerifyHandler } from "database";
import Cart from "models/Cart";
import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  const cart = new Cart({ rId: _id, ...req.body });
  cart
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", cart: cart });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", cart: err });
    });
});

handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  if (req.query.cId) {
    Cart.findOne({ cId: req.query.cId })
      .then((result: any) => {
        res.status(201).json({ success: "Record Found", cart: result });
      })
      .catch((err: any) => {
        res.status(403).json({ error: "Something went wrong.", cart: err });
      });
  } else
    Cart.findOne({ rId: _id })
      .then((result: any) => {
        res.status(201).json({ success: "Record Found", cart: result });
      })
      .catch((err: any) => {
        res.status(403).json({ error: "Something went wrong.", cart: err });
      });
});

handler.put(async (req: any, res: any) => {
  let { _id } = req.headers;
  await Cart.findOneAndUpdate(
    { rId: new mongoose.Types.ObjectId(_id) },
    req.body,
    { returnOriginal: false }
  )
    .then((result) => {
      res.status(200).json({ success: "Record Updated.", cart: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", cart: err });
    });
});
handler.delete(async (req: any, res: any) => {
  // console.log(req.query)
  await Cart.deleteOne({ _id: req.query.cId })
    .then((result: any) => {
      res.status(200).json({ success: "Record Deleted.", cart: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", cart: err });
    });
});
export default handler;
