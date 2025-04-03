 // let token = JSON.parse(localStorage.getItem("token"))?.token;
        // try {
        //     const formDataToSend = new FormData();
        //     formDataToSend.append("name", formData.name);
        //     formDataToSend.append("description", formData.description);
        //     formDataToSend.append("price", formData.price);
        //     formDataToSend.append("cusine", formData.cusine);
        //     formDataToSend.append("vegNonVeg", formData.vegNonVeg);
        

        //     if (formData.newImage) {
        //         formDataToSend.append("image", formData.newImage);
        //     }
        // } catch (error) {
            
        // }import mongoose from "mongoose"

// Create an address schema for the nested address objects
const addressSchema = new mongoose.Schema({
       label: {
         type: String,
         default: "Home",
         required: true,
       },
       street: {
         type: String,
         required: true,
       },
       city: {
         type: String,
         required: true,
       },
       state: {
         type: String,
         required: true,
       },
       zip: {
         type: String,
         required: true,
       },
       country: {
         type: String,
         required: true,
       },
       isDefault: {
         type: Boolean,
         default: false,
       },
     })
     
     const userSchema = new mongoose.Schema(
       {
         fullname: {
           type: String,
           required: true,
         },
         email: {
           type: String,
           required: true,
         },
         password: {
           type: String,
           required: true,
         },
         contact: {
           type: Number,
           required: true,
         },
         // Replace single address with array of addresses
         addresses: {
           type: [addressSchema],
           default: [],
           validate: {
             validator: (addresses) => {
               // Ensure no more than 3 addresses
               return addresses.length <= 3
             },
             message: "You can have a maximum of 3 addresses",
           },
         },
         profilePicture: {
           type: String,
           default: "https://i.ibb.co/4pDNDk1/default-profile.png",
         },
         // advanced authentication
         lastLogin: {
           type: Date,
           default: Date.now,
         },
         isVerified: {
           type: Boolean,
           default: false,
         },
         resetPasswordToken: String,
         resetPasswordTokenExpiresAt: Date,
         verificationToken: String,
         verificationTokenExpiresAt: Date,
         role: {
           type: String,
           enum: ["user", "restaurantOwner", "admin"],
           default: "user",
         },
       },
       { timestamps: true },
     )
     
     // Middleware to ensure one default address
     userSchema.pre("save", function (next) {
       if (this.addresses && this.addresses.length > 0) {
         // If no default address is set, make the first one default
         const hasDefault = this.addresses.some((addr) => addr.isDefault)
         if (!hasDefault && this.addresses.length > 0) {
           this.addresses[0].isDefault = true
         }
     
         // Ensure only one default address
         let defaultCount = 0
         this.addresses.forEach((addr) => {
           if (addr.isDefault) defaultCount++
         })
     
         if (defaultCount > 1) {
           // If multiple defaults, keep only the first one as default
           let foundDefault = false
           this.addresses.forEach((addr) => {
             if (addr.isDefault) {
               if (foundDefault) {
                 addr.isDefault = false
               } else {
                 foundDefault = true
               }
             }
           })
         }
       }
       next()
     })
     
     export default mongoose.model("userModel", userSchema)
     
     