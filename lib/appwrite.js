import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.propixia.smokins",
  projectId: "66c9ec000033da075b41",
  databaseId: "66c9eeb6001f2ada3b62",
  storageId: "66c9f077001435320075",
  userCollectionId: "66c9eede0030a682e0d7",
  couponCollectionId: "66cc94ce0020b7c60764",
  couponIOSCollectionId: "67175f99000e0bbf4e2d",
  rewardsCollectionId: "66e1ca8d00052adde93c",
  pointsHistoryCollectionId: "66dfb468000fbc829d52",
  claimedRewardsCollectionId: "67088b730028616eddfd",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);

// Register user
export const createUser = async (
  email,
  password,
  username,
  isNewsletterChecked
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Nie udało się utworzyć nowego konta.");

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        points: 0,
        crowns: 0,
        isAdmin: false,
        newsletterSubscription: isNewsletterChecked,
      }
    );

    return newUser;
  } catch (error) {
    if (error.code === 400 && error.type === "general_argument_invalid") {
      throw new Error("Podany email już istnieje.");
    } else {
      throw new Error("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później!");
    }
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    if (error.code === 400 && error.type === "general_argument_invalid") {
      throw new Error("Nieprawidłowy email lub hasło.");
    } else {
      throw new Error("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później!");
    }
  }
};

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

//Update password
export const updatePassword = async (newPassword, oldPassword) => {
  try {
    const result = await account.updatePassword(newPassword, oldPassword);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// Logout
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Get Current User
export const getCurrentUSer = async () => {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Get all available coupons
export const getAllCoupons = async () => {
  try {
    const coupons = await databases.listDocuments(
      config.databaseId,
      config.couponCollectionId,
      [
        Query.orderAsc("points_needed"),
        Query.orderAsc("title"),
        Query.limit(50),
      ]
    );

    return coupons.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Get all available coupons
export const getAllCouponsIOS = async () => {
  try {
    const coupons = await databases.listDocuments(
      config.databaseId,
      config.couponIOSCollectionId,
      [
        Query.orderAsc("points_needed"),
        Query.orderAsc("title"),
        Query.limit(50),
      ]
    );

    return coupons.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Get all available rewards
export const getAllRewards = async () => {
  try {
    const rewards = await databases.listDocuments(
      config.databaseId,
      config.rewardsCollectionId
    );

    return rewards.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Get data for specific user
export const getUserDataById = async (userId) => {
  try {
    const userData = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", userId)]
    );

    return userData.documents[0];
  } catch (error) {
    throw new Error("Błąd podczas pobierania danych użytkownika");
  }
};

// Get points history data
export const getPointsHistory = async () => {
  try {
    const currentAccount = await getAccount();

    const points = await databases.listDocuments(
      config.databaseId,
      config.pointsHistoryCollectionId,
      [
        Query.equal("accountId", currentAccount.$id),
        Query.orderDesc("timestamp"),
      ]
    );

    return points.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Add points history
export const addPointsHistory = async (userId, points, adminLogin) => {
  try {
    const timestamp = new Date().toISOString();

    const result = await databases.createDocument(
      config.databaseId,
      config.pointsHistoryCollectionId,
      ID.unique(),
      {
        accountId: userId,
        points: points,
        timestamp: timestamp,
        adminLogin: adminLogin,
      }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

//Get claimed rewards
export const getUserClaimedRewards = async (userId) => {
  try {
    const rewards = await databases.listDocuments(
      config.databaseId,
      config.claimedRewardsCollectionId,
      // [Query.equal('accountId', currentAccount.$id)]
      [Query.equal("accountId", userId)]
    );

    return rewards.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Add claimed rewards
export const addUserClaimedRewards = async (userId, title, description) => {
  try {
    const timestamp = new Date().toISOString();

    const result = await databases.createDocument(
      config.databaseId,
      config.claimedRewardsCollectionId,
      ID.unique(),
      {
        accountId: userId,
        title: title,
        description: description,
        timestamp: timestamp,
      }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

//Delete data in DB
export const deleteDocument = async (documentId, collectionId) => {
  try {
    const result = await databases.deleteDocument(
      config.databaseId,
      collectionId,
      documentId
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

//Update data in DB
export const updateUserData = async (documentId, data) => {
  try {
    const result = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      documentId,
      data
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

//Delete user in DB
export const deleteUserAndData = async () => {
  try {
    const currentAccount = await getAccount();
    const userId = currentAccount.$id;

    const userDocuments = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", userId)]
    );

    if (userDocuments.total === 0) {
      console.warn("Nie znaleziono dokumentów powiązanych z użytkownikiem.");
    } else {
      for (const document of userDocuments.documents) {
        await databases.deleteDocument(
          config.databaseId,
          config.userCollectionId,
          document.$id
        );
        console.log(`Usunięto dokument: ${document.$id}`);
      }
    }

    // const accountDeletion = await users.delete(userId);
    // console.log("Konto użytkownika zostało usunięte:", accountDeletion);

    return {
      success: true,
      message: "Użytkownik i dane zostały usunięte pomyślnie.",
    };
  } catch (error) {
    console.error("Błąd podczas usuwania użytkownika lub danych:", error);
    throw new Error("Nie udało się usunąć użytkownika i jego danych.");
  }
};
