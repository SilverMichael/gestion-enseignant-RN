import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";

const ModalComponent = ({
  isVisible,
  setIsVisible,
  modalTitle,
  dataToAdd,
  setDatatoAdd,
  addData,
  updateData,
  update,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={[{ fontSize: 20 }]}>{modalTitle?.toUpperCase()}</Text>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.form}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Nom"
                value={dataToAdd?.nom}
                onChangeText={(text) => {
                  setDatatoAdd({
                    ...dataToAdd,
                    nom: text,
                  });
                }}
              />
              <Text style={styles.label}>Nombre d'heures</Text>
              <TextInput
                style={styles.textInput}
                placeholder={"0"}
                inputMode="numeric"
                value={
                  dataToAdd?.nbheures ? dataToAdd?.nbheures?.toString() : ""
                }
                keyboardType="numeric"
                onChangeText={(text) => {
                  setDatatoAdd({
                    ...dataToAdd,
                    nbheures: parseFloat(text),
                  });
                }}
              />
              <Text style={styles.label}>Taux horaires</Text>
              <TextInput
                style={styles.textInput}
                placeholder={"0"}
                inputMode="numeric"
                value={
                  dataToAdd?.tauxhoraires
                    ? dataToAdd?.tauxhoraires?.toString()
                    : ""
                }
                keyboardType="numeric"
                onChangeText={(text) => {
                  setDatatoAdd({
                    ...dataToAdd,
                    tauxhoraires: parseFloat(text),
                  });
                }}
              />
            </View>
          </View>
          <View style={styles.modalFooter}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Text>Annuler</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                update ? updateData() : addData();
                setIsVisible(!isVisible);
              }}
            >
              <Text>{update ? "Confirmer" : "Ajouter"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  dropDownBtnStyle: {
    // flex:1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    borderBottomColor: "#444",
    width: "100%",
    marginBottom: 10,
    borderStyle: "solid",
  },
  label: {
    fontSize: 15,
  },
  form: {},
  textInput: {
    borderStyle: "solid",
    borderWidth: 0.2,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    height: 40,
    marginBottom: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
  },
  modalTitle: {
    borderBottomColor: "#000",
    borderWidth: 0.5,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    width: "100%",
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    width: "80%",
  },
  modalFooter: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginHorizontal: 8,
  },
});
