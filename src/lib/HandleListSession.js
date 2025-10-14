import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

async function HandleListSession() {
  try {
    const result = await account.listSessions();
    console.log(result.sessions[0].$id);
  } catch (error) {
    console.log(error);
  }
}

// console.log(result);

export default HandleListSession;
