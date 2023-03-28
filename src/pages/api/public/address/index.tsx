import { authVerifyHandler } from "database";
import Address from "models/Address";
import mongoose from "mongoose";

const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  const address = new Address({ rId: _id, ...req.body });
  address
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", address: address });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", address: err });
    });
});

handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Address.findOne({ rId: _id })
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", address: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", address: err });
    });
});

handler.put(async (req: any, res: any) => {
  let { _id } = req.headers;
  await Address.findOneAndUpdate(
    { rId: new mongoose.Types.ObjectId(_id) },
    req.body,
    { returnOriginal: false }
  )
    .then((result) => {
      res.status(200).json({ success: "Record Updated.", address: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", address: err });
    });
});
handler.delete(async (req: any, res: any) => {
  // console.log(req.query)
  await Address.deleteOne({ _id: req.query._id })
    .then((result: any) => {
      res.status(200).json({ success: "Record Deleted.", address: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", address: err });
    });
});
export default handler;
