import {getDownloadURL, getStorage, listAll, ref} from "firebase/storage";


const getFileList = async () => {
    const storage = getStorage();
    const audio = ref(storage, 'audio');
    const audioFileList = await listAll(audio);
    const temp = [];
    for(const file of audioFileList.items) {
        temp.push(file.name);
    }
    return temp;
}

const getAudioFileUri = async (name) => {
    const storage = getStorage();
    const audioRef = ref(storage, 'audio/' + name);
    return await getDownloadURL(audioRef);
}

export { getFileList, getAudioFileUri };
