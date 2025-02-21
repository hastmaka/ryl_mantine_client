import {auth} from './FirebaseConfig';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	// sendSignInLinkToEmail,
	// isSignInWithEmailLink,
	// signInWithEmailLink
} from 'firebase/auth';

export const registerUser = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password)
	.then(userCredential => {
		return userCredential.user
	}).catch(e => {
		switch (e.code) {
			case 'auth/email-already-in-use':
				return {error: 400}
			default:
				return {error: 401}
		}
	})
};

export const loginUser = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
	.then(userCredential => {
		return userCredential.user
	}).catch(e => {
		switch (e.code) {
			case 'auth/too-many-requests':
				return {error: 401}
			case 'auth/invalid-credential':
				return {error: 400}
			default:
				return {error: 412}
		}
	})
}

export const passwordResetEmail = (email) => {
	return sendPasswordResetEmail(auth, email);
}

export const loginWithGoogle = () => {
	const provider = new GoogleAuthProvider()
	return signInWithPopup(auth, provider);
}

export const subscribeToAuthChanges = () => {
	return new Promise((resolve, reject) => {
		return onAuthStateChanged(
			auth,
			(firebaseUser) => {
				// When the authentication state changes, resolve the promise with the user
				resolve(firebaseUser);
			},
			(error) => {
				// If there's an error, reject the promise with the error
				reject(error);
			},
		)
	})
}

// export const loginWithEmailLink = (email) => {
// 	let actionCodeSettings = {
// 		url: 'https://dmv.ryl.vegas',
// 		// This must be true.
// 		handleCodeInApp: true
// 	};
// 	sendSignInLinkToEmail(auth, email, actionCodeSettings).then((res) => {
// 		if (isSignInWithEmailLink(auth, window.location.href)) {
// 			// Additional state parameters can also be passed via URL.
// 			// This can be used to continue the user's intended action before triggering
// 			// the sign-in operation.
// 			// Get the email if available. This should be available if the user completes
// 			// the flow on the same device where they started it.
// 			let email = window.localStorage.getItem('emailForSignIn');
// 			if (!email) {
// 				// User opened the link on a different device. To prevent session fixation
// 				// attacks, ask the user to provide the associated email again. For example:
// 				email = window.prompt('Please provide your email for confirmation');
// 			}
// 			// The client SDK will parse the code from the link for you.
// 			signInWithEmailLink(auth, email, window.location.href)
// 			.then((result) => {
// 				// Clear email from storage.
// 				window.localStorage.removeItem('emailForSignIn');
// 				// You can access the new user via result.user
// 				// Additional user info profile not available via:
// 				// result.additionalUserInfo.profile == null
// 				// You can check if the user is new or existing:
// 				// result.additionalUserInfo.isNewUser
// 			})
// 			.catch((error) => {
// 				// Some error occurred, you can inspect the code: error.code
// 				// Common errors could be invalid email and invalid or expired OTPs.
// 			});
// 		}
// 	}).catch((error) => {
// 	})
//
// }