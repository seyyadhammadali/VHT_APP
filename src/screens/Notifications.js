import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import FooterTabs from "../components/FooterTabs";
import EmptyNotificationsImage from "../assets/images/unreadError.svg";
import { COLORS, mainStyles } from "../constants/theme";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("Unread");

  const readNotifications = [
    // {
    //   id: "1",
    //   title: "Maldives Special - Just Launched!",
    //   description:
    //     "Book your 5-night Maldives escape with free island excursions included.",
    //   image:
    //     "https://www.viriksonholidays.co.uk/theme/blog/adventure-main.webp",
    // },
    // {
    //   id: "2",
    //   title: "Morocco Dream Deal Alert!",
    //   description:
    //     "Book your 5-night Maldives escape with free island excursions included.",
    //   image:
    //     "https://www.viriksonholidays.co.uk/theme/blog/adventure-main.webp",
    // },
    // {
    //   id: "3",
    //   title: "Cruise Lovers Rejoice!",
    //   description:
    //     "Book your 5-night Maldives escape with free island excursions included.",
    //   image:
    //     "https://www.viriksonholidays.co.uk/theme/blog/adventure-main.webp",
    // },
    // {
    //   id: "4",
    //   title: "Adventure Awaits in Switzerland",
    //   description:
    //     "Book your 5-night Maldives escape with free island excursions included.",
    //   image:
    //     "https://www.viriksonholidays.co.uk/theme/blog/adventure-main.webp",
    // },
  ];

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationTextContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>
          {item.description}
        </Text>
      </View>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.notificationImage} />
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <EmptyNotificationsImage style={styles.emptyImage} />
      <Text style={styles.emptyText}>Empty</Text>
      <Text style={styles.emptySubText}>
        You don’t have any notifications at this time
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={mainStyles.safeArea}
      edges={["bottom", "left", "right"]}
    >
      <Header title="Notifications" />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["Unread", "Read"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "Unread" ? (
          renderEmptyState()
        ) : readNotifications.length > 0 ? (
          <FlatList
            data={readNotifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotificationItem}
            contentContainerStyle={styles.notificationListContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          renderEmptyState()
        )}
      </View>

      <FooterTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGrayLighter,
    width: "50%",
  },
  activeTab: {
    borderBottomColor: COLORS.gold,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
  },
  activeTabText: {
    color: COLORS.gold,
    fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
  },
  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.mediumGray,
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
  },
  notificationListContent: {
    backgroundColor: COLORS.themeBg,
    paddingTop: 30,
    paddingBottom: 20,
    width: "100%",
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",

    // shadow (iOS)
    shadowColor: "#1B1B4D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // elevation (Android)
    elevation: 3,
  },
  notificationTextContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    marginBottom: 5,
    fontFamily: "Inter-Medium",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#888888",
    lineHeight: 18,
    fontWeight: "400",
  },
  notificationImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    resizeMode: "cover",

    // shadow for image
    shadowColor: "#2481D8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default Notifications;