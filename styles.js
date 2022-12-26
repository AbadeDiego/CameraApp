import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      height: "100%",
      width: "100%",
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: "transparent",
      flexDirection: "row",
    },
    buttonCamera:{
      position: "absolute",
      bottom: 20,
      right: 150,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      margin: 20,
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    buttonShare:{
      position: "absolute",
      bottom: 20,
      right: 220,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      margin: 20,
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    buttonSave:{
      position: "absolute",
      bottom: 20,
      right: 150,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      margin: 20,
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    buttonDelet:{
      position: "absolute",
      bottom: 20,
      right: 80,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      margin: 20,
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    preview: {
      width: 400,
      height: 400,
      // Without height undefined it won't work      height: undefined,
      // figure out your image aspect ratio      aspectRatio: 135 / 76,
    }
  });

export default styles