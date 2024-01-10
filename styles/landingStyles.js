import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  noOfSearchedJobs: {
    marginTop: 2,
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  loaderContainer: {
    marginTop: SIZES.medium,
  },

  loginText: {
    color: COLORS.white,
  },
  footerContainer: {
    marginTop: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  paginationButton: {
    width: 120,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.orange,
    borderColor: COLORS.white,
    borderWidth: 1,
  },
  paginationImage: {
    width: "60%",
    height: "60%",
    tintColor: COLORS.white,
  },
  paginationTextBox: {
    width: 390,
    height: 400,
    marginBottom: -SIZES.xxLarge,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginLeft: 12,
    marginTop: 15,
    width: "90%",
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginLeft: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  signupContainer: {
    fontFamily: FONT.regular,
    width: "100%",
    display:"flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    paddingVertical:SIZES.xxLarge,
  },
  signUpButton: {
    width: 180,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
  },
});

export default styles;
