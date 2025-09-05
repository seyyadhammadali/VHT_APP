import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Plan from "../assets/images/plane.svg";
import Header from "../components/Header";
import FooterTabs from "../components/FooterTabs";
import Input from "../components/forms/Input";
import Loader from "../components/forms/Loader";
import { useFormSubmissionMutation } from "../redux/slices/apiSlice";
import { mainStyles } from "../constants/theme";

const Inquire = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    departure_date: "",
    return_date: "",
    preferred_airline: "",
    preferred_airport: "",
    no_child: "",
    no_adult: "",
    quote_price: "",
    time_to_call: "",
    message: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState({});

  const [formSubmission, { isLoading, isSuccess, isError, error, reset }] =
    useFormSubmissionMutation();

  const airportOptions = [
    "Any London",
    "London Heathrow",
    "London Gatwick",
    "London Stansted",
    "Birmingham",
    "East Midlands",
    "Manchester",
    "Liverpool",
    "Newcastle",
    "Glasgow",
    "Edinburgh",
    "Aberdeen",
    "Dublin",
    "Belfast",
    "Cardiff",
  ];

  // generic input handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // validation
  const validateForm = () => {
    const requiredFields = [
      "firstname",
      "lastname",
      "email",
      "phone",
      "departure_date",
      "return_date",
      "preferred_airline",
      "preferred_airport",
      "no_child",
      "no_adult",
      "time_to_call",
      "quote_price",
      "message",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] =
          field.charAt(0).toUpperCase() + field.slice(1) + " is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = () => {
    if (!validateForm()) return;

    formSubmission({
      page_type: "inquiry_form",
      ...formData,
      opt_in: isChecked ? 1 : 0,
    });
  };

  // after submission
  useEffect(() => {
    let timer;
    if (isSuccess || isError) {
      setModalVisible(true);
      reset();

      if (isSuccess) {
         setModal({
          title:"Form Submitted!",
          message:"Your form has been submitted successfully. We will contact you soon.",
          type:"green"
        });
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          departure_date: "",
          return_date: "",
          preferred_airline: "",
          preferred_airport: "",
          no_child: "",
          no_adult: "",
          quote_price: "",
          time_to_call: "",
          message: "",
        });
        setErrors({});
        setIsChecked(false);
      } else if (isError) {
       setModal({
          title:"Something went wrong!",
          message:"Please try again or try our live support chat.",
          type:"red"
        });
      }

      timer = setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isSuccess, isError, reset]);

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={mainStyles.safeArea}>
      <Header title="Inquiry Form" showNotification navigation={navigation} />

      <ScrollView
        style={mainStyles.container}
        contentContainerStyle={mainStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View>
          <View style={styles.pakageViewB}>
            <Plan style={{ paddingVertical: 15, paddingHorizontal: 10 }} />
            <Text style={styles.sectionTitleFoodB}>Request a Quote</Text>
          </View>
          <Text style={styles.description}>
            Please fill out the information below to get a personalized quote for
            your trip. We will get back to you within 24 hours.
          </Text>
        </View>

        {/* Inputs */}
        <Input
          label="First Name"
          placeholder="First Name Here"
          value={formData.firstname}
          setValue={(val) => handleChange("firstname", val)}
          error={errors.firstname}
        />
        <Input
          label="Last Name"
          placeholder="Last Name Here"
          value={formData.lastname}
          setValue={(val) => handleChange("lastname", val)}
          error={errors.lastname}
        />
        <Input
          label="Email Account"
          placeholder="Your Email Address Here"
          value={formData.email}
          setValue={(val) => handleChange("email", val)}
          error={errors.email}
          keyboardType="email-address"
        />
        <Input
          label="Phone Number"
          placeholder="Your Phone Number Here"
          value={formData.phone}
          setValue={(val) => handleChange("phone", val)}
          error={errors.phone}
          keyboardType="phone-pad"
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Input
            label="Departure Date"
            placeholder="dd/mm/yy"
            value={formData.departure_date}
            setValue={(val) => handleChange("departure_date", val)}
            error={errors.departure_date}
            editable={false}
            type="date"
          />
          <Input
            label="Return date"
            placeholder="dd/mm/yy"
            value={formData.return_date}
            setValue={(val) => handleChange("return_date", val)}
            error={errors.return_date}
            editable={false}
            type="date"
          />
        </View>

        <Input
          label="Preferred Airline"
          placeholder="Preferred Airlines"
          value={formData.preferred_airline}
          setValue={(val) => handleChange("preferred_airline", val)}
          error={errors.preferred_airline}
        />

        <Input
          label="Which airport would you like to fly from?"
          placeholder="Select Airport"
          value={formData.preferred_airport}
          setValue={(val) => handleChange("preferred_airport", val)}
          error={errors.preferred_airport}
          editable={false}
          type="dropdown"
          options={airportOptions}
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Input
            label="No of Child"
            placeholder="Age 0-11 Months"
            value={formData.no_child}
            setValue={(val) => handleChange("no_child", val)}
            error={errors.no_child}
            editable={false}
            options={Array.from({ length: 6 }, (_, i) => i)}
            type="dropdown"
          />
          <Input
            label="No of Adult"
            placeholder="Age + 11 Months"
            value={formData.no_adult}
            setValue={(val) => handleChange("no_adult", val)}
            error={errors.no_adult}
            editable={false}
            options={Array.from({ length: 6 }, (_, i) => i)}
            type="dropdown"
          />
        </View>

        <Input
          label="Best Time To Call You"
          placeholder="e.g. 04:00 AM"
          value={formData.time_to_call}
          setValue={(val) => handleChange("time_to_call", val)}
          error={errors.time_to_call}
          editable={false}
          type="time"
        />

        <Input
          label="Package Price Limit"
          placeholder="£ 7000.00/pp"
          value={formData.quote_price}
          setValue={(val) => handleChange("quote_price", val)}
          error={errors.quote_price}
        />

        <Input
          label="Your Message"
          placeholder="Short Description about your query"
          value={formData.message}
          setValue={(val) => handleChange("message", val)}
          error={errors.message}
          type="textarea"
        />

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxTextOne}
          onPress={() => setIsChecked((prev) => !prev)}
        >
          <View
            style={[
              styles.checkboxStyle,
              { backgroundColor: isChecked ? "#000" : "transparent" },
            ]}
          >
            {isChecked && (
              <Image
                source={require("../assets/images/tickarrow.png")}
                style={styles.checktickImg}
                resizeMode="contain"
              />
            )}
          </View>
          <Text style={styles.checkboxLabel}>
            We’d love to keep you updated with our latest exclusive offers,
            exciting travel news, and special giveaways via email or Call. Please
            tick this box to opt in.
          </Text>
        </TouchableOpacity>

        {/* Privacy note */}
        <View style={styles.borderparagraph}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
            How will your <Text style={{ color: "#C28D3E" }}>data</Text> be used?
          </Text>
          <Text style={styles.paragraphline}>
            We at Virikson Holidays take your Privacy Seriously and never sell
            your details. We also ensure to keep your data secure and safe. We'd
            like to share discounts, promotions and latest Holiday Packages with
            your positive consent.
          </Text>
        </View>

        {isLoading && <Loader />}

        {/* Submit button */}
        <TouchableOpacity
          style={mainStyles.btnDefault}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={mainStyles.btnDefaultText}>Submit Enquiry</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  position: "absolute",
                  right: 0,
                  padding: 10,
                  height: 44,
                  width: 44,
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontSize: 18, transform: [{ rotate: "45deg" }] }}>
                  ✚
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.modalTitle,
                  { color: modal?.type || 'black' },
                ]}
              >
                {modal?.title}
              </Text>
              <Text style={styles.modalText}>{modal?.message || ''}</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pakageViewB: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#01BE9E14",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: "95%",
    marginBottom: 10,
  },
  sectionTitleFoodB: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "400",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  checkboxTextOne: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 15,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: "#232323",
    fontWeight: "400",
    lineHeight: 16,
  },
  checktickImg: {
    width: 14,
    height: 14,
    tintColor: "#fff",
  },
  checkboxStyle: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  paragraphline: {
    fontSize: 12,
    color: "#333",
    lineHeight: 16,
  },
  borderparagraph: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
});

export default Inquire;