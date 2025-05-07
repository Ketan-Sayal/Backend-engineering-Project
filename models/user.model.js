const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    coursesEnrolledIn:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        default:[]
    }]

}, {
    timestamps: true
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password){
    const result = await bcrypt.compare(password, this.password);
    return result;
};

userSchema.methods.generateAccessToken = function(){
    return sign({
        username:this.username,
        _id:this._id
    }, process.env.JWT_ACCESS_TOKEN, {expiresIn:process.env.JWT_ACCESS_TOKEN_EXIPIRY_DATE})
}

const User = mongoose.model("User", userSchema);

module.exports = User;
