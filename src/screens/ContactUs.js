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
import { mainStyles, COLORS } from "../constants/theme";

const ContactUs = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const [formSubmission, { isLoading, isSuccess, isError, error, reset }] =
    useFormSubmissionMutation();

  const validateForm = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = "First name is required.";
    if (!lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    if (!bestTime.trim()) newErrors.bestTime = "Best time to call is required.";
    if (!subject.trim()) newErrors.subject = "Subject is required.";
    if (!message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) return;
    formSubmission({
      page_type: "contact_form",
      firstname,
      lastname,
      email,
      phone,
      time_to_call: bestTime,
      subject,
      message,
    });
  };

  useEffect(() => {
    let timer;
    if (isSuccess || isError) {
      setModalVisible(true);
      reset();

      if (isSuccess) {
        setModalTitle("Form Submitted!");
        setModalMessage(
          "Your form has been submitted successfully. We will contact you soon."
        );
      } else if (isError) {
        setModalTitle("Something went wrong!");
        setModalMessage("Please try again or try our live support chat.");
      }
      
      timer = setTimeout(() => {
        setModalVisible(false);
        if (isSuccess) {
          setFirstname("");
          setLastname("");
          setEmail("");
          setPhone("");
          setBestTime("");
          setSubject("");
          setMessage("");
          setErrors({});
        }
      }, 2000);
    }
    
    return () => clearTimeout(timer);
  }, [isSuccess, isError, reset]);

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={mainStyles.safeArea}
    >
      <Header title="Contact Us" showNotification navigation={navigation} />

      <ScrollView
        style={mainStyles.container}
        contentContainerStyle={mainStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introTextWrapper}>
          <Text style={styles.introText}>
            If you need personal assistance, fill the form below, we will reply
            back to you asap!
          </Text>
        </View>

        <Input
          label="First Name"
          placeholder="First Name Here"
          value={firstname}
          setValue={setFirstname}
          error={errors.firstname}
        />
        <Input
          label="Last Name"
          placeholder="Last Name Here"
          value={lastname}
          setValue={setLastname}
          error={errors.lastname}
        />
        <Input
          label="Email Account"
          placeholder="Your Email Address Here"
          value={email}
          setValue={setEmail}
          error={errors.email}
          keyboardType="email-address"
        />
        <Input
          label="Phone Number"
          placeholder="Your Phone Number Here"
          value={phone}
          setValue={setPhone}
          error={errors.phone}
          keyboardType="phone-pad"
        />
        <Input
          label="Best Time To Call You"
          placeholder="e.g. 04:00 AM"
          value={bestTime}
          setValue={setBestTime}
          error={errors.bestTime}
          editable={false}
          type="time"
        />
        <Input
          label="Subject"
          placeholder="Subject"
          value={subject}
          setValue={setSubject}
          error={errors.subject}
        />
        <Input
          label="Your Message"
          placeholder="Short Description about what your query is about?"
          value={message}
          setValue={setMessage}
          error={errors.message}
          type="textarea"
        />

        {isLoading && <Loader />}

        <TouchableOpacity
          style={mainStyles.btnDefault}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={mainStyles.btnDefaultText}>Submit Enquiry</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{position:'absolute', right:0, padding:10, height:44, width:44,  alignItems:'flex-end'}}><Text style={{fontSize:18, transform: 'rotate(45deg)'}}>✚</Text></TouchableOpacity>
              <Text
                style={[
                  styles.modalTitle,
                  { color: isError ? "red" : "green" },
                ]}
              >
                {modalTitle}
              </Text>
              <Text style={styles.modalText}>{modalMessage}</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  introTextWrapper: {
    paddingHorizontal: 5,
    alignSelf: "center",
    width: "95%",
  },
  introText: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.secondaryText,
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
});

export default ContactUs;
