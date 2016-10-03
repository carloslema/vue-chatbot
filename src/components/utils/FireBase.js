import firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyDPvfqX_8ujP5BdKJnM1lcSQqwpLS6xxNM',
	authDomain: 'botzao-979f2.firebaseapp.com',
	databaseURL: 'https://botzao-979f2.firebaseio.com',
	storageBucket: '',
	messagingSenderId: '853920498170'
}
firebase.initializeApp(firebaseConfig)

export default firebase.database()
