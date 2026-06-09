import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Coverage from "@/pages/Coverage/Coverage";
import Home from "@/pages/Home/Home/Home";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Rider from "@/pages/Rider/Rider";
import AboutUs from "@/pages/AboutUs/AboutUs";
import SendParcel from "@/pages/SendParcel/SendParcel";
import DashboardLayout from "@/layouts/DashboardLayout";
import MyParcels from "@/pages/Dashboard/MyParcels/MyParcels";
import Payment from "@/pages/Dashboard/Payment/Payment";
import PaymentSuccess from "@/pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "@/pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "@/pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "@/pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "@/pages/Dashboard/UserManagemnet/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "@/pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "@/pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeiliveries from "@/pages/Dashboard/CompletedDeliveries/CompletedDeiliveries";
import ParcelTrack from "@/pages/Dashboard/ParcelTrack/ParcelTrack";
import DashboardHome from "@/pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/aboutus",
        Component: AboutUs,
      },
      {
        path:"/parcel-track/:trackingId",
        Component:ParcelTrack
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },

      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        index:true,
        Component:DashboardHome
        
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "my-parcels/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      // Rider Routes

      {
        path: "assign-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeiliveries></CompletedDeiliveries>
          </RiderRoute>
        ),
      },
      
    ],
  },
]);
