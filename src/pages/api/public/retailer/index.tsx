import createHandler, { authVerifyHandler } from "database";
import Retailer from "models/Booking";
const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  // console.log(req.body);
  const retailer = new Retailer(req.body);
  retailer
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
handler.get(async (req: any, res: any) => {
  let { _id } = req.headers;
  Retailer.findOne({ _id: _id })
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});

handler.put(async (req: any, res: any) => {
  let { _id } = req.headers;

  await Retailer.updateOne({ _id: _id }, req.body, { returnOriginal: false })
    .then((result) => {
      res.status(200).json({ success: "Record Updated.", record: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
handler.delete(async (req: any, res: any) => {
  // console.log(req.query)
  await Retailer.deleteOne({ _id: req.query._id })
    .then((result: any) => {
      res.status(200).json({ success: "Record Deleted.", record: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
export default handler;
