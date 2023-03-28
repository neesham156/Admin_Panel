import { dbMiddleware } from "./database";
import nextConnect from "next-connect";


export default function createHandler(...middlewares: any[]) {
  return nextConnect().use(dbMiddleware, ...middlewares);
}


