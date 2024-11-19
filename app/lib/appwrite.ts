import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";


export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.aora",
  projectId: "6737a78b0029ed349754",
  databaseId: "6738e4340023e0288cfb",
  userCollectionId: "6738e44d0012470b1dd6",
  videoCollectionId: "6738e47f00397f993fc0",
  storageId: "6738e5ab001e0ded45de",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await singIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        username,
        email,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      }
    );
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export async function singIn(email: string, password: string) {
  try {
    const session = await account.createSession(email, password);

    if (!session) throw Error;

    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
