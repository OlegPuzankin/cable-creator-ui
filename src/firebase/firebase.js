import app from 'firebase/app'
import "firebase/auth";
import 'firebase/firestore'
import 'firebase/storage'
import { firebaseConfig } from './firebase_config'


class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.firestore();
        this.storageRef = app.storage().ref();

    }

    async register(name, email, password) {

        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName: name
        })
    }

    async login(email, password) {
        await this.auth.signInWithEmailAndPassword(email, password);

    }

    async logout() {
        await this.auth.signOut();
    }

    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }

    async loginWithGoogle() {
        const googleProvider = new app.auth.GoogleAuthProvider();

        googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        app.auth().useDeviceLanguage();
        googleProvider.setCustomParameters({ 'login_hint': 'user@example.com' });

        return await this.auth.signInWithPopup(googleProvider);
    }

    async addItemToDatabase(collection, item) {
        return await this.db.collection(collection).add(item)

    }

    async addImageToStorage(imageFile) {

        const filePath = `images/${imageFile.name}`;
        await this.storageRef.child(filePath).put(imageFile);

        const imageUrl = await this.storageRef.child(filePath).getDownloadURL();

        return { filePath, imageUrl }
    }

    async deleteItemFromDatabase(collection, itemID) {
        await this.db.collection(collection).doc(itemID).delete()

    }
    async loadCollection(collection) {
        return this.db.collection(collection).get().then(snapShot => {
            return snapShot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })
        })

    }
    // async loadCollectionWithMappedObj(collection,fieldName) {
    //     return this.db.collection(collection).get().then(snapShot=>{
    //         const mappedObj= {};
    //         const array = snapShot.docs.map(doc=>{
    //             mappedObj[doc.id]=doc.data()[fieldName];
    //             return {id:doc.id, ...doc.data()}
    //
    //         });
    //         return {array, mappedObj}
    //     })
    //
    // }
}

export const firebase = new Firebase();

