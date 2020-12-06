import Toast from "react-native-toast-message";

const notImplementedError = () => {
  Toast.show({
    text1: "Not Yet Implemented",
    type: 'error',
  });
};

export default notImplementedError;