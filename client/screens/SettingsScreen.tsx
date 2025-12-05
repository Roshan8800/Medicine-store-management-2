import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Alert, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SettingsItem {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  description?: string;
  onPress: () => void;
  danger?: boolean;
  ownerOnly?: boolean;
}

export default function SettingsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logout },
      ]
    );
  };

  const handleSupport = () => {
    Linking.openURL("mailto:roshan8800jp@gmail.com?subject=Binayak%20Pharmacy%20Support");
  };

  const settingsSections: { title: string; items: SettingsItem[] }[] = [
    {
      title: "Store Management",
      items: [
        {
          icon: "users",
          label: "User Management",
          description: "Manage staff accounts and permissions",
          onPress: () => navigation.navigate("UserManagement"),
          ownerOnly: true,
        },
        {
          icon: "truck",
          label: "Suppliers",
          description: "Manage your suppliers",
          onPress: () => navigation.navigate("SupplierList"),
        },
        {
          icon: "file-text",
          label: "Audit Log",
          description: "View activity history",
          onPress: () => navigation.navigate("AuditLog"),
        },
      ],
    },
    {
      title: "Inventory Alerts",
      items: [
        {
          icon: "alert-triangle",
          label: "Low Stock Alerts",
          description: "Items below reorder level",
          onPress: () => navigation.navigate("LowStock"),
        },
        {
          icon: "clock",
          label: "Expiry Management",
          description: "Track expiring medicines",
          onPress: () => navigation.navigate("ExpiryManagement"),
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "help-circle",
          label: "Help & FAQ",
          description: "Get help and answers",
          onPress: () => navigation.navigate("Help"),
        },
        {
          icon: "mail",
          label: "Contact Support",
          description: "roshan8800jp@gmail.com",
          onPress: handleSupport,
        },
        {
          icon: "info",
          label: "About",
          description: "App info and credits",
          onPress: () => navigation.navigate("About"),
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: "log-out",
          label: "Logout",
          description: `Logged in as ${user?.name}`,
          onPress: handleLogout,
          danger: true,
        },
      ],
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <ThemedText type="h3">Settings</ThemedText>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + Spacing.xl }]}
      >
        <View style={[styles.profileCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <ThemedText style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </ThemedText>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText type="h4">{user?.name || "User"}</ThemedText>
            <ThemedText style={[styles.profileRole, { color: theme.textSecondary }]}>
              {user?.role?.charAt(0).toUpperCase() + (user?.role?.slice(1) || "")} Account
            </ThemedText>
          </View>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              {section.title}
            </ThemedText>
            <View style={[styles.sectionContent, { backgroundColor: theme.backgroundDefault }]}>
              {section.items.map((item, itemIndex) => {
                if (item.ownerOnly && user?.role !== "owner") return null;
                return (
                  <Pressable
                    key={itemIndex}
                    style={[
                      styles.settingsItem,
                      itemIndex < section.items.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: theme.divider,
                      },
                    ]}
                    onPress={item.onPress}
                  >
                    <View style={[
                      styles.iconContainer,
                      { backgroundColor: item.danger ? theme.error + "20" : theme.primary + "20" }
                    ]}>
                      <Feather
                        name={item.icon}
                        size={20}
                        color={item.danger ? theme.error : theme.primary}
                      />
                    </View>
                    <View style={styles.itemContent}>
                      <ThemedText style={[
                        styles.itemLabel,
                        item.danger && { color: theme.error }
                      ]}>
                        {item.label}
                      </ThemedText>
                      {item.description ? (
                        <ThemedText style={[styles.itemDescription, { color: theme.textSecondary }]}>
                          {item.description}
                        </ThemedText>
                      ) : null}
                    </View>
                    <Feather name="chevron-right" size={20} color={theme.textSecondary} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <ThemedText style={[styles.version, { color: theme.textDisabled }]}>
          Binayak Pharmacy v1.0.0
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  content: {
    paddingHorizontal: Spacing.lg,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  profileInfo: {
    flex: 1,
  },
  profileRole: {
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: Spacing.sm,
    marginLeft: Spacing.sm,
    textTransform: "uppercase",
  },
  sectionContent: {
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  itemDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    marginTop: Spacing.lg,
  },
});
