import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

async function HandleGoogle() {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: "http://localhost:5173", // redirect here on success
    failure: "http://localhost:5173", // redirect here on failure
  });
}

export default HandleGoogle;
