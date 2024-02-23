import { StyleSheet, Text, View, Pressable, Modal, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import Hyperlink from "react-native-hyperlink";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QrListContext } from "../Context/QrListContext";
import * as Crypto from "expo-crypto";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
  const isFocused = useIsFocused();
  const { qrList, setQrList, getUser } = useContext(QrListContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    setScanData(undefined);
  }, []);

  const storeUser = async () => {
    try {
      const objectData = [...qrList, { id: Crypto.randomUUID(), scanData }];
      await AsyncStorage.setItem("user", JSON.stringify(objectData));
      setQrList(objectData);
      getUser();
      setScanData(undefined);
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error);
    }
  };

  if (!hasPermission) {
    return (
      <View style={{ paddingTop: 20 }}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanData(data);
    console.log(`Data : ${data}`);
    setModalVisible(!modalVisible);
  };

  const modalCancel = () => {
    setScanData(undefined);
    setModalVisible(!modalVisible);
  };
  console.log(qrList);
  return (
    <>
      {isFocused && (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={require("../../assets/qr-code.png")}
                    style={{ width: 120, height: 120 }}
                  />
                  <Hyperlink linkDefault={true}>
                    <Text
                      style={{
                        width: 250,
                        height: 100,
                        overflow: "hidden",

                        marginTop: 5,
                      }}
                      numberOfLines={5}
                    >
                      <Text
                        style={{
                          color: "pink",
                          fontWeight: "500",
                          fontSize: 15,
                        }}
                      >
                        Scan info :
                      </Text>
                      {scanData}
                    </Text>
                  </Hyperlink>
                </View>
                <View
                  style={{
                    marginTop: "auto",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <Pressable
                    onPress={modalCancel}
                    style={{
                      backgroundColor: "#2196F3",
                      width: 100,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={storeUser}
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#2196F3",
                      width: 100,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>Save</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <BarCodeScanner
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
          />
          {!scanData && (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: "red",
                fontSize: 21,
                marginTop: 21,
              }}
            >
              SCANNING....
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
