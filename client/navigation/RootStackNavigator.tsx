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

import CategoriesScreen from "@/screens/CategoriesScreen";
import CustomersScreen from "@/screens/CustomersScreen";
import NotificationsScreen from "@/screens/NotificationsScreen";
import AnalyticsScreen from "@/screens/AnalyticsScreen";
import SearchScreen from "@/screens/SearchScreen";
import QuickSaleScreen from "@/screens/QuickSaleScreen";
import PurchaseOrdersScreen from "@/screens/PurchaseOrdersScreen";
import BackupRestoreScreen from "@/screens/BackupRestoreScreen";
import PriceCheckScreen from "@/screens/PriceCheckScreen";
import ReceiptScreen from "@/screens/ReceiptScreen";

import APISettingsScreen from "@/screens/APISettingsScreen";
import AIChatScreen from "@/screens/AIChatScreen";
import DrugInteractionsScreen from "@/screens/DrugInteractionsScreen";
import AIInsightsScreen from "@/screens/AIInsightsScreen";
import DemandForecastScreen from "@/screens/DemandForecastScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import ReportsScreen from "@/screens/ReportsScreen";

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
  Categories: undefined;
  Customers: undefined;
  Notifications: undefined;
  Analytics: undefined;
  Search: undefined;
  QuickSale: undefined;
  PurchaseOrders: undefined;
  BackupRestore: undefined;
  PriceCheck: undefined;
  Receipt: {
    invoiceId: string;
    invoiceNumber: string;
    items: { name: string; quantity: number; price: number }[];
    subtotal: number;
    discount: number;
    total: number;
    customerName?: string;
    paymentMethod: string;
    date: string;
  };
  APISettings: undefined;
  AIChat: undefined;
  DrugInteractions: undefined;
  AIInsights: undefined;
  DemandForecast: undefined;
  Profile: undefined;
  Reports: undefined;
  ChangePassword: undefined;
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
          <Stack.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{ headerTitle: "Categories" }}
          />
          <Stack.Screen
            name="Customers"
            component={CustomersScreen}
            options={{ headerTitle: "Customers" }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ headerTitle: "Notifications" }}
          />
          <Stack.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{ headerTitle: "Analytics" }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="QuickSale"
            component={QuickSaleScreen}
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="PurchaseOrders"
            component={PurchaseOrdersScreen}
            options={{ headerTitle: "Purchase Orders" }}
          />
          <Stack.Screen
            name="BackupRestore"
            component={BackupRestoreScreen}
            options={{ headerTitle: "Backup & Restore" }}
          />
          <Stack.Screen
            name="PriceCheck"
            component={PriceCheckScreen}
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="Receipt"
            component={ReceiptScreen}
            options={{ headerTitle: "Receipt" }}
          />
          <Stack.Screen
            name="APISettings"
            component={APISettingsScreen}
            options={{ headerTitle: "API Settings" }}
          />
          <Stack.Screen
            name="AIChat"
            component={AIChatScreen}
            options={{ headerTitle: "AI Assistant" }}
          />
          <Stack.Screen
            name="DrugInteractions"
            component={DrugInteractionsScreen}
            options={{ headerTitle: "Drug Interactions" }}
          />
          <Stack.Screen
            name="AIInsights"
            component={AIInsightsScreen}
            options={{ headerTitle: "AI Insights" }}
          />
          <Stack.Screen
            name="DemandForecast"
            component={DemandForecastScreen}
            options={{ headerTitle: "Demand Forecast" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerTitle: "Profile" }}
          />
          <Stack.Screen
            name="Reports"
            component={ReportsScreen}
            options={{ headerTitle: "Reports" }}
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
