import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (e) {
      res.status(500).json(e);
    }
  } else if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handler;