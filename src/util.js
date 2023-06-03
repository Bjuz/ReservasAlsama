// TODO: Add SDKs for Firebase products that you want to usec
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { addDoc, deleteDoc } from "firebase/firestore";
import {
  getDocs,
  setDoc,
  updateDoc,
  docSnap,
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";//Import analytics

//Inicialize the app with the credentials 
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAIVKjWABnmCplU3tLcHJ4C-qjgfLMBZKM",
    authDomain: "alsamatours-404fb.firebaseapp.com",
    projectId: "alsamatours-404fb",
    storageBucket: "alsamatours-404fb.appspot.com",
    messagingSenderId: "988166178827",
    appId: "1:988166178827:web:6814cceb92ffdfc0871f0e",
    measurementId: "G-RD3WJ0XHWZ"
  });
  
  //Auth with credentials 
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const analytics = getAnalytics(firebaseApp);


  // // // // // // // // // // // // Sign in // // // // // // // // // // // // // // // //
  export async function SingInUser(email,password){
    const response = await SingIn(email,password);
    return response;
  }

  export async function SingIn(email,password){
    const result = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      return userCredential.user.uid;
    })
    .catch((error) => {
        console.log(error);
        return "Correo o contraseña incorrecto.";
    });

    return result;
  }
  // // // // // // // // // // // // Sign in // // // // // // // // // // // // // // // // //

    // // // // // // // // // // // // log out // // // // // // // // // // // // // // // //
    export async function LogOutUser(){
      const response = await LogOut();
      return response;
    }
  
    export async function LogOut(){
      var result = await signOut(auth)
      .then(() => {
        return "Sign out successful";
      })
      .catch((error) => {
        return "Error " + error.message;
      });
      return result;
    }
    // // // // // // // // // // // // log out // // // // // // // // // // // // // // // // //

  // // // // // // // // // // // Get current user  // // // // // // // // // // // // // //
  export async function CurrentUser(){

    const auth = await getAuth();
    console.log(auth);
    const user = auth.currentUser;
    console.log(user);
  
    if (user) {
      return user.uid;
    } else {
      return false;
    }
  }
  // // // // // // // // // // // Get current user  // // // // // // // // // // // // // //

  // // // // // // // // // // // Forget the Password  // // // // // // // // // // // // // 

  export async function ForgetPassword(email){
    const response = await sendPasswordResetEmail(auth, email)
    .then(() => {
     return "Email sent"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return "Error: " + error.message;
    });
  }
    // // // // // // // // // // // Forget the Password  // // // // // // // // // // // // // 

      // // // // // // // // // // // Create a costumer // // // // // // // // // // // // // 
      export async function CreateACostumer(Costumer){
        const docRef = doc(db, "Costumer", Costumer.email);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()){
          const response = await setDoc(doc(db, "Costumer", Costumer.email), {
            concierge:Costumer.concierge,
            agent:Costumer.agent,
            costumerName:Costumer.costumerName,
            email:Costumer.email,
            children:Costumer.children,
            adult:Costumer.children,
            iva:Costumer.iva,
          }).then(() => {
            return "User created";
          }).catch((error) => {
            const errorMessage = error.message;
            return errorMessage;
          });
          return response;
        }
        else{
          return "User already exists";
        }

        
      }
      // // // // // // // // // // // Create a costumer // // // // // // // // // // // // // 

      // // // // // // // // // // // Get a costumer // // // // // // // // // // // // // 
      export async function GetACostumer(email){
       var cx= [];;
        try {

          const q = query(collection(db, "Costumer"), where("email", "==", email));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            cx.push(doc.data());
          });
        } catch (error) {
          console.log('Error getting documents');
        }
       if(cx.length === 0){
        return "No documents found based on email."
       }else{
        return cx;
       }
  
      }

      async function LoadCostumer() {
        const querySnapshot = await getDocs(collection(db, "Costumer"));
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        return data;
      }
      // // // // // // // // // // // Create a costumer // // // // // // // // // // // // // 

      // // // // // // // // // // // Update a costumer // // // // // // // // // // // // // 

      export async function UpdateCX(Costumer){
        var refUser = await doc(db, "Costumer", Costumer.email);
        console.log(refUser);

        var response = await updateDoc(refUser, {
          concierge:Costumer.concierge,
            agent:Costumer.agent,
            costumerName:Costumer.costumerName,
            email:Costumer.email,
            children:Costumer.children,
            adult:Costumer.children,
            iva:Costumer.iva,
        }).then(() => {
          console.log("changes");
          return (
           "Document successfully updated"
          );
        })
        .catch((error) => {
          console.log(error);
          return error;
        });

        return response
      }

      // // // // // // // // // // // Update a costumer // // // // // // // // // // // // // 

      // // // // // // // // // // // Delete a costumer // // // // // // // // // // // // // 

       export async function DeleteCX(Costumer){
        var resut = await deleteDoc(doc(db, "Costumer", Costumer.email))
          .then(() => {
            console.log("Deleted");
            return "Deleted";
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        return resut;
              
      }
      
       // // // // // // // // // // // Delete a costumer // // // // // // // // // // // // // 