import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "adhaarCard",
      "PANCard",
      "passport",
      "medicalCard",
      "voterIDCard",
      "otherDocument",
    ],
  },
  url: {
    type: String,
    required: true,
  },
});

const documentsDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documents: [documentSchema],
  },
  { timestamps: true }
);

export const DocumentsDetails = mongoose.model(
  "DocumentsDetails",
  documentsDetailsSchema
);
