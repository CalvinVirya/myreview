import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

async function HandleDeleteSessions() {
  try {
    const result = await account.deleteSessions();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export default HandleDeleteSessions;
