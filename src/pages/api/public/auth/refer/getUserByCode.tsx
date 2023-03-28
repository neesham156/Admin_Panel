import createHandler from "database";
import Retailer from "models/Booking";
const handler = createHandler();
handler.post(async (req: any, res: any) => {
  Retailer.findOne(req.body, { _id: 1 })
    .then((result: any) => {
      res.status(201).json({ success: "Record Found.", record: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", record: err });
    });
});

export default handler;
