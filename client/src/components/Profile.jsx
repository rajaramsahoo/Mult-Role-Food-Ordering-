import React, { useContext, useState } from "react";
import {
  Loader2,
  LocateFixedIcon,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  PhoneCall,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { AuthContext } from "@/context/AuthProvider";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);

  // Controlled input states
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email] = useState(user?.email || ""); // Email is usually not editable
  const [contact, setContact] = useState(user?.contact || "");
  const [city, setCity] = useState(user?.city || "Update your city");
  const [country, setCountry] = useState(user?.country || "Update your country");
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || "");
  const [addresses, setAddresses] = useState(user?.address || []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <form className="max-w-7xl mx-auto my-5 pt-20">
      {/* Profile Image and Name */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={previewImage} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              id="profile-image-upload"
            />

            {/* Clickable Overlay */}
            <label
              htmlFor="profile-image-upload"
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </label>
          </Avatar>

          {/* Full Name */}
          <Input
            type="text"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>

      {/* User Details */}
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              disabled
              name="email"
              value={email}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <PhoneCall className="text-gray-500" />
          <div className="w-full">
            <Label>Phone</Label>
            <input
              name="phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <LocateFixedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div className="text-center">
        {loading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="bg-orange hover:bg-hoverOrange">
            Update
          </Button>
        )}
      </div>

      {/* Address List */}
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        {addresses.length > 0 &&
          addresses.map((address, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-sm p-2 bg-gray-200"
            >
              <LocateIcon className="text-gray-500" />
              <div className="w-full">
                <Label>{address.isDefault === true ? "Default" : ""}</Label>
                <div className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none">
                  <p className="font-bold">{address.name}</p>
                  <p>
                    {address.street}, {address.city}, {address.state}, {address.zip}
                  </p>
                  <p>{address.country}</p>
                  <p className="text-gray-500">{address.phoneNumber}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </form>
  );
};

export default Profile;
