import { authVerifyHandler } from "database";
import Feedback from "models/Feedback";

import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  const feedback = new Feedback({ dId: _id, ...req.body });
  feedback
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", feedback: feedback });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", feedback: err });
    });
});

handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Feedback.find({ dId: _id })
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", feedback: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", feedback: err });
    });
});

// handler.put(async (req: any, res: any) => {
//   let { _id } = req.headers;
//   await Feedback.findOneAndUpdate(
//     { rId: new mongoose.Types.ObjectId(_id) },
//     req.body,
//     { returnOriginal: false }
//   )
//     .then((result) => {
//       res.status(200).json({ success: "Record Updated.", wishlist: result });
//     })
//     .catch((err) => {
//       res.status(403).json({ error: "Something went wrong.", wishlist: err });
//     });
// });
// handler.delete(async (req: any, res: any) => {
//   // console.log(req.query)
//   await Feedback.deleteOne({ _id: req.query._id })
//     .then((result: any) => {
//       res.status(200).json({ success: "Record Deleted.", wishlist: result });
//     })
//     .catch((err) => {
//       res.status(403).json({ error: "Something went wrong.", wishlist: err });
//     });
// });
export default handler;
