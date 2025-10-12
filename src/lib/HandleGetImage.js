import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

async function HandleGetImage(fileId) {
  //   console.log(fileId);
  if (!fileId) {
    return null;
  }

  try {
    const result = storage.getFileView({
        bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId: fileId,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }

}

export default HandleGetImage;
