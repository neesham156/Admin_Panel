import { authVerifyHandler } from "database";
import Category from "models/Category";

const handler = authVerifyHandler();
handler.get(async (req: any, res: any) => {
  Category.find()
    .then((result: any) => {
      res.status(201).json({ success: "Record Found", category: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", category: err });
    });
});
export default handler;
