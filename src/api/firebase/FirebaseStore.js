import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {storage} from "./FirebaseConfig";
import {getNameFromUrl} from "../../util/index.js";
import PropTypes from "prop-types";

export const uploadToFirebaseStorage = async (items) => {
	const promises = [];
	items.map((file) => {
		const storageRef = ref(storage, `${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		promises.push(
			new Promise((resolve, reject) => {
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						// Here you can handle the progress of the upload
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(`Upload is ${progress}% done`);
					},
					(error) => {
						// Handle unsuccessful uploads
						console.log(error);
					},
					() => {
						// Handle successful uploads
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							const name = getNameFromUrl(downloadURL)
							resolve({name, url: downloadURL})
						});
					}
				);
			})
		);
	});

	return await Promise.all(promises);
}

export const uploadSingleFirebaseStorage = async (file, path, name) => {
	const storageRef = ref(storage, `${path}/${name}`);
	return new Promise((resolve, reject) => {
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Here you can handle the progress of the upload
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress}% done`);
			},
			(error) => {
				// Handle unsuccessful uploads
				console.log(error);
				reject(error);
			},
			() => {
				// Handle successful uploads
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					resolve(downloadURL);
				});
			}
		);
	});
}

uploadToFirebaseStorage.propTypes = {
	items: PropTypes.array.isRequired
}


/**
 * function to handle delete files from firestore
 * @param data - data to delete
 * @param action - action description
 */

// export const deleteFileFromFirestore = async (data, action = 'delete-one') => {
// 	if(action === 'delete-all') {
// 		let promises = [];
// 		data.map(item => promises.push(deleteObject(ref(storage, item.url))))
// 		try {
// 			await Promise.all(promises)
// 			return true
// 		} catch(error) {
// 			console.log(error)
// 		}
// 	}
// 	if(action === 'delete-one') {
// 		try {
// 			await deleteObject(ref(storage, data.file_url))
// 		} catch(error) {
// 			console.log(error)
// 		}
// 	}
// };
//
// deleteFileFromFirestore.prototype = {
// 	data: PropTypes.oneOfType([
// 		PropTypes.array,
// 		PropTypes.object
// 	]).isRequired,
// 	action: PropTypes.string.isRequired
// }