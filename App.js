import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import styles from "./styles.js";
import ImageResizer from 'react-native-image-resizer';


export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  //const [resize, setResize] = useState(false);



  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  /*
  useEffect(() => {
    (async () => {
      ImageResizer.createResizedImage(photo.uri, 240, 240, 'JPEG', 90, 0).then((response) => {
        resizePhoto = response.uri;
        setPhoto(resizePhoto);
      }).catch((err) => {
        alert(err);
      })
    })();
  }, [resize]);
  */

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };



  if (photo) {
    //setResize(true);
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} resizeMode="contain"/>

        <TouchableOpacity style={styles.buttonShare} onPress={sharePic}>
          <FontAwesome name="share" size={23} color="#fff"></FontAwesome>
        </TouchableOpacity>

        {hasMediaLibraryPermission ? 
        <TouchableOpacity style={styles.buttonSave} onPress={savePhoto}>
          <FontAwesome name="save" size={23} color="#fff"></FontAwesome>
        </TouchableOpacity> : undefined}
        
        <TouchableOpacity style={styles.buttonDelet} onPress={() => setPhoto(undefined)}>
          <FontAwesome name="trash" size={23} color="#fff"></FontAwesome>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <Camera style={styles.camera} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCamera} onPress={takePic}>
          <FontAwesome name="camera" size={27} color="#fff"></FontAwesome>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
    </SafeAreaView>
  );
}

