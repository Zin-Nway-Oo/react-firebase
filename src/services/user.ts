import { userData } from "../models/user"
import { db } from "./firebaseConfig"
import { collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc, query, where } from "firebase/firestore"

export const addUser = async (user: userData) => {
    try {
        // Add a new document in the "users" collection
        const docRef = await addDoc(collection(db, 'users'), {
          name: user.name,
          email: user.email,
          password: user.password
        });
        return docRef.id;
        
    } catch (e) {
        console.error('Error adding user: ', e);
        return null;
    }
}

export const getUser = async (): Promise<userData[]> => { // Ensure the return type is userData[]
    try {
        const userRef = collection(db, 'users'); // Correctly get the collection reference
        const userSnapshots = await getDocs(userRef); // Fetch the documents
        const userLists = userSnapshots.docs.map(doc => ({
            id: doc.id, // Add document ID
            ...doc.data() as Omit<userData, 'id'> // Map the data to userData
        })) as userData[]; // Cast the resulting array to userData[]
        return userLists;
    } catch (e) {
        console.error('Error fetching users: ', e);
        return [];
    }
}

export const getUserBySearching = async (searchUser : string): Promise<userData[]> => { // Ensure the return type is userData[]
    try {
        const userRef = collection(db, 'users'); // Get the collection reference
        
        // Create a query for names that start with the substring
        const userQuery = query(
            userRef,
            where("name", ">=", searchUser), // Start with the substring
            where("name", "<", searchUser + "\uf8ff") // End just after the substring
        );

        const userSnapshots = await getDocs(userQuery); // Fetch the filtered documents

        const userLists = userSnapshots.docs.map(doc => ({
            id: doc.id, // Add document ID
            ...doc.data() as Omit<userData, 'id'> // Map the data to userData
        })) as userData[]; // Cast the resulting array to userData[]
        
        return userLists;
    } catch (e) {
        console.error('Error fetching users: ', e);
        return [];
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            await deleteDoc(userRef);
            console.log(`User with ID ${userId} deleted successfully`);
        } else {
            console.log(`No user found with ID: ${userId}`);
        }
    } catch (e) {
        console.error("Error deleting user: ", e);
    }
};


export const editUser = async (userId: string, updatedUser: Partial<userData>): Promise<boolean> => {
    try {
        const userRef = doc(db, "users", userId);
        
        // Use setDoc to update the user document
        await setDoc(userRef, updatedUser, { merge: true });
        console.log(`User with ID ${userId} updated successfully`);
        return true; // Return true if update is successful
    } catch (e) {
        console.error("Error updating user: ", e);
        return false; // Return false if an error occurs
    }
};