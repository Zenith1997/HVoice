import React, {useEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {getAudioFileUri, getFileList} from "../Services/FileService";
import {Audio} from 'expo-av';
import {getAuth, signOut} from "firebase/auth"
import { ScrollView, Dimensions,SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';

const Width = Dimensions.get('window').width
const HomeScreen = ({navigation}) => {
    const auth = getAuth();

    const [fileList, setFileList] = React.useState([]);
    const [sound, setSound] = React.useState(null);
    const [ssound, setSSound] = React.useState();
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
    }, [sound],[ssound]);


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
   
    async function handleScroll() {
        return new Promise(async (resolve,reject)=>{
            console.log('Loading Sound');
            try{

            }catch(e){
                reject(e);
            }
            const { sound } = await Audio.Sound.createAsync(
               require('../assets/sounds/drag.wav')
            );
            setSSound(ssound);
        
            console.log('Playing Sound');
            await sound.playAsync(); 
            resolve()
          
        });}
  
    
    
    return (

    
       
        <View style={styles.container}>
       
            
        <TouchableOpacity
        onPress={handleSignOut}
        style={styles.buttonSout}
    >
        <Text style={styles.buttonTextSout}>Sign out</Text>
    </TouchableOpacity>
           
           <ScrollView 
           onScrollBeginDrag ={handleScroll}
           
           pagingEnabled={true}
          
           
           horizontal ={true}
           style = {styles.scrollView}>
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
        })}
            
           </ScrollView>
   
          
          
           
           
            {sound ? <>
                <View style= {styles.controller}>
                <View style={{display: "flex", width: "35%", flexDirection: "row",height:"50%"}}>
  
                <TouchableOpacity
                    onPress={() => {
                
                        handleScroll();
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
                    
                    setSound(null);
                    handleScroll();
                }}
                style={styles.button1}
            >
                <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                       
                        
                        setIsPlaying(true);
                      
                        sound.setStatusAsync({
                            shouldPlay: true
                          
                            
                        });
                     handleScroll();
                    }}
                    style={styles.button2}
                    disabled={isPlaying}
                >
                    <Text style={styles.buttonText}>Resume</Text>
                </TouchableOpacity>
            </View>
            <View  style={{display: "flex", width: "50%", flexDirection: "row",height:"50%"}}>
                <TouchableOpacity
                    onPress={async () => {
                        await handleScroll();
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
                    style={styles.button3}
                >
                    <Text style={styles.buttonText}>5s backward</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        await handleScroll();
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
                    style={styles.button3}
                >
                    <Text style={styles.buttonText}>5s forward</Text>
                </TouchableOpacity>
            </View>
         
              
                </View>
                
                
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
     buttonSout: {
         display:"flex",
        backgroundColor: '#0782F9',
        height:'5%',
        padding: 10,
        borderRadius: 10,
        width:"40%",
        marginBottom:0,
        marginTop:40,
        marginLeft:150,
        justifyContent:"center",
        alignItems:"center"
       
     
    },
    button: {
        backgroundColor: '#0782F9',
        
        height:'70%',
        width:Width,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop:50,
        marginRight:0,
        marginLeft:3


    },
    button1: {
        backgroundColor: '#0782F9',
        width: '100%',
        height:'100%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4,
    },
    button2: {
        backgroundColor: 'green',
        width: '90%',
        paddingVertical:50,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
    },
    button3: {
        backgroundColor: 'black',
        width: '100%',
        padding: 40,
     
        borderRadius: 10,
        alignItems: 'center',
        margin: 8,
    },
    
    buttonText: {
        paddingTop:50,
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonTextSout: {
        
        color: 'white',
        fontWeight: '100',
        fontSize: 20,
        justifyContent:"center",
        alignItems:"center"
    },
    scrollView:{
        width:'100%',
        height:'70%',
        
       
        

    },
    controller:{
        height:'65%',
    }
})
