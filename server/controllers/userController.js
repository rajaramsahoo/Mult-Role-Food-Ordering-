import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationEmail } from "../email/email.js";
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, contact } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();

        user = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        })
        //  generateToken(res,user);

        await sendVerificationEmail(email, verificationToken);

        const userWithoutPassword = await userModel.findOne({ email }).select("-password");
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const token = generateToken({ user });
        user.lastLogin = new Date();
        await user.save();

        // send user without passowrd
        const userWithoutPassword = await userModel.findOne({ email }).select("-password");
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword, token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const verifyEmail = async (req, res) => {
    try {
        const { verificationToken } = req.body;

        const user = await userModel.findOne({ verificationToken }).select("-password");
        console.log(user)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token"
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined
        await user.save();

        // send welcome email
        // await sendWelcomeEmail(user.email, user.fullname);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// export const forgotPassword = async (req: Request, res: Response) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User doesn't exist"
//             });
//         }

//         const resetToken = crypto.randomBytes(40).toString('hex');
//         const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

//         user.resetPasswordToken = resetToken;
//         user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
//         await user.save();

//         // send email
//         await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);

//         return res.status(200).json({
//             success: true,
//             message: "Password reset link sent to your email"
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
// export const resetPassword = async (req: Request, res: Response) => {
//     try {
//         const { token } = req.params;
//         const { newPassword } = req.body;
//         const user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid or expired reset token"
//             });
//         }
//         //update password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordTokenExpiresAt = undefined;
//         await user.save();

//         // send success reset email
//         await sendResetSuccessEmail(user.email);

//         return res.status(200).json({
//             success: true,
//             message: "Password reset successfully."
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }
// export const checkAuth = async (req: Request, res: Response) => {
//     try {
//         const userId = req.id;
//         const user = await User.findById(userId).select("-password");
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         };
//         return res.status(200).json({
//             success: true,
//             user
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
// export const updateProfile = async (req: Request, res: Response) => {
//     try {
//         const userId = req.id;
//         const { fullname, email, address, city, country, profilePicture } = req.body;
//         // upload image on cloudinary
//        // let cloudResponse: any;
//         cloudResponse = await cloudinary.uploader.upload(profilePicture);
//         const updatedData = {fullname, email, address, city, country, profilePicture};

//         const user = await User.findByIdAndUpdate(userId, updatedData,{new:true}).select("-password");

//         return res.status(200).json({
//             success:true,
//             user,
//             message:"Profile updated successfully"
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        return res.status(200).json({ success: true, users })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No such user exists"
            });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

