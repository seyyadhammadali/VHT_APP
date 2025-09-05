import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { COLORS, mainStyles } from "../../constants/theme";

function Input({
  label = null,
  placeholder = "",
  type = "input",
  error = null,
  editable = true,
  keyboardType = null,
  setValue = null,
  value = null,
  options = [],
}) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const formatTime = (date) => {
    if (type === "date") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      day = day.toString().padStart(2, "0");
      month = month.toString().padStart(2, "0");
      return `${day}-${month}-${year}`;
    } else if (type === "time") {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `${hours}:${minutes} ${ampm}`;
    } else {
      return date.toLocaleString();
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formatted = formatTime(selectedTime);
      setValue(formatted);
    }
  };

  return (
    <View style={{ gap: 5, flex: 1 }}>
      {label ? <Text style={mainStyles.label}>{label}</Text> : null}

      {/* Date & Time */}
      {["time", "date"].includes(type) ? (
        <>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => setShowTimePicker(true)}
          >
            <TextInput
              style={
                type === "textarea"
                  ? { ...mainStyles.input, height: 100, textAlignVertical: "top" }
                  : mainStyles.input
              }
              placeholder={placeholder}
              placeholderTextColor={COLORS.placeholderText}
              value={value}
              editable={false}
            />
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              mode={type}
              value={new Date()}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
            />
          )}
        </>
      ) : type === "textarea" ? (
        // Textarea
        <TextInput
          style={{ ...mainStyles.input, height: 120, textAlignVertical: "top" }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholderText}
          value={value}
          multiline
          keyboardType={keyboardType}
          onChangeText={(text) => setValue(text)}
        />
      ) : type === "dropdown" ? (
        //  Dropdown
       
        <>
        <TouchableOpacity style={styles.dropdownContainer}  onPress={()=>setShowDropdown(!showDropdown)}>
        <TextInput
          style={mainStyles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholderText}
          value={value}
          keyboardType={keyboardType}
          editable={false}
        />
         <Image style={styles.calendarIcon}  source={require('../../assets/images/downarrow.png')} />
        
        </TouchableOpacity>
                {showDropdown && (
                  <View style={styles.dropdownList}>
                    {options.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setValue(item.toString());
                          setShowDropdown(false);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
        </>
      ) : (
        // Default input
        <TextInput
          style={mainStyles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholderText}
          value={value}
          keyboardType={keyboardType}
          onChangeText={(text) => setValue(text)}
        />
      )}

      {error ? <Text style={{ color: COLORS.red }}>{error}</Text> : null}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  calendarIcon: {
    height: 14,
    width: 14,
    marginLeft: 'auto'
  },
  dropdownContainer: {
    position:'relative',
    flexDirection: 'row',
    alignItems: 'center',
    ...mainStyles.input
  },
   dropdownList: {
    position:'absolute',
    top:90,
    width:'100%',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: -10,
    marginBottom: 10,
    zIndex: 1000,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
});