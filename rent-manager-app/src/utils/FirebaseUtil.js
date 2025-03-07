import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "../config/FirebaseConfig";
export class FirebaseUtil {
    static async uploadFile(folderName, file) {
        const storageRef = ref(storage, `${folderName}/${uuidv4()}.${file.name.split(".").pop() ?? ""}`);
        try {
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef);
        } catch (err) {
            console.log("Upload error:", err);
            throw err;
        }
    }
}