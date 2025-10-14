import { Client, Account, ID } from "appwrite";
import HandleGetUser from "./HandleGetUser";
import HandleCreateSession from "./HandleCreateSession";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

async function HandleAuth(email, password, username) {
  try {
    const result = await account.create({
      userId: ID.unique(),
      email: email,
      password: password,
      name: username,
    });
    // HandleGetUser();
    HandleCreateSession(email, password);
    console.log(result.$id);
  } catch (error) {
    console.log(error);
  }
}

export default HandleAuth;
