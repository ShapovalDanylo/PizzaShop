import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";
import cookie from "cookie";

const handler = async (req, res) => {
  const { method, headers } = req;

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

      const parsedCookies = cookie.parse(headers.cookie || "");
      const existingOrders = JSON.parse(parsedCookies.orders || "[]");

      existingOrders.push(order._id.toString());

      parsedCookies.orders = JSON.stringify(existingOrders);

      const ordersCookie = cookie.serialize('orders', parsedCookies.orders, {
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/"
      });

      res.setHeader('Set-Cookie', ordersCookie);

      res.status(201).json(order);
    } catch (e) {
      res.status(500).json(e);
    }
  }
};

export default handler;