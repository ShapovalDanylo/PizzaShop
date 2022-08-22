import cookie from "cookie";

const handler = (req, resp) => {
    if(req.method === "POST") {
        const { username, password } = req.body
        if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            resp.setHeader("Set-Cookie", cookie.serialize("token", process.env.AUTH_TOKEN, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/"
            }))
            resp.status(200).json("Success!")
        } else {
            resp.status(400).json("Wrong Login or Password!")
        }
    }
}

export default handler