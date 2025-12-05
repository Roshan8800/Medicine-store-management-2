import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";

import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import MedicineDetailScreen from "@/screens/MedicineDetailScreen";
import AddMedicineScreen from "@/screens/AddMedicineScreen";
import AddBatchScreen from "@/screens/AddBatchScreen";
import BarcodeScannerScreen from "@/screens/BarcodeScannerScreen";
import InvoiceDetailScreen from "@/screens/InvoiceDetailScreen";
import SupplierListScreen from "@/screens/SupplierListScreen";
import AddSupplierScreen from "@/screens/AddSupplierScreen";
import ExpiryManagementScreen from "@/screens/ExpiryManagementScreen";
import LowStockScreen from "@/screens/LowStockScreen";
import StockAdjustmentScreen from "@/screens/StockAdjustmentScreen";
import UserManagementScreen from "@/screens/UserManagementScreen";
import AuditLogScreen from "@/screens/AuditLogScreen";
import AboutScreen from "@/screens/AboutScreen";
import HelpScreen from "@/screens/HelpScreen";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  MedicineDetail: { medicineId: string };
  AddMedicine: { barcode?: string } | undefined;
  AddBatch: { medicineId: string };
  BarcodeScanner: undefined;
  InvoiceDetail: { invoiceId: string };
  SupplierList: undefined;
  AddSupplier: undefined;
  ExpiryManagement: undefined;
  LowStock: undefined;
  StockAdjustment: { medicineId: string; batchId: string };
  UserManagement: undefined;
  AuditLog: undefined;
  About: undefined;
  Help: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.backgroundRoot }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerTitle: "Create Account" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MedicineDetail"
            component={MedicineDetailScreen}
            options={{ headerTitle: "Medicine Details" }}
          />
          <Stack.Screen
            name="AddMedicine"
            component={AddMedicineScreen}
            options={{ headerTitle: "Add Medicine" }}
          />
          <Stack.Screen
            name="AddBatch"
            component={AddBatchScreen}
            options={{ headerTitle: "Add Batch" }}
          />
          <Stack.Screen
            name="BarcodeScanner"
            component={BarcodeScannerScreen}
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="InvoiceDetail"
            component={InvoiceDetailScreen}
            options={{ headerTitle: "Invoice Details" }}
          />
          <Stack.Screen
            name="SupplierList"
            component={SupplierListScreen}
            options={{ headerTitle: "Suppliers" }}
          />
          <Stack.Screen
            name="AddSupplier"
            component={AddSupplierScreen}
            options={{ headerTitle: "Add Supplier" }}
          />
          <Stack.Screen
            name="ExpiryManagement"
            component={ExpiryManagementScreen}
            options={{ headerTitle: "Expiry Management" }}
          />
          <Stack.Screen
            name="LowStock"
            component={LowStockScreen}
            options={{ headerTitle: "Low Stock Alerts" }}
          />
          <Stack.Screen
            name="StockAdjustment"
            component={StockAdjustmentScreen}
            options={{ headerTitle: "Adjust Stock" }}
          />
          <Stack.Screen
            name="UserManagement"
            component={UserManagementScreen}
            options={{ headerTitle: "User Management" }}
          />
          <Stack.Screen
            name="AuditLog"
            component={AuditLogScreen}
            options={{ headerTitle: "Audit Log" }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ headerTitle: "About" }}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ headerTitle: "Help & FAQ" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
