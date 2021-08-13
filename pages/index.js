import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOhK6N1sb__wJjbxOIAVMwpZYSysqgnQ8",
  authDomain: "test-sso-15468.firebaseapp.com",
  databaseURL: "https://test-sso-15468-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-sso-15468",
  storageBucket: "test-sso-15468.appspot.com",
  messagingSenderId: "983827580952",
  appId: "1:983827580952:web:594b413f4eb9d2f2445b6d",
  measurementId: "G-WZD1PLLHL9",
};

export default function Home() {
  const [microsoftTeams, setMicrosoftTeams] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (microsoftTeams) {
      console.log(microsoftTeams.authentication);
      microsoftTeams.initialize();
      microsoftTeams.authentication.getAuthToken({
        successCallback: (token) => {
          const testDetails = jwtDecode(token);
          console.log(testDetails);
          axios.post("http://localhost:5000", { token }).then((response) => {
            const customToken = response.data;
            firebase.initializeApp(firebaseConfig);
            firebase
              .auth()
              .signInWithCustomToken(customToken)
              .then((userCredentials) => {
                setName(userCredentials.user.displayName);
                setEmail(userCredentials.user.email);
                alert("successfully got the user through the firebase token");
                // microsoftTeams.appInitialization.notifySuccess();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        },
        failureCallback: (err) => {
          alert("failure" + err);
          microsoftTeams.appInitialization.notifyFailure({
            message: "The authentication has failed !!",
          });
        },
      });
    }
  }, [microsoftTeams]);

  useEffect(() => {
    const loadData = async () => {
      const data = await import("@microsoft/teams-js");
      setMicrosoftTeams(data);
    };

    loadData();
  }, []);
  return (
    <div>
      <div>
        You are {name}, Your email is {email},updated
      </div>
    </div>
  );
}
