import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import AdminModel from "models/Admin";

import GoogleProvider from "next-auth/providers/google";
import dbConnect from "database/database";

var bcrypt = require("bcryptjs");

export default NextAuth({
  providers: [
    GoogleProvider({
      name: "credentials",
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
      profile: async (profile) => {
        const user = await UserModel.findOne({ email: profile.email });
        if (!user) {
          const newUser = new UserModel({
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            // phone: profile.phone_number,
            password: profile.sub,
            active: true,
          });
          const savedUser = await newUser.save();
          return {
            id: savedUser._id,
            name: savedUser.firstName + " " + savedUser.lastName,
            phone: savedUser.phone,
            email: savedUser.email,
            type: "user",
          };
        } else {
          return {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            phone: user.phone,
            email: user.email,
            type: "user",
          };
        }
      },
    }),
    CredentialProvider({
      name: "credentials",
      id: "admin-login",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const admin = await AdminModel.findOne({
          email: credentials.username,
        }).catch((e) => console.log(e));

        if (admin) {
          const isValidated = await bcrypt.compare(
            credentials.password,
            admin.password
          );

          if (isValidated) {
            return {
              id: admin._id,
              name: admin.name,
              email: admin.email,
              type: "admin",
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      // console.log("token1",token);
      // console.log("user1",user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.type = user.type;
      }
      return token;
    },
    session: ({ session, token, user }) => {
      // console.log("token",token)
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.email = token.email;
        session.phone = token.phone;
        session.type = token.type;
      }
      // console.log("session", session);

      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  session: {
    jwt: true,
    updateAge: 1000 * 60 * 60 * 24,
  },
  //   pages: {
  //     signIn: "signin",
  //   },
  database: process.env.DATABASE_CONNECTION,
  debug: true,
});
