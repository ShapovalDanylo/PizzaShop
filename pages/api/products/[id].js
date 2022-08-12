import dbConnect from "../../../lib/mongo";
import Product from '../../../models/Product';

export default async function handler(req, resp) {
    const { method, query: { id } } = req
    await dbConnect()
    if (method === "GET") {
        try {
            const product = await Product.findById(id)
            resp.status(200).json(product)
        } catch (e) {
            resp.status(500).json(e)
        }
    } else if (method === "PUT") {
        try {
            const product = await Product.findByIdAndUpdate(id, req.body, {
                new: true
            });
            resp.status(201).json(product)
        } catch (e) {
            resp.status(500).json(e)
        }
    } else if (method === "DELETE") {
        try {
            await Product.findByIdAndDelete(id);
            resp.status(200).json("The product has been deleted successfully!")
        } catch (e) {
            resp.status(500).json(e)
        }
    }
}