import * as React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profile}>
            <View style={styles.profile}>
              <Text style={[styles.textlabelBusinessAddressDet, styles.textlabelTypo1]}>Business Address Details</Text>
              <Text style={[styles.textlabelPersonalDetials, styles.textlabelTypo1]}>Personal Details</Text>
              <Text style={[styles.textlabelBankAccountDetails, styles.textlabelTypo1]}>Bank Account Details</Text>
              <View style={[styles.viewLine22, styles.viewLayout1]} />
              <View style={[styles.viewLine23, styles.viewLayout1]} />
              <View style={[styles.viewRectangle65, styles.viewLayout]} />
              <View style={[styles.viewRectangle81, styles.viewLayout]} />
              <View style={[styles.viewRectangle72, styles.viewLayout]} />
              <View style={[styles.viewRectangle80, styles.viewLayout]} />
              <View style={[styles.viewRectangle73, styles.viewLayout]} />
              <View style={[styles.viewRectangle74, styles.viewLayout]} />
              <View style={[styles.viewRectangle66, styles.viewLayout]} />
              <View style={[styles.viewRectangle82, styles.viewLayout]} />
              <View style={[styles.viewRectangle67, styles.viewLayout]} />
              <View style={[styles.viewRectangle68, styles.viewLayout]} />
              <Text style={[styles.textlabel450116, styles.textlabelPosition]}>450116</Text>
              <Text style={[styles.textlabel4501162, styles.checkoutTypo]}>aashifa@gmail.com</Text>
              <Text style={[styles.textlabel204356xxxxxxx, styles.textlabelPosition]}>204356XXXXXXX</Text>
              <Text style={[styles.textlabelAbhirajSisodiya, styles.textlabelPosition]}>Abhiraj Sisodiya</Text>
              <Text style={[styles.textlabelSbin00428, styles.textlabelPosition]}>SBIN00428</Text>
              <Text style={[styles.textlabel443AshokNagar, styles.textlabel443Typo]}>{`216 St Paul's Rd, `}</Text>
              <Text style={[styles.textlabel443AshokNagar2, styles.textlabel443Typo]}>***********</Text>
              <Text style={[styles.textlabelIndore, styles.textlabelIndoreFlexBox]}>London</Text>
              <Text style={styles.textlabelMadhyaPradesh}>N1 2LL,</Text>
              <Text style={[styles.textlabelIndia, styles.textlabelPosition]}>United Kingdom</Text>
              <Text style={[styles.textlabelPincode, styles.textlabelTypo]}>Pincode</Text>
              <Text style={[styles.textlabelEmailAddress, styles.textlabelTypo]}>Email Address</Text>
              <Text style={[styles.textlabelBankAccountNumber, styles.textlabelTypo]}>Bank Account Number</Text>
              <Text style={[styles.textlabelCountry, styles.textlabelTypo]}>Country</Text>
              <Image style={[styles.viewVector33Icon, styles.capacityLayout]} resizeMode="cover" />
              <Text style={[styles.textlabelAccountHoldersNam, styles.textlabelTypo]}>Account Holder’s Name</Text>
              <Text style={[styles.textlabelIfscCode, styles.textlabelTypo]}>IFSC Code</Text>
              <Text style={[styles.textlabelAddress, styles.textlabelTypo]}>Address</Text>
              <Text style={[styles.textlabelPassword, styles.textlabelTypo]}>Password</Text>
              <Text style={styles.textlabelPassword2}>Change Password</Text>
              <Text style={[styles.textlabelCity, styles.textlabelTypo]}>City</Text>
              <View style={[styles.buttonSaveprofileSelf, styles.textlabelIndoreFlexBox]}>
                <Text style={[styles.textlabelLargeLabelMedium1, styles.textlabelFlexBox]}>Save</Text>
              </View>
              <Text style={[styles.textlabelState, styles.textlabelTypo]}>State</Text>
              <Image style={styles.groupProfileIcon} resizeMode="cover" />
              <Image style={styles.groupGroupIcon} resizeMode="cover" />
              <View style={[styles.barsStatusBarDesignL, styles.timePosition]}>
                <View style={styles.batteryParent}>
                </View>
              </View>
              <Text style={[styles.checkout, styles.timeFlexBox]}>Checkout</Text>
              <Image style={[styles.profileChild, styles.capacityLayout]} resizeMode="cover" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  textlabelTypo1: {
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  viewLayout1: {
    height: 0.5,
    width: 327.5,
    borderTopWidth: 1,
    borderColor: "#c4c4c4",
    borderStyle: "solid",
    left: 23.75,
    position: "absolute"
  },
  viewLayout: {
    height: 48,
    width: 327,
    borderColor: "#c8c8c8",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    left: 24,
    position: "absolute"
  },
  textlabelPosition: {
    height: 20,
    left: 44,
    color: "#000",
    position: "absolute"
  },
  checkoutTypo: {
    lineHeight: 22,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  textlabel443Typo: {
    width: 184,
    height: 20,
    left: 44,
    textAlign: "left",
    color: "#000",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
    position: "absolute"
  },
  textlabelIndoreFlexBox: {
    alignItems: "center",
    position: "absolute"
  },
  textlabelTypo: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    textAlign: "left",
    color: "#000",
    left: 24,
    position: "absolute"
  },
  capacityLayout: {
    borderRadius: 1,
    position: "absolute"
  },
  textlabelFlexBox: {
    letterSpacing: 0.1,
    textAlign: "left"
  },
  timePosition: {
    left: "0%",
    width: "100%"
  },
  borderLayout: {
    height: "100%",
    position: "absolute"
  },
  timeFlexBox: {
    textAlign: "center",
    color: "#000",
    position: "absolute"
  },
  profile: {
    height: 1657,
  },
  textlabelBusinessAddressDet: {
    top: 570,
    color: "#000",
    left: 24,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    position: "absolute",
    fontSize: 16
  },
  textlabelPersonalDetials: {
    top: 245,
    fontSize: 18,
    color: "#000",
    left: 24,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    position: "absolute"
  },
  textlabelBankAccountDetails: {
    top: 1180,
    color: "#000",
    left: 24,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    position: "absolute",
    fontSize: 16
  },
  viewLine22: {
    top: 535.75
  },
  viewLine23: {
    top: 1147.75
  },
  viewRectangle65: {
    top: 642
  },
  viewRectangle81: {
    top: 317
  },
  viewRectangle72: {
    top: 1254
  },
  viewRectangle80: {
    top: 1066
  },
  viewRectangle73: {
    top: 1360
  },
  viewRectangle74: {
    top: 1466
  },
  viewRectangle66: {
    top: 748
  },
  viewRectangle82: {
    top: 423
  },
  viewRectangle67: {
    top: 854
  },
  viewRectangle68: {
    top: 960
  },
  textlabel450116: {
    top: 656,
    width: 149,
    height: 20,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  textlabel4501162: {
    top: 331,
    fontSize: 13,
    letterSpacing: 0.1,
    textAlign: "left",
    height: 20,
    left: 44,
    color: "#000",
    position: "absolute",
    width: 149
  },
  textlabel204356xxxxxxx: {
    top: 1268,
    width: 149,
    height: 20,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  textlabelAbhirajSisodiya: {
    top: 1374,
    width: 176,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  textlabelSbin00428: {
    top: 1480,
    width: 149,
    height: 20,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  textlabel443AshokNagar: {
    top: 765,
    lineHeight: 14,
    fontSize: 16
  },
  textlabel443AshokNagar2: {
    top: 437,
    fontSize: 14
  },
  textlabelIndore: {
    top: 865,
    display: "flex",
    width: 132,
    height: 29,
    lineHeight: 14,
    fontSize: 16,
    left: 44,
    alignItems: "center",
    textAlign: "left",
    color: "#000",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  textlabelMadhyaPradesh: {
    top: 975,
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    lineHeight: 14,
    height: 20,
    width: 149,
    fontSize: 14,
    left: 44,
    textAlign: "left",
    color: "#000",
    position: "absolute"
  },
  textlabelIndia: {
    top: 1080,
    width: 149,
    height: 20,
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600"
  },
  textlabelPincode: {
    top: 612
  },
  textlabelEmailAddress: {
    top: 287
  },
  textlabelBankAccountNumber: {
    top: 1224
  },
  textlabelCountry: {
    top: 1036
  },
  viewVector33Icon: {
    top: 979,
    left: 320,
    width: 20,
    height: 10
  },
  textlabelAccountHoldersNam: {
    top: 1330
  },
  textlabelIfscCode: {
    top: 1436
  },
  textlabelAddress: {
    top: 718
  },
  textlabelPassword: {
    top: 393
  },
  textlabelPassword2: {
    top: 485,
    left: 247,
    textDecorationLine: "underline",
    fontFamily: "PlusJakartaSans-Medium",
    color: "#f83758",
    textAlign: "right",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute"
  },
  textlabelCity: {
    top: 824
  },
  buttonSaveprofileSelf: {
    marginTop: 720,
    width: "87.2%",
    right: "6.4%",
    left: "6.4%",
    backgroundColor: "#f83758",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 14,
    top: "50%",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden"
  },
  textlabelLargeLabelMedium1: {
    lineHeight: 24,
    fontFamily: "PlusJakartaSans-SemiBold",
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.1
  },
  textlabelState: {
    top: 930
  },
  groupProfileIcon: {
    height: "5.91%",
    width: "27.47%",
    top: "7.18%",
    right: "36%",
    bottom: "86.9%",
    left: "36.53%",
    position: "absolute"
  },
  groupGroupIcon: {
    height: "0.88%",
    width: "3.73%",
    top: "11.71%",
    right: "38.4%",
    bottom: "87.42%",
    left: "57.87%",
    position: "absolute"
  },
  barsStatusBarDesignL: {
    height: "2.66%",
    right: "0%",
    bottom: "97.34%",
    top: "0%",
    position: "absolute"
  },
  batteryParent: {
    height: "25.68%",
    top: "39.39%",
    right: 14.3,
    bottom: "34.93%",
    width: 66.66,
    position: "absolute"
  },
  battery: {
    top: "0.02%",
    right: 0.07,
    bottom: "-0.02%",
    width: 24.33
  },
  border: {
    right: 2.3,
    bottom: "0%",
    borderRadius: 3,
    borderColor: "#000",
    width: 22,
    opacity: 0,
    top: "0%",
    borderWidth: 1,
    height: "100%",
    borderStyle: "solid"
  },
  capIcon: {
    height: "35.4%",
    top: "32.45%",
    right: 0,
    bottom: "32.15%",
    width: 1.33,
    opacity: 0,
    position: "absolute"
  },
  capacity: {
    height: "64.6%",
    top: "17.7%",
    right: 4.3,
    bottom: "17.7%",
    backgroundColor: "#000",
    width: 18
  },
  wifiIcon: {
    height: "97.35%",
    right: 29.4,
    bottom: "2.65%",
    width: 15.33,
    top: "0%",
    position: "absolute"
  },
  cellularConnectionIcon: {
    height: "94.69%",
    top: "2.98%",
    right: 49.7,
    bottom: "2.33%",
    width: 17,
    position: "absolute"
  },
  timeStyle: {
    height: "47.73%",
    top: "15.91%",
    bottom: "36.36%",
    left: 21,
    width: 54,
    position: "absolute"
  },
  time: {
    marginTop: -4,
    letterSpacing: -0.24,
    lineHeight: 20,
    fontStyle: "italic",
    fontWeight: "100",
    fontFamily: "Montserrat-ThinItalic",
    left: "0%",
    width: "100%",
    fontSize: 15,
    top: "50%"
  },
  checkout: {
    marginLeft: -44,
    top: "3.98%",
    left: "50%",
    lineHeight: 22,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
    fontSize: 18
  },
  profileChild: {
    top: 67,
    left: 22,
    width: 9.5,
    height: 19
  }
});

export default Profile;
