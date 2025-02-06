const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//hash password before the admin is saved
userSchema.pre("save", function (next) {
    const user = this;
    //hash password only if the password has been
  
    if (!user.isModified("password")) return next();
  
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
  
      //changed the password to hashed version
      user.password = hash;
      next();
    });
  });

module.exports = mongoose.model("User", userSchema);
