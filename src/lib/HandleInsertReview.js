import { Client, ID, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

async function HandleInsertReview(title, description) {
  try {
    const promise = tablesDB.createRow(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TABLE_ID,
      ID.unique(),
      { title, description }
    );
  } catch (error) {
    console.log(error);
  }
}

export default HandleInsertReview;
