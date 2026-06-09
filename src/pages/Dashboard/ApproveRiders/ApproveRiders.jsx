
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/CustomComponents/FormateDate";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: riders = [],
    isLoading,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const limitText = (text, maxLength = 30) => {
    if (!text) return "N/A";
    const stringText = String(text);

    return stringText.length > maxLength
      ? `${stringText.slice(0, maxLength)}...`
      : stringText;
  };
// handle delete rider function
const handleDeleteRider = (rider) => {
  Swal.fire({
    title: "Delete Rider?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#56bd1f",
      cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/riders/${rider._id}`).then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({ title: "Rider Deleted", icon: "success" });
          refetch();
        }
      });
    }
  });
};
  // handle updateRider status functions
  const updateRiderStatus = (rider, status) => {
    Swal.fire({
      title: "Change Rider Status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56bd1f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateInfo = { status: status, email: rider.email };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: `Rider Status Set to ${status}`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  //   Handle Approve Rider Function
  const handleApproveRider = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  //   handle rejection function
  const handleRejectRider = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Approve Riders</h1>
        <p className="text-sm text-muted-foreground">
          Rider Applications: {riders.length}
        </p>
      </div>

      <div className="overflow-hidden rounded-[15px] m-3 border  bg-white ">
        <Table className="w-full table-fixed text-md">
          <TableHeader className="bg-green-100">
            <TableRow>
              <TableHead className="w-10 whitespace-normal text-green-950">
                No.
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Rider Info
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Contact
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Area
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Address
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Application Status
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Work Status
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Documents
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Applied At
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Bike
              </TableHead>
              <TableHead className="whitespace-normal text-green-950">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Loading riders...
                </TableCell>
              </TableRow>
            ) : riders.length > 0 ? (
              riders.map((rider, index) => (
                <TableRow key={rider._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="max-w-[30ch] whitespace-normal break-words">
                    <div className="font-medium" title={rider?.name}>
                      {limitText(rider?.name)}
                    </div>
                    <div
                      className="break-all text-muted-foreground"
                      title={rider?.email}
                    >
                      {limitText(rider?.email)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[30ch] whitespace-normal break-words">
                    {limitText(rider?.contact)}
                  </TableCell>
                  <TableCell className="max-w-[30ch] whitespace-normal break-words">
                    <div>{limitText(rider?.district)}</div>
                    <div className="text-muted-foreground">
                      {limitText(rider?.region)}
                    </div>
                  </TableCell>
                  <TableCell
                    className="max-w-[30ch] whitespace-normal break-words"
                    title={rider?.address}
                  >
                    {limitText(rider?.address)}
                  </TableCell>
                  <TableCell className="max-w-[30ch] whitespace-normal break-words">
                    <Badge
                      variant="outline"
                      className={`text-white rounded-full p-3 capitalize ${
                        rider?.status === "approved"
                          ? "bg-green-600"
                          : rider?.status === "rejected"
                            ? "bg-red-600"
                            : "bg-blue-600"
                      }`}
                    >
                      <p>{rider?.status}</p>
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="max-w-[30ch] whitespace-normal break-words"
                    title={rider?.workStatus}
                  >
                    {limitText(rider?.workStatus)}
                  </TableCell>
                  <TableCell className="max-w-[30ch] whitespace-normal break-words">
                    <div>NID: {limitText(rider?.nid)}</div>
                    <div className="text-muted-foreground">
                      License: {limitText(rider?.license)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[30ch] whitespace-normal text-sm">
                    {formatDate(rider?.createdAt)}
                  </TableCell>
                  <TableCell
                    className="max-w-[30ch] whitespace-normal break-words"
                    title={rider?.bike}
                  >
                    {limitText(rider?.bike)}
                  </TableCell>
                  <TableCell className="max-w-[30ch] whitespace-normal break-words">
                    <Button
                      onClick={() => handleApproveRider(rider)}
                      className="btn btn-primary mr-2"
                    >
                      <FaUserCheck />
                    </Button>
                    <Button
                      onClick={() => handleRejectRider(rider)}
                      className="btn bg-orange-400 hover:bg-orange-500 mr-2"
                    >
                      <ImCross />
                    </Button>
                    <Button onClick={() => handleDeleteRider(rider)} className="btn bg-red-500 hover:bg-red-600">
                      <FaRegTrashAlt />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No pending rider applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
    </div>
  );
};

export default ApproveRiders;
