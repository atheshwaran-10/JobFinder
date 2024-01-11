import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { useSession } from "../context/ctx";
import { Text } from "react-native";
import { Search } from "lucide-react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import { TextInput } from "react-native";
import styles from "../styles/landingStyles";
import { ScreenHeaderBtn } from "../components";
import axios from "axios";
import { useRootNavigationState } from "expo-router";

const Home = () => {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [Password, setPassword] = useState("");
  const { signIn } = useSession();
    
  const handleSignIn2 = async () => {
    try {
     await signIn({ username: username, Password: Password });
     
   
    } catch (error) {
      // Handle errors if signIn fails
      console.error("Sign-in failed:", error);
    }
  };

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
          <TouchableOpacity style={styles.paginationButton} onPress={handleSignIn2}>
            <Text className="text-white text-lg">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center pt-5">
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="text-white text-lg underline pb-1">
              New User? Signup here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
