import { User } from "@share/model/user";
import { getFirestore, collection, query, where, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import config from '../config/firebaseConfig';

export class UserCollection {
    async fetchUsers(): Promise<User[]> {
        const users: User[] = [];
        try {
            const db = getFirestore(config);
            const docRef = await getDocs(collection(db, 'users'));
            docRef.forEach((row) => {
                const user = row.data() as User;
                user.id = row.id;
                users.push(user);
            });
        } catch (err) {
            console.error('Error getting users:', err);
        }
        return users;
    }

    async createUser(user: User): Promise<User> {
        try {
            const db = getFirestore(config);
            const docRef = await addDoc(collection(db, 'users'), {
                name: user.name ?? '',
                email: user.email ?? '',
                phone: user.phone ?? '',
            });
            user.id = docRef.id;
        } catch (err) {
            console.error('Error creating user:', err);
        }
        return user;
    }

    async updateUser(user: User, id: string): Promise<boolean> {
        try {
            const db = getFirestore(config);
            await updateDoc(doc(db, 'users', id), {
                name: user.name ?? '',
                email: user.email ?? '',
                phone: user.phone ?? '',
            });
            return true;
        } catch (err) {
            console.error('Error updating user:', err);
            return false;
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const db = getFirestore(config);
            await deleteDoc(doc(db, 'users', id));
            return true;
        } catch (err) {
            console.error('Error updating user:', err);
            return false;
        }
    }

    async isEmailExist(email: string, id: any): Promise<boolean> {
        try {
            const db = getFirestore(config);
            const docRef = await getDocs(query(collection(db, 'users'), where('email', '==', email)));
            if (docRef.docs.length > 0) {
                if (id != null && id == docRef.docs[0].id) return false;
                if (id != null && id != docRef.docs[0].id) return true;
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error checking email:', err);
            return false;
        }
    }
};