import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  private: boolean;
  password: string;
  salt: string;
}

const UrlSchema: Schema = new Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    private: { type: Boolean, default: false },
    password: {
      type: String,
      required: function (this: IUrl) {
        return this.private;
      },
    },
    salt: {
      type: String,
      required: function (this: IUrl) {
        return this.private;
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUrl>("Url", UrlSchema);
