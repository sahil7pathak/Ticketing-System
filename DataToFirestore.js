const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./ticketing-system-89239-firebase-adminsdk-yi5hm-9baaa29e90.json");

const data = require("./Sample_Data.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ticketing-system-89239.firebaseio.com"
});
var count = 0
data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];
    count = count + 1
    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            admin.firestore()
                .collection("sample_data")
                .doc(docTitle + count)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.log("Error writing document: ", error);
                });
        });
    }
});