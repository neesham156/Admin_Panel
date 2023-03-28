import { authVerifyHandler } from "database";
import Refer from "models/Refer";
const handler = authVerifyHandler();

handler.post(async (req: any, res: any) => {
  let { _id } = req.headers;
  const refer = new Refer({ referred: _id, ...req.body });
  refer
    .save()
    .then((result: any) => {
      res.status(201).json({ success: "Record Created.", refer: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", refer: err });
    });
});
export default handler;
