const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    id: ID
    title: String
  }

  type Note {
    id: ID
    title: String
    description: String
    category: Category
  }

  type Query {
    hello: String

    getAllNotes: [Note]
    getNote(id: ID): Note

    getAllCategories: [Category]
    getCategory(id: ID): Category
  }

  input CategoryInput {
    title: String
  }

  input NoteInput {
    title: String
    description: String
    category: CategoryInput
  }

  type Mutation {
    createNote(note: NoteInput): Note
    deleteNote(id: ID): String
    updateNote(id: ID, note: NoteInput): Note

    createCategory(category: CategoryInput): Category
    deleteCategory(id: ID): String
    updateCategory(id: ID, category: CategoryInput): Category
  }
`;

module.exports = typeDefs;
