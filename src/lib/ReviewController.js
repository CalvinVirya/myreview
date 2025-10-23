import { Client, ID, TablesDB, Query } from "appwrite";
import { HandleGetImage, HandleInsertImage } from "./StorageController";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

async function HandleInsertReview(title, description, imageFile) {
  let imageId = null;
  let imageLink = null;

  if (imageFile) {
    try {
      const uploadedImage = await HandleInsertImage();
      imageId = uploadedImage;
      const uploadedImageLink = await HandleGetImage(imageId);
      imageLink = uploadedImageLink;
    } catch (error) {
      console.log(error);
    }
  }

  try {
    let users = sessionStorage.getItem("userId");
    console.log(users);
    const result = await tablesDB.createRow(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TABLE_ID_REVIEW,
      ID.unique(),
      { title, description, imageLink, users }
    );
  } catch (error) {
    console.log(error);
  }
}

async function HandleListReview() {
  try {
    let result = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_REVIEW,
      queries: [
        Query.limit(24),
        Query.orderDesc(),
        Query.select(["*", "users.*"]),
      ],
    });
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
}

export { HandleInsertReview, HandleListReview };
