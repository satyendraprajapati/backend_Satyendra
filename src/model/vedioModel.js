import mongoose, { Schema, model } from "mongoose";
import mongooseAgreegation from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema(
  {
    vedioFile: {
      type: String, //Cloudiniry URL
      required: true,
    },
    thumbnail: {
      type: String, //Cloudiniry URL
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //Cloudiniry URL
      required: true,
    },
    veiw: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: true,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
VideoSchema.plugin(mongooseAgreegation);
export const Vedio = mongoose.model("Vedio", VideoSchema);
