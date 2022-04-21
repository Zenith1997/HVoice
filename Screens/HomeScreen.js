import React, {useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {getAudioFileUri, getFileList} from "../Services/FileService";
import {Audio} from 'expo-av';
import {getAuth, signOut} from "firebase/auth"


const HomeScreen = ({navigation}) => {
    const auth = getAuth();

    const [fileList, setFileList] = React.useState([]);
    const [sound, setSound] = React.useState(null);

    async function playSound(uri) {
        console.log('Loading Sound');
        const soundObj = await Audio.Sound.createAsync({uri: uri});
        setSound(soundObj.sound);

        console.log('Playing Sound');
        await soundObj.sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    useEffect(() => {
        getFileList().then(fileList => {
            setFileList(fileList);
        });
    }, []);


    const handleSignOut = () => {
        signOut(auth).then(r => {
            navigation.navigate("Login")
        }).catch(error => alert(error.message));
    }
  const handlePlayer=()=>{
      navigation.navigate("Player")
  }
    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            {fileList.map(element => {
             
          
             
                return (
                    <TouchableOpacity
                        key={element}
                        onPress={() => {
                            getAudioFileUri(element).then(uri => {
                                playSound(uri);
                                console.log({uri});
                            })
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{element}</Text>
                    </TouchableOpacity>
                )
            })}
            <TouchableOpacity
                onPress={() => {
                    setSound(null);
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handlePlayer}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Player</Text>
        </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: '#0782F9',
        width: '25%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
