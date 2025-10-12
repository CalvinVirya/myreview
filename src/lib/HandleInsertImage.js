import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

async function HandleInsertImage() {
  try {
    let result = await storage.createFile({
      bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
      fileId: ID.unique(),
      file: document.getElementById("ReviewUploader").files[0],
    });
    console.log(result.$id)
    return result.$id;
  } catch (error) {
    console.log(error);
  }
}

// console.log(result);

export default HandleInsertImage;
