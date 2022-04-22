import React, {useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {getAudioFileUri, getFileList} from "../Services/FileService";
import {Audio} from 'expo-av';
import {getAuth, signOut} from "firebase/auth"
import { ScrollView } from 'react-native';


const HomeScreen = ({navigation}) => {
    const auth = getAuth();

    const [fileList, setFileList] = React.useState([]);
    const [sound, setSound] = React.useState(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    async function playSound(uri) {
        setSound(null);
        console.log('Loading Sound');
        const soundObj = await Audio.Sound.createAsync({uri: uri});
        setSound(soundObj.sound);

        console.log('Playing Sound');
        setIsPlaying(true);
        await soundObj.sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
                setIsPlaying(false);
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
            navigation.navigate("Login");
        }).catch(error => {
            alert(error.message);
        });
    }

    return (
        <View style={styles.container}>
          
           
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.buttonSout}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            <ScrollView 
            styles = {styles.scrollView}
            horizontal ={true}>
            {fileList.map(element => {
                return (
                    <TouchableOpacity
                        key={element}
                        onPress={() => {
                            getAudioFileUri(element).then(uri => {
                                playSound(uri);
                            })
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{element}</Text>
                    </TouchableOpacity>
                    
                )
            })}</ScrollView>
            {sound ?
                
                
                
                
                <><View styles = {styles.controller}>
        <View style={{display: "flex", width: "25%", flexDirection: "row"}}>
            <TouchableOpacity
                onPress={() => {
                    setIsPlaying(false);
                    sound.setStatusAsync({
                        shouldPlay: false
                    });
                }}
                style={styles.button2}
                disabled={!isPlaying}
            >
                <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setIsPlaying(true);
                    sound.setStatusAsync({
                        shouldPlay: true
                    });
                }}
                style={styles.button2}
                disabled={isPlaying}
            >
                <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
        </View>
        <View style={{display: "flex", width: "25%", flexDirection: "row"}}>
            <TouchableOpacity
                onPress={async () => {
                    const position = await sound.getStatusAsync().then(r => {
                        const temp = r.positionMillis - 5000;
                        if (temp < 0) {
                            return 0;
                        } else {
                            return temp;
                        }
                    });
                    await sound.setStatusAsync({
                        positionMillis: position,
                    });
                }}
                style={styles.button2}
            >
                <Text style={styles.buttonText}>5s backward</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={async () => {
                    const position = await sound.getStatusAsync().then(async (r) => {
                        const temp = r.positionMillis + 5000;
                        const duration = await sound.getStatusAsync().then(r => r.durationMillis);
                        if (temp > duration) {
                            return duration;
                        } else {
                            return temp;
                        }
                    });
                    await sound.setStatusAsync({
                        positionMillis: position,
                    });
                }}
                style={styles.button2}
            >
                <Text style={styles.buttonText}>5s forward</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={() => {
                setSound(null);
            }}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity></View>
    </> : null}
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height:"100%"
    },
    buttonSout: {
        backgroundColor: '#0782F9',
        width: '25%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4,
        height:"10%"
    },
    button: {
        backgroundColor: '#0782F9',
        width: '20%',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        height:"50%"
    },
    button2: {
        backgroundColor: '#0782F9',
        width: '50%',
        padding: 15,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    scrollView: {
        width:"100%",
        height:"60%",
     
    
      },
})
