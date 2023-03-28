import { authVerifyHandler } from "database";
import Cart from "models/Cart";
import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.put(async (req: any, res: any) => {
  let { _id } = req.headers;
  await Cart.findOneAndUpdate(
    {
      rId: new mongoose.Types.ObjectId(_id),
      "cartItems.pId": req.body.pId,
      "cartItems.vId": req.body.vId,
    },
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

export default handler;
