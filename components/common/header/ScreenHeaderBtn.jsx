import { Image, TouchableOpacity } from "react-native";

import styles from "./screenheader.style";
import { images } from "../../../constants";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress,className }) => {
  return (
    <TouchableOpacity className="bg-red-600" style={styles.btnContainer2} onPress={handlePress}>
      <Image
        className="h-[120px] w-[120px] rounded-full bg-red-50"
        source={iconUrl ? iconUrl : images.placeholder}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
