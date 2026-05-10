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

  const { data: parcels = [],refetch } = useQuery({
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
      confirmButtonColor: "#99c026",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
              refetch()
            }
          })
          .catch((err) => console.log(err));
    });
  };
  return (
    <div className="overflow-hidden rounded-md border">
      {parcels.length}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Payment Status</TableHead>
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
              <TableCell>{parcel?.cost}</TableCell>
              <TableCell>Credit Card</TableCell>
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
