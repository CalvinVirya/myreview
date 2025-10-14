import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

async function HandleGetUser() {
  try {
    const result = await account.get();
    console.log(result.$id);
    return result.$id;
  } catch (error) {
    console.log(error);
  }
}

export default HandleGetUser;
