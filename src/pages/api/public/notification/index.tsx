import { authVerifyHandler } from "database";
import Notification from "models/Notification";

const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  Notification.findOne(req.body)
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", notification: result });
    })
    .catch((err: any) => {
      res
        .status(403)
        .json({ error: "Something went wrong.", notification: err });
    });
});

export default handler;
