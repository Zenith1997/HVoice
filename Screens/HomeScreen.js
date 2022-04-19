import {useNavigation} from '@react-navigation/core'
import React, {useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {auth} from '../firebase'
import {getAudioFileUri, getFileList} from "../Services/FileService";
import {Audio} from 'expo-av';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [fileList, setFileList] = React.useState([]);
    const [sound, setSound] = React.useState(null);

    async function playSound(uri) {
        console.log('Loading Sound');
        const {_sound} = await Audio.Sound.createAsync({uri: uri}, {shouldPlay: true});
            // require(uri)
        setSound(_sound);

        console.log('Playing Sound');
        await _sound.playAsync();
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
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
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
                                debugger;
                                playSound(uri);
                            })
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{element}</Text>
                    </TouchableOpacity>
                )
            })}
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
