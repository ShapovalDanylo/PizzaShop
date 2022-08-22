import dbConnect from "../../../lib/mongo";
import Product from '../../../models/Product';

export default async function handler(req, resp) {
    const { method, cookies } = req

    const token = cookies.token

    await dbConnect()
    if (method === "GET") {
        try {
            const products = await Product.find()
            resp.status(200).json(products)
        } catch (e) {
            resp.status(500).json(e)
        }
    } else if (method === "POST") {
        if(!token && token !== process.env.AUTH_TOKEN) {
            return resp.status(401).json("Unauthorized")
        }
        try {
            const product = await Product.create(req.body);
            resp.status(201).json(product)
        } catch (e) {
            resp.status(500).json(e)
        }
    }
}