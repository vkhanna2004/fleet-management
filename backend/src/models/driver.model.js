import mongoose,{Schema} from "mongoose"

const driverSchema=new Schema({
    driverid: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    fullName:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    licenseNumber:{
        type:String,
        required:true,
        index:true,
        uppercase:true,
        trim:true,
        unique:true
    },
    phoneNumber:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        index:true,
    }
});

export const driver =mongoose.model("driver",driverSchema);