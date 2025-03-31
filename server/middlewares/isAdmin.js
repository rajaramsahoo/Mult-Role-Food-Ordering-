const isAdmin = (req, res, next) => {
    if (req.payload.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}
