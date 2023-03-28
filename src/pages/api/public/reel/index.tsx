import { authVerifyHandler } from "database";
import Reel from "models/Reel";

const handler = authVerifyHandler();

handler.get(async (req: any, res: any) => {
  Reel.find({})
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", reels: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", reels: err });
    });
});
export default handler;
