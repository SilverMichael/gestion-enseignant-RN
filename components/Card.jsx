import { useState, useRef } from "react";
import { Pressable } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  PanResponder,
} from "react-native";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ModalComponent from "./Modal";

const { width, height } = Dimensions.get("window");

const Card = ({
  num,
  nom,
  nbheures,
  tauxhoraires,
  dataToUpdate,
  setDataToUpdate,
  onDelete,
  onUpdate,
}) => {
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
    if (success && e.duration > 500) {
      console.log(num);
      setIsUpdateVisible(true);
    }
  });
  const position = useSharedValue(0);

  const flingGestureLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart((e) => {
      if (position.value < -140) {
        position.value = 0;
      } else {
        position.value = withTiming(position.value - 77, { duration: 50 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));
  return (
    <GestureDetector gesture={flingGestureLeft}>
      <GestureDetector gesture={longPressGesture}>
        <Animated.View
          style={[animatedStyle]}
          children={
            <View
              style={[
                styles.container,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <ModalComponent
                isVisible={isUpdateVisible}
                setIsVisible={setIsUpdateVisible}
                modalTitle={"Modifier Matériel"}
              />
              <View style={styles.cardContainer}>
                <Text style={{ width: "10%" }}>ENS-{num}</Text>
                <Text style={{ width: "15%" }}>{nom}</Text>
                <Text style={{ width: "10%" }}>{nbheures}</Text>
                <Text style={{ width: "10%" }}>{tauxhoraires}</Text>
                <Text style={{ width: "20%" }}>{nbheures * tauxhoraires} Ar</Text>
                
              </View>
              <View style={styles.action}>
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => {
                    onDelete(num);
                  }}
                >
                  <Text>DEL</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonUpdate]}
                  onPress={() => {
                    onUpdate(num, nom, nbheures, tauxhoraires);
                  }}
                >
                  <Text>MOD</Text>
                </Pressable>
              </View>
            </View>
          }
        />
      </GestureDetector>
    </GestureDetector>
  );
};

export default Card;

const styles = StyleSheet.create({
  buttonDelete: {
    backgroundColor: "red",
  },
  buttonUpdate: {
    backgroundColor: "#2196F3",
  },
  button: {
    width: "50%",
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  container: {
    position: "relative",
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 140,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 3,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#fff",
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
  },
  cardContainer: {
    borderWidth: 0.5,
    margin: 3,
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
  neon: {
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },
});
