import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    FullName : {type: String , required: true},
    Email: {type: String ,  required: true},
    Password : {type: String , required: true}
})

const UserModel = mongoose.model("users", userSchema);

export default UserModel;