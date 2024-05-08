import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  Platform
} from "react-native";

// import { API_URL } from "@env";
import { URL } from "../../constant/port";

import Card from "../../components/Card";
import ModalComponent from "../../components/Modal";

import axios from "axios";
const { width, height } = Dimensions.get("window");

const Homescreen = () => {
  const [dataToAdd, setDataToAdd] = useState({
    nom: "",
    nbheures: 0,
    tauxhoraires: 0,
  });
  const [dataToUpdate, setDataToUpdate] = useState({
    num: "",
    nom: "",
    nbheures: 0,
    tauxhoraires: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [dataEnseignant, setDataEnseignant] = useState();
  const [afterAdd, setAfterAdd] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const showData = async () => {
    try {
      const response = await axios.get(`${URL}/`);
      setDataEnseignant(response.data);
    } catch (error) {
      console.error("error:", error.message);
    }
  };

  useEffect(() => {
    showData();
    // showData()
  }, [afterAdd]);

  const addEnseignant = async () => {
    const response = await axios.post(`${URL}/add`, dataToAdd);
    setAfterAdd(!afterAdd);
  };

  const deleteEnseignant = async (num) => {
    const response = await axios.delete(`${URL}/delete/${num}`);
    setAfterAdd(!afterAdd);
  };

  const updateEnseignant = async (num, nom, nbheures, tauxhoraires) => {
    setIsUpdate(true);
    setDataToUpdate({
      num,
      nom,
      nbheures,
      tauxhoraires,
    });
    setIsVisible(true);
  };

  const confirmUpdtate = async () => {
    console.log("confirm update");
    console.log(dataToUpdate);
    const response = await axios.put(`${URL}/update`, dataToUpdate);
    setAfterAdd(!afterAdd);
    setIsUpdate(false);
  };

  var total = dataEnseignant?.reduce((accumulator, enseignant)=> accumulator + (enseignant.tauxhoraires * enseignant.nbheures ), 0 )
  var maxSalaire = dataEnseignant?.reduce((max, enseignant)=> Math.max(max, (enseignant.nbheures * enseignant.tauxhoraires)), 0)
  var minSalaire = dataEnseignant?.reduce((min, enseignant)=> Math.min(min, (enseignant.nbheures * enseignant.tauxhoraires) ), Infinity)
  return (
    <View style={styles.container}>
      <ScrollView>
            
        {dataEnseignant?.map((enseignant, index) => {
            console.log(enseignant)
          return (
            <Card
              key={index}
              num={enseignant.numens}
              nom={enseignant.nom}
              nbheures={enseignant.nbheures}
              tauxhoraires={enseignant.tauxhoraires}
              dataToUpdate={dataToUpdate}
              setDataToUpdate={setDataToUpdate}
              onDelete={deleteEnseignant}
              onUpdate={updateEnseignant}
            />
          )
        })}

        <View style={styles.cardContainer}>
            <Text>Salaire Minimal :  {minSalaire} Ar </Text>
        </View>
        <View style={styles.cardContainer}>
            <Text>Salaire Maximal : {maxSalaire} Ar</Text>
        </View>
        <View style={styles.cardContainer}>
            <Text>Salaire Total : {total} Ar</Text>
        </View>
      </ScrollView>
      <Pressable
        style={({ pressed }) => [
          styles.buttonAdd,
          { opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Text style={styles.buttontext}>+</Text>
      </Pressable>
      <ModalComponent
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        modalTitle={isUpdate ? "Modification Enseignant" : "Ajout Enseignant"}
        dataToAdd={isUpdate ? dataToUpdate : dataToAdd}
        setDatatoAdd={isUpdate ? setDataToUpdate : setDataToAdd}
        addData={addEnseignant}
        updateData={confirmUpdtate}
        update={isUpdate ? true : false}
      />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
  },
  buttonAdd: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92bde4",
    borderColor: "#92bde4",
    position: "absolute",
    bottom: 50,
    right: 30,
  },
  buttontext: {
    fontSize: 45,
    fontWeight: "400",
    color: "#495e72",
  },
  cardContainer: {
    borderWidth: 0.5,
    marginHorizontal: 3,
    width: width,
    marginTop: 10,
    padding: 10,
    height: 70,
    borderRadius: 10,
    borderColor: "#fff",
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
    }),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
