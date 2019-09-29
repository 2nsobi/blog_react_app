const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

const createNotification = (notif) => {
    return admin.firestore().collection('notifications').add(notif).then(doc => {
        console.log('notification added', doc)
    })
}

exports.projectCreated = functions.firestore.document('projects/{projectID}').onCreate(doc => {
    const project = doc.data()
    const notif = {
        content: 'Added a new project',
        user: `${project.authorFirstname} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notif)
})

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore.collection('users').doc(user.uid).get().then(doc => {
        const newUser = doc.data()
        const notif = {
            content: 'made an account',
            user: `${newUser.firstname} ${project.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notif)
    })
})