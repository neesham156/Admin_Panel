import { authVerifyHandler } from "database";
import Broadcast from "models/Broadcast";

const handler = authVerifyHandler();

handler.get(async (req: any, res: any) => {
  Broadcast.find({})
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", broadcast: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", broadcast: err });
    });
});

export default handler;
