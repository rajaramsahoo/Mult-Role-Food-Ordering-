import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // Extract the token from the header
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.payload = decoded.user;
        console.log(req.payload._id)
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized access" });
    }
}