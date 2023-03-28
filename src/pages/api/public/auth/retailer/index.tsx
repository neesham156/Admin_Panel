import createHandler from "database";
import Distributor from "models/Customer";
import Retailer from "models/Booking";
import { getDistance, isPointWithinRadius } from "geolib";
const handler = createHandler();

handler.get(async (req: any, res: any) => {
  let ret: any = await Retailer.findOne(req.query);
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
handler.post(async (req: any, res: any) => {
  var jwt = require("jsonwebtoken");
  var bcrypt = require("bcryptjs");
  var salt = bcrypt.genSaltSync(10);
  if (req.body.password) {
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
  }

  let distributor = await Distributor.find({
    city: req.body.city,
    state: req.body.state,
  });
  let distances: any = [];
  distributor.map((dis: any) => {
    if (
      //check if distributor in 5km of user.
      isPointWithinRadius(
        { latitude: dis.latitude, longitude: dis.longitude },
        { latitude: req.body.latitude, longitude: req.body.longitude },
        5000
      )
    ) {
      distances.push({
        km:
          getDistance(
            { latitude: dis.latitude, longitude: dis.longitude },
            { latitude: req.body.latitude, longitude: req.body.longitude }
          ) / 1000,
        id: dis._id,
      });
    }
  });

  let closest = distances[0];
  distances.map((dist: any) => {
    if (dist.km < closest.km) {
      closest = dist;
    }
  });

  let assignDistributor = closest ? closest.id : null;
  req.body.referralCode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
  const retailer = new Retailer({ ...req.body, dId: assignDistributor });
  var token = jwt.sign(
    {
      email: retailer.email,
      _id: retailer._id,
    },
    `${process.env.APP_SECRET}`
  );

  retailer
    .save()
    .then((result: any) => {
      res
        .status(201)
        .json({ success: "Record Created.", record: result, token: token });
    })
    .catch((err: any) => {
      res.status(403).json({ error: "Something went wrong.", err });
    });

  // res.status(201).json({ success: "Record Created.", token: token });
});

export default handler;
