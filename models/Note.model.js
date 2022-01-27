const mongoose = require("mongoose");
const { Schema } = mongoose;
const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: Object,
      of: {
        type: String,
        ref: "Category",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("note", NoteSchema);
module.exports = Note;
