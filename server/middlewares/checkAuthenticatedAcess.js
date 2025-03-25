const checkAuthenticatedAcess = (req, res, next) => {
    // Assuming role 1 = Admin, role 2 = Restaurant Owner
    if (!req.user || ![1, 2].includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized Access - Only Admins or Restaurant Owners allowed",
        });
    }
    next();
}
