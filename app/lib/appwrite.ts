import { Account, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.company.techbuilder",
  projectId: "671f3cae0031331adafa",
  databaseId: "674ba93100294e10a9bd",
  configuratinCollectionId: "674ca40b0007b7b36ca0",
  storageId: "674b21310023fc97d80d",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
const databases = new Databases(client);

export const addConfigurationToBase = async (data: any) => {
  try {
    const formattedData = JSON.stringify(data);
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.configuratinCollectionId,
      ID.unique(),
      {
        cpu: formattedData,
      }
    );

    // Обновление данных профиля пользователя
    const user = await account.get();
    const updatedPreferences = {
      ...user.prefs,
      lastConfiguration: data,
    };
    await account.updatePrefs(updatedPreferences);

    console.log("Конфигурация добавлена и профиль обновлён.");
    return response;
  } catch (error: any) {
    console.error(
      "Ошибка при добавлении конфигурации:",
      error.message || error
    );
  }
};

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    try {
      await account.create(ID.unique(), email, password, username);
    } catch (error: any) {
      console.warn("Warning: Error during account creation:", error.message);
      if (error.type === "account_already_exists") {
        console.log("Account already exists, proceeding...");
      } else {
        throw error;
      }
    }

    try {
      await singIn(email, password);
      console.log("User signed in successfully.");
    } catch (error: any) {
      console.warn("Warning: Error during sign-in:", error.message);
    }
  } catch (error: any) {
    console.error("Critical Error:", error.message || error);
    throw new Error(error.message || error);
  }
};

export async function singIn(email: string, password: string) {
  // try {
  //   await account.deleteSession("current");
  //   console.log("Previous session deleted.");
  // } catch (error: any) {
  //   console.error("Error during sign-in:", error.message);
  // }

  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("New session created:", session);

    const userData = await account.get();
    console.log("User data:", userData);

    return session;
  } catch (error: any) {
    console.log(error);
  }
}

export const getConfigurations = async () => {
  try {
    const data = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.configuratinCollectionId
    );
    return data.documents;
  } catch (error) {
    console.error(error);
  }
};
