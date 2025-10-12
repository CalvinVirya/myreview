import { Client, Query, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

async function HandleListReview() {
  try {
    let promise = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TABLE_ID,
      queries: [Query.limit(8), Query.orderDesc()],
    });
    return promise.rows;
  } catch (error) {
    console.log(error);
  }
}

export default HandleListReview;
