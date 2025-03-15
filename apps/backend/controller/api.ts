import { Request, Response } from 'express';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { UserCollection } from '../repository/userCollection';
import { User } from "@share/model/user";
import config from '../config/firebaseConfig';

export class ApiController {
    constructor(private userCollection: UserCollection) {
        this.userCollection = userCollection;
    }

    fetchUsers = async (req: Request, res: Response) => {
        try {
            const users: User[] = await this.userCollection.fetchUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;
            const exist: boolean = await this.userCollection.isEmailExist(data.email, null);
            if (exist) {
                res.status(422).json({ message: 'Email already exists.' });
                return;
            }
            const user: User = await this.userCollection.createUser(data);
            res.status(201).json({ message: 'Successfully created.' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const data: User = req.body;
            const exist: boolean = await this.userCollection.isEmailExist(data.email, id);
            if (exist) {
                res.status(422).json({ message: 'Email already exists.' });
                return;
            }
            await this.userCollection.updateUser(data, id);
            res.json({ message: 'Successfully updated.' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            await this.userCollection.deleteUser(id);
            res.json({ message: 'Successfully deleted.' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    signUp = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;
            const auth = getAuth(config);
            const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
            res.json(cred);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    signIn = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;
            const auth = getAuth(config);
            const cred = await signInWithEmailAndPassword(auth, data.email, data.password);
            res.json(cred);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    signOut = async (req: Request, res: Response) => {
        try {
            const auth = getAuth(config);
            await signOut(auth);
            res.json({ message: 'Successfully sign out.' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
};