import createHandler from "database";
import Distributor from "models/Customer";

const handler = createHandler();

handler.get(async (req: any, res: any) => {
  let ret: any = await Distributor.findOne(req.query);
  var jwt = require("jsonwebtoken");
  const OTP = Math.floor(100000 + Math.random() * 900000);
  if (ret) {
    var token = jwt.sign(
      {
        email: req.query.email,
        _id: ret._id,
      },
      `${process.env.APP_SECRET}`
    );
    res.status(201).json({ success: "Success.", token: token, otp: OTP });
  } else {
    res.status(403).json({ message: "User not found.", token: ret });
  }
});

export default handler;
