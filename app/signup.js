import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import * as React from "react";
import { Text } from "react-native";
import { Search } from "lucide-react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { TextInput } from "react-native";
import styles from "../styles/landingStyles";
//import ImagePickerExample from "../components/ImagePicker";
import axios from "axios";

const Home = () => {
  const router = useRouter();
  const [username, setusername] = useState("");
  const[name,setName]=useState("");
  const [Password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  
  const handleSignUp=async()=>{
    const url=process.env.EXPO_PUBLIC_SERVER_URL+"/register"
    console.log(url);
    const res = await axios.post(url, {
      username: username,
      password: Password,
      name: name,
      imageUrl: image,
    });
    if(res.statusText==="Created")
    {
      // const storeRefreshToken = async (token) =>setItemAsync("username", username);
      router.push("/signin")
    }
    else
    {
      console.log("Duplicate User")
    }

    console.log(res);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.orange }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.orange },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.paginationTextBox}>
          <Search color="white" size={148} />
          <Text style={styles.paginationText}>JobFinder</Text>
        </View>
        {/* <ImagePickerExample image={image} setImage={setImage} /> */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter Your Name"
            />
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={username}
              onChangeText={(text) => setusername(text)}
              placeholder="Enter Your Username"
            />
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              className=""
              style={styles.searchInput}
              value={Password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter Your Password"
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={handleSignUp}
          >
            <Text className="text-white text-lg">Signup</Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center pt-5">
          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text className="text-white text-lg underline pb-1">
              Existing User? Login here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
