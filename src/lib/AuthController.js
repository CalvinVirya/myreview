import {
  Client,
  Account,
  ID,
  Avatars,
  OAuthProvider,
  TablesDB,
  Query,
} from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const avatars = new Avatars(client);
const tablesDB = new TablesDB(client);

async function HandleGetUser() {
  try {
    const result = await account.get();
    const existing = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_USER,
      queries: [Query.equal("userId", [result.$id])],
    });
    if (existing.rows.length === 0) {
      await HandleInsertUser(result.$id, result.name);
    }
    await HandleGetUserId(result.$id);
    return result.$id;
  } catch (error) {
    console.log(error);
  }
}

// HandleGetUser yg dari tabel buat validasi tambahan login + masukkin sessionstorage disitu

async function HandleGetUserId(userId) {
  try {
    const result = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TABLE_ID_USER,
      queries: [Query.equal("userId", [userId])],
    });
    sessionStorage.setItem("userId", result.rows[0].$id);
    // console.log(result.rows[0].$id);
  } catch (error) {
    console.log(error);
  }
}

async function HandleInsertUser(userId, username) {
  let profilePicture = avatars.getInitials();

  try {
    const result = await tablesDB.createRow(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TABLE_ID_USER,
      ID.unique(),
      { userId, profilePicture, username }
    );
    sessionStorage.setItem("userId", result.$id);
  } catch (error) {
    if (error.message.includes("duplicate") || error.code === 409) {
      console.log("User already exists, skipping insert");
    } else {
      console.log(error);
    }
  }
}

async function HandleCreateSession(email, password) {
  try {
    const result = await account.createEmailPasswordSession({
      email: email,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }
}

async function HandleAuth(email, password, username) {
  try {
    const result = await account.create({
      userId: ID.unique(),
      email: email,
      password: password,
      name: username,
    });
    HandleCreateSession(email, password);
    console.log(result.$id);
  } catch (error) {
    console.log(error);
  }
}

async function HandleGetInitials() {
  try {
    const result = avatars.getInitials();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function HandleDeleteSessions() {
  try {
    const result = await account.deleteSessions();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function HandleGoogle() {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: "http://localhost:5173", // redirect here on success
    failure: "http://localhost:5173", // redirect here on failure
  });
}

export {
  HandleAuth,
  HandleCreateSession,
  HandleDeleteSessions,
  HandleGetUser,
  HandleGetInitials,
  HandleGoogle,
  HandleInsertUser,
};
