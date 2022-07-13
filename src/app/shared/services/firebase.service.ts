import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Observable } from 'rxjs';

const firebaseConfig = environment.firebase;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private auth: any
  private db: any;
  private storage: any;
  public productList: Array<any> = [];
  constructor(
  ) {
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.storage = getStorage(app, "gs://webtest-206d2.appspot.com");
  }

  signUp(formData: any): Promise<boolean> {
    let email = formData.email;
    let password = formData.password;

    return new Promise<boolean>((resolve, reject)=>{
      createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
        let user = userCredential.user;
        user.getIdToken(true).then(data=>{
          localStorage.setItem('token', data);
        })
        this.create(user).then(() => {
          resolve(true);
  
        }).catch(err => {
          console.log(err);
  
        })
      }).catch((error) => {
          console.log(error);
          reject(error)
      });
    })
    
  }

  signIn(formData: any): Promise<boolean> {
    let email = formData.email;
    let password = formData.password;
    return new Promise<boolean>((resolve, reject)=>{
      signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;

        if (user?.uid) {
          console.log('true');
          
        }else{
          console.log('false');
          
        }
        
        user.getIdToken(true).then(data=>{
          localStorage.setItem('token', data);
          resolve(true);
        })
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  logOut() {
    signOut(this.auth).then(() => {
      console.log('Sign-out successful');

    }).catch((error) => {
      console.log('An error happened.');

    });
  }

  async create(user: any) {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
        accessToken: user.accessToken,
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
        creationTime: user.metadata.creationTime
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



  uploadImage(file: any, filePath: string): Promise<string> {
    let productImagesRef = ref(this.storage, filePath);
    return new Promise<string>((resolve, reject) => {
      uploadBytes(productImagesRef, file).then(async (snapshot) => {
        // console.log('Uploaded a blob or file! ', snapshot);
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      }).catch(err => {
        // console.log(err);
        reject(err);
      });
    });

  }

  deleteImage(imagePath:string) {
    let desertRef = ref(this.storage, imagePath);

    deleteObject(desertRef).then(() => {
      console.log('File deleted successfully');

    }).catch((error) => {
      console.log(error);

    });
  }

  addProduct(json: any): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const dataRef = await addDoc(collection(this.db, "productList"), json);
        if (dataRef.id) {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }

    });
  }

  async getData() {
    return new Promise<Array<any>>(async (resolve, reject) => {
    const querySnapshot = await (await getDocs(collection(this.db, "productList"))).docs;
    // console.log(querySnapshot);

    const newQuerySnapshpt = querySnapshot.map((doc) => {
      return {
          id: doc.id,
          ...doc.data()
      }
  });
    
    resolve(newQuerySnapshpt)
  });
  }

  async getDoc(id:any){
    let docRef = doc(this.db, "productList", id);
    let docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async updateData(json:any, id:string) {
    let citiesRef = collection(this.db, "productList");
    await setDoc(doc(citiesRef, id), json);
  }

  async deleteDoc(product:any){
    await deleteDoc(doc(this.db, "productList", product.id)).then(()=>{
      this.deleteImage(product.filePath);
    });
  }

}
