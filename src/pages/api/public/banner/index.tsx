import { authVerifyHandler } from "database";
import Banner from "models/Banner";

const handler = authVerifyHandler();

handler.get(async (req: any, res: any) => {
  Banner.find({ active: true })
    .then((result: any) => {
      res.status(201).json({ success: "Record found.", banners: result });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", banners: err });
    });
});
export default handler;
