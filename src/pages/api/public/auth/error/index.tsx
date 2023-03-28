import createHandler from "database";

const handler = createHandler();

handler.get(async (req: any, res: any) => {
  res.status(401).json({ message: "Unauthorized Request. " });
});

export default handler;
