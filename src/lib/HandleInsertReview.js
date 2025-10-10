import { Client, ID, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

async function HandleInsertReview(title, description) {
  try {
    const promise = tablesDB.createRow(
      "68e8f518002b506dd8c1",
      "reviews",
      ID.unique(),
      {title, description}
    );
  } catch (error) {
    console.log(error);
  }
}

export default HandleInsertReview
