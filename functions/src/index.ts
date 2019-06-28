import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const firestoreExample = functions.https.onRequest((request, response) => {
    admin.firestore().doc(`/hw/UmEnzuRn6DKadmiH2hSQ`).get()
        .then(snapshot => {
            console.log(snapshot.data());
            response.send(snapshot.data());
        })
        .catch(errorObject => {
            console.log('Error' + errorObject);
            response.status(500).send(errorObject);
        })
});

export const databaseExample = functions.https.onRequest((request, response) => {
    admin.database().ref(`/hw`).once('value',
        snapshot => {
            if( snapshot ){
                console.log(snapshot.val().record2.field2);
                console.log(snapshot.val());
                response.send(snapshot.val());
            }
        },
        (errorObject: any) => {
            console.log('Error' + errorObject.code);
            response.status(500).send(errorObject);
        });

});
