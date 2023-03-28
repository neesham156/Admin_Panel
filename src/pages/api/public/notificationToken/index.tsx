import { authVerifyHandler } from "database";
import PushToken from "models/PushToken";

import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  const token = new PushToken({ uId: _id, ...req.body });
  token
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", token: token });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", token: token });
    });
});

handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  PushToken.findOne({ uId: _id })
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", token: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", token: err });
    });
});

handler.put(async (req: any, res: any) => {
  let { _id } = req.headers;
  await PushToken.findOneAndUpdate(
    { uId: new mongoose.Types.ObjectId(_id) },
    req.body,
    {
      returnOriginal: false,
    }
  )
    .then((result) => {
      res.status(200).json({ success: "Record Updated.", token: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", token: err });
    });
});
// handler.delete(async (req: any, res: any) => {
//   // console.log(req.query)
//   await pushToken
//     .deleteOne({ _id: req.query._id })
//     .then((result: any) => {
//       res.status(200).json({ success: "Record Deleted.", token: result });
//     })
//     .catch((err) => {
//       res.status(403).json({ error: "Something went wrong.", token: err });
//     });
// });
export default handler;
