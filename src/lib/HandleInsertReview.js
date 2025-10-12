import { Client, ID, TablesDB } from "appwrite";
import HandleInsertImage from "../lib/HandleInsertImage";
import HandleGetImage from "./HandleGetImage";

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
      imageLink = uploadedImageLink
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const promise = tablesDB.createRow(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TABLE_ID,
      ID.unique(),
      { title, description, imageLink }
    );
  } catch (error) {
    console.log(error);
  }
}

export default HandleInsertReview;
