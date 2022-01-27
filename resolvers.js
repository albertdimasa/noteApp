const Note = require("./models/Note.model");
const Category = require("./models/Category.model");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },

    //Notes
    getAllNotes: async () => {
      return await Note.find();
    },
    getNote: async (_parent, { id }, _context, _info) => {
      return await Note.findById(id);
    },
    // getNotebyCategory: async (_parent, { id }, _context, _info) => {
    //   console.log(id);
    //   return await Note.find({ category: { id: id } });
    // },

    //Category
    getAllCategories: async () => {
      return await Category.find();
    },
    getCategory: async (_parent, { id }, _context, _info) => {
      return await Category.findById(id);
    },
  },
  Mutation: {
    //Notes
    createNote: async (parent, args, context, info) => {
      const { title, description, category } = args.note;
      const note = new Note({ title, description, category });

      const catTitle = await Category.findOne({ title: category.title });

      //Ketika category yang dimasukan tidak ada di database, maka category diubah menjadi null
      if (catTitle) {
        category.id = catTitle.id;
        console.log("Sukses");
      } else {
        category.title = null;
        console.log("Category Not Found");
      }
      await note.save();
      return note;
    },
    deleteNote: async (parent, args, context, info) => {
      const { id } = args;
      await Note.findByIdAndRemove(id);
      return "Note Deleted";
    },
    updateNote: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description, category } = args.note;
      const updates = {};
      const catTitle = await Category.findOne({ title: category.title });
      if (title) {
        updates.title = title;
      }
      if (description) {
        updates.description = description;
      }
      if (category) {
        updates.category = category;
        if (catTitle) {
          updates.category.id = catTitle.id;
        }
      }
      const note = await Note.findByIdAndUpdate(id, updates, { new: true });
      return note;
    },

    //Category
    createCategory: async (parent, args, context, info) => {
      const { title } = args.category;
      const category = new Category({ title });
      await category.save();
      return category;
    },
    deleteCategory: async (parent, args, context, info) => {
      const { id } = args;
      await Category.findByIdAndRemove(id);
      return "Category Deleted";
    },
    updateCategory: async (parent, args, context, info) => {
      const { id } = args;
      const { title } = args.category;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }

      const category = await Category.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return category;
    },
  },
};

module.exports = resolvers;
