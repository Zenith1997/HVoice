import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function PlayerScreen() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        
        resizeMode="stretch"
        useNativeControls
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
           <Button
          title="back"
          onPress={() =>
            video.current.stopAsync()
          }
        />

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

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 320,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});