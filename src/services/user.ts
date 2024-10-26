import { userData } from "../models/user"
import { db } from "./firebaseConfig"
import { collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc, query, where } from "firebase/firestore"

export const addUser = async (user: userData) => {
    try {        
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

export const getUser = async (): Promise<userData[]> => { 
    try {
        const userRef = collection(db, 'users'); 
        const userSnapshots = await getDocs(userRef); 
        const userLists = userSnapshots.docs.map(doc => ({
            id: doc.id, 
            ...doc.data() as Omit<userData, 'id'>
        })) as userData[];
        return userLists;
    } catch (e) {
        console.error('Error fetching users: ', e);
        return [];
    }
}

export const getUserBySearching = async (searchUser : string): Promise<userData[]> => { 
    try {
        const userRef = collection(db, 'users'); 
        
        const userQuery = query(
            userRef,
            where("name", ">=", searchUser), 
            where("name", "<", searchUser + "\uf8ff") 
        );

        const userSnapshots = await getDocs(userQuery);

        const userLists = userSnapshots.docs.map(doc => ({
            id: doc.id, 
            ...doc.data() as Omit<userData, 'id'> 
        })) as userData[]; 
        
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

// to make login access for auth
export const validLogin = async(email: string, password: string) => {
    let userId = '';
    try {
        const userRef = collection(db, 'users');        
        
        const userQuery = query(
            userRef,
            where("email", "==", email), 
            where("password", "==", password) 
        );
       
        const userSnapshots = await getDocs(userQuery);

        
        if (!userSnapshots.empty) {
            const userDoc = userSnapshots.docs[0]; 
            userId = userDoc.id; 
        } else {
            console.error("Invalid login - no matching user found.");
        }
        
        return { userId };
    } catch (e) {
        console.error("invlid login");        
        return {userId};
    }
}


export const editUser = async (userId: string, updatedUser: Partial<userData>): Promise<boolean> => {
    try {
        const userRef = doc(db, "users", userId);  
        await setDoc(userRef, updatedUser, { merge: true });
        console.log(`User with ID ${userId} updated successfully`);
        return true;
    } catch (e) {
        console.error("Error updating user: ", e);
        return false; 
    }
};