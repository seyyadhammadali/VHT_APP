import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import FooterTabs from "../components/FooterTabs";
import Input from "../components/forms/Input";
import Loader from "../components/forms/Loader";
import { useFormSubmissionMutation } from "../redux/slices/apiSlice";
import { mainStyles } from "../constants/theme";

const QuoteForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    phone: "",
    departure_date: "",
    return_date: "",
    preferred_airport: "",
    passengers: "",
    time_to_call: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState({});

  const [formSubmission, { isLoading, isSuccess, isError, error, reset }] = useFormSubmissionMutation();
  
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
      "email",
      "phone",
      "departure_date",
      "preferred_airport",
      "passengers",
      "message",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] =
          field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ") +
          " is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = () => {
    if (!validateForm()) return;

    formSubmission({
      page_type: "quote_form",
      ...formData,
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
          email: "",
          phone: "",
          departure_date: "",
          preferred_airport: "",
          passengers: "",
          message: "",
        });
        setErrors({});
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
      <Header title="Beat My Quote" showNotification navigation={navigation} />

      <ScrollView
        style={mainStyles.container}
        contentContainerStyle={mainStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Inputs */}
        <Input
          label="Your Name"
          placeholder="Your Full Name"
          value={formData.firstname}
          setValue={(val) => handleChange("firstname", val)}
          error={errors.firstname}
        />

        <Input
          label="Email Address"
          placeholder="Enter Email Address"
          value={formData.email}
          setValue={(val) => handleChange("email", val)}
          error={errors.email}
          keyboardType="email-address"
        />

        <Input
          label="Phone Number"
          placeholder="Enter Phone Number"
          value={formData.phone}
          setValue={(val) => handleChange("phone", val)}
          error={errors.phone}
          keyboardType="phone-pad"
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
            label="Departure Date"
            placeholder="dd/mm/yy"
            value={formData.departure_date}
            setValue={(val) => handleChange("departure_date", val)}
            error={errors.departure_date}
            editable={false}
            type="date"
          />

          <Input
            label="Passengers"
            placeholder="Person"
            value={formData.passengers}
            setValue={(val) => handleChange("passengers", val)}
            error={errors.passengers}
            editable={false}
            options={["1 - 4", "5 - 9", "10+"]}
            type="dropdown"
          />
        </View>

        <Input
          label="Your Message"
          placeholder="Short Description about your query"
          value={formData.message}
          setValue={(val) => handleChange("message", val)}
          error={errors.message}
          type="textarea"
        />

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
});

export default QuoteForm;