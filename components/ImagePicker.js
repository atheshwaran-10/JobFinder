import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";
import { COLORS, icons, images, SIZES } from "../constants";
import styles from "./common/header/screenheader.style";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function ImagePickerExample({image,setImage}) {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!image && (
        <View className="bg-red-500">
          <TouchableOpacity onPress={pickImage}>
            <Image style={styles.btnImg(100)} source={images.placeholder} />
          </TouchableOpacity>
        </View>
      )}
      {image && (
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: image }} style={styles.btnImg(100)} />
        </TouchableOpacity>
      )}
    </View>
  );
}
