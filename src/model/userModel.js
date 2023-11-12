import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// This line sets up a pre-save middleware for the UserSchema. This middleware will be executed before saving a user to the database.

UserSchema.pre("save", async function (next) {
  // This line checks if the password field of the user document has been modified. If it hasn't, it skips the hashing process and proceeds to the next middleware or the save operation.
  if (!this.isModified("password")) return next();

  // If the password has been modified, this line hashes the password using bcrypt with a cost factor of 10. The result is then assigned back to the password field of the user document.
  this.password = bcrypt.hash(this.password, 10);

  // This line calls the next function, indicating that the middleware has completed its execution. This is crucial for the middleware to continue with the next steps in the save process.
  next();

  // Closes the pre-save middleware function.
});

// This line adds a method named isPasswordCorrect to the UserSchema. This method will be used to compare a given password with the hashed password stored in the user document.
UserSchema.methods.isPaawordCorrect = async function (password) {
  // This line uses bcrypt's compare function to compare the provided password with the hashed password stored in the user document (this.password). The result of the comparison is returned.
  return await bcrypt.compare(password, this.password);

  // Closes the isPasswordCorrect method definition.
};
UserSchema.methods.genereteAccessToken = function () {
  return JWT.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expireIn: process.env.ACCESS_TOKEN_EXPIR }
  );
};
UserSchema.methods.generetRefeshToken = function () {
  return JWT.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFESH_TOKEN_EXPIRE,
    }
  );
};

const User = mongoose.model("User", UserSchema);
export default User;
