import { authVerifyHandler } from "database";
import Wishlist from "models/Wishlist";
import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  const wishlist = new Wishlist({ rId: _id });
  wishlist
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", wishlist: wishlist });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", wishlist: err });
    });
});

handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Wishlist.findOne({ rId: _id })
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", wishlist: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", wishlist: err });
    });
});

handler.put(async (req: any, res: any) => {
  let { _id } = req.headers;
  await Wishlist.findOneAndUpdate(
    { rId: new mongoose.Types.ObjectId(_id) },
    req.body,
    { returnOriginal: false }
  )
    .then((result) => {
      res.status(200).json({ success: "Record Updated.", wishlist: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", wishlist: err });
    });
});
handler.delete(async (req: any, res: any) => {
  // console.log(req.query)
  await Wishlist.deleteOne({ _id: req.query._id })
    .then((result: any) => {
      res.status(200).json({ success: "Record Deleted.", wishlist: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", wishlist: err });
    });
});
export default handler;
