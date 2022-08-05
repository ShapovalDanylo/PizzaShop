import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (e) {
      res.status(500).json(e);
    }
  } else if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (e) {
      res.status(500).json(e);
    }
  } else if (method === "DELETE") {
  }
};

export default handler;