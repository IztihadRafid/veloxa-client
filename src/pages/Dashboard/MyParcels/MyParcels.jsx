import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import deleteImg from "@/assets/delete.png";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure, you want to delete this parcel?",
      imageUrl: deleteImg,
      imageHeight: 100,
      imageWidth: 100,
      showCancelButton: true,
      confirmButtonColor: "#56bd1f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
              refetch();
            }
          })
          .catch((err) => console.log(err));
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel?.cost,
      parcelName: parcel?.parcelName,
      parcelId: parcel?._id,
      senderEmail: parcel?.senderEmail,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo,
    );
    console.log(res.data.url);
    window.location.assign(res.data.url);
  };
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Parcel Name</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {parcels?.map((parcel, index) => (
          <TableBody key={parcel._id}>
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {parcel?.senderName}
              </TableCell>
              <TableCell className="font-medium">
                {parcel?.parcelName}
              </TableCell>
              <TableCell>{parcel?.cost}</TableCell>
              {parcel?.paymentStatus === "paid" ? (
                <TableCell className="font-medium text-green-500">
                  Paid
                </TableCell>
              ) : (
                // <NavLink to={`/dashboard/my-parcels/${parcel?._id}`} className="px-4 py-2 rounded-[15px] bg-yellow-400 text-black">
                //   Pay
                // </NavLink>
                <TableCell>
                  <button
                  onClick={() => {
                    handlePayment(parcel);
                  }}
                  className="px-4 py-2 rounded-[15px] bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  Pay
                </button>
                </TableCell>
              )}
              <TableCell>{parcel?.deliveryStatus}</TableCell>
              <TableCell className="text-center">
                <Button className="btn btn-primary">
                  <FaEye />
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button className="btn btn-primary">
                  <FaEdit />
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => {
                    handleParcelDelete(parcel?._id);
                  }}
                  className="btn btn-primary"
                >
                  <FaTrashAlt />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default MyParcels;
