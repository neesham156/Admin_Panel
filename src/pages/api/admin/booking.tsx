import createHandler from "database";
import Booking from "models/Booking";

const handler = createHandler();

handler.post(async (req: any, res: any) => {
  console.log(req.body);
  const booking = new Booking(req.body);
  console.log(booking)
  booking
    .save()
    .then((result: any) => {
   
      res.status(201).json({ success: "Record Created.", record: result });
    })
    .catch((err: any) => {
     
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
handler.get(async (req: any, res: any) => {
  Booking.find({})
    .then((result: any) => {
      res.status(201).json({ success: "Success.", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});

handler.put(async (req: any, res: any) => {
  // console.log(req.body)
  await Booking.updateOne({ _id: req.body._id }, req.body)
    .then((result:any) => {
      res.status(200).json({ success: "Record Updated.", record: result });
    })
    .catch((err:any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
handler.delete(async (req: any, res: any) => {
  // console.log(req.query)
  await Booking.deleteOne({ _id: req.query._id })
    .then((result: any) => {
      res.status(200).json({ success: "Record Deleted.", record: result });
    })
    .catch((err:any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});
export default handler;
