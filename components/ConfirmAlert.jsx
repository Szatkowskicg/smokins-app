import { Alert } from 'react-native'

export default function ConfirmAlert(title, message, onConfirm) {
    Alert.alert(
        title,
        message,
        [
          {
            text: "Anuluj",
            style: "cancel",
          },
          {
            text: "Potwierdź",
            onPress: () => {
              onConfirm();
            }
          },
        ],
        { cancelable: false }
      );
}
