import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

async function HandleCreateSession(email, password) {
  try {
    const result = await account.createEmailPasswordSession({
      email: email,
      password: password,
    });
    console.log(result);
    console.log(result.$id);
  } catch (error) {
    console.log(error);
  }
}

export default HandleCreateSession;
