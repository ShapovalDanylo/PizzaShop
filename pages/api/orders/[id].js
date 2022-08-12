import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";

const handler = async (req, resp) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      resp.status(200).json(order);
    } catch (e) {
      resp.status(500).json(e);
    }
  } else if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      resp.status(200).json(order);
    } catch (e) {
      resp.status(500).json(e);
    }
  } else if (method === "DELETE") {
    try {
      await Order.findByIdAndDelete(id);
      resp.status(200).json("The order has been deleted successfully!")
  } catch (e) {
      resp.status(500).json(e)
  }
  }
};

export default handler;