import createHandler from "database";
import Distributor from "models/Customer";

const handler = createHandler();

handler.post(async (req: any, res: any) => {
  // console.log(req.body);
  const distributor = new Distributor(req.body);
  distributor
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
handler.get(async (req: any, res: any) => {
  Distributor.find({})
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});

handler.put(async (req: any, res: any) => {
  // console.log(req.body)
  await Distributor.updateOne(
    { _id: req.body._id },
    {
      $set: req.body,
    }
  )
    .then((result) => {
      res.status(200).json({ success: "Record Updated.", record: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
handler.delete(async (req: any, res: any) => {
  // console.log(req.query)
  await Distributor.deleteOne({ _id: req.query._id })
    .then((result: any) => {
      res.status(200).json({ success: "Record Deleted.", record: result });
    })
    .catch((err) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
export default handler;
