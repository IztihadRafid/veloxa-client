import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/CustomComponents/FormateDate";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchWorkStatus, setSearchWorkStatus] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const { refetch, data: riders = [], isLoading } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const limitText = (text, maxLength = 30) => {
    if (!text) return "N/A";
    const s = String(text);
    return s.length > maxLength ? `${s.slice(0, maxLength)}...` : s;
  };

  const filteredRiders = riders.filter((rider) => {
    const matchEmail = rider?.email?.toLowerCase().includes(searchEmail.toLowerCase());
    const matchContact = rider?.contact?.toLowerCase().includes(searchContact.toLowerCase());
    const matchStatus = searchStatus ? rider?.status === searchStatus : true;
    const matchWorkStatus = searchWorkStatus ? rider?.workStatus === searchWorkStatus : true;
    const matchDate = searchDate
      ? new Date(rider?.createdAt).toISOString().split("T")[0] === searchDate
      : true;
    return matchEmail && matchContact && matchStatus && matchWorkStatus && matchDate;
  });

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
        axiosSecure.patch(`/riders/${rider._id}`, { status, email: rider.email }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({ title: `Rider Status Set to ${status}`, icon: "success" });
            refetch();
          }
        });
      }
    });
  };

  const handleApproveRider = (rider) => updateRiderStatus(rider, "approved");
  const handleRejectRider = (rider) => updateRiderStatus(rider, "rejected");

  const badgeClass = (status) =>
    status === "approved"
      ? "bg-green-600"
      : status === "rejected"
      ? "bg-red-600"
      : "bg-blue-600";

  const ActionButtons = ({ rider }) => (
    <div className="flex gap-2">
      <Button
        onClick={() => handleApproveRider(rider)}
        className="bg-green-600 hover:bg-green-700"
        size="sm"
      >
        <FaUserCheck />
      </Button>
      <Button
        onClick={() => handleRejectRider(rider)}
        className="bg-orange-400 hover:bg-orange-500"
        size="sm"
      >
        <ImCross />
      </Button>
      <Button
        onClick={() => handleDeleteRider(rider)}
        className="bg-red-500 hover:bg-red-600"
        size="sm"
      >
        <FaRegTrashAlt />
      </Button>
    </div>
  );

  const EmptyRow = ({ colSpan, message }) => (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-10 text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold text-lime-700 md:p-8 p-4 bg-green-100 rounded-4xl">
          Approve Riders
        </h1>
        <p className="lg:text-4xl md:text-3xl text-2xl font-bold text-lime-700 md:p-8">
          Total Riders: {riders.length}
        </p>
      </div>

      {/* Filters */}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-3 p-4 bg-gray-50 rounded-xl mx-3">
        <input
          type="text"
          placeholder="Search email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="input input-bordered w-full p-2 bg-green-100 rounded-[15px] border border-lime-700"
        />
        <input
          type="text"
          placeholder="Search contact..."
          value={searchContact}
          onChange={(e) => setSearchContact(e.target.value)}
          className="input input-bordered w-full p-2 bg-green-100 rounded-[15px] border border-lime-700"
        />
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
          className="select select-bordered w-full p-2 bg-green-100 rounded-[15px] border border-lime-700"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={searchWorkStatus}
          onChange={(e) => setSearchWorkStatus(e.target.value)}
          className="select select-bordered w-full p-2 bg-green-100 rounded-[15px] border border-lime-700"
        >
          <option value="">All Work Status</option>
          <option value="in_delivery">In Delivery</option>
          <option value="available">Available</option>
        </select>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="input input-bordered w-full p-2 bg-green-100 rounded-[15px] border border-lime-700"
        />
      </div>

      {/* ── DESKTOP TABLE — md and above ───────────────────────────────────── */}
      <div className="hidden md:block mx-3 overflow-x-auto rounded-2xl border bg-white">
        <Table className="w-full min-w-[900px] text-sm">
          <TableHeader className="bg-green-100">
            <TableRow>
              <TableHead className="text-green-950 w-10">#</TableHead>
              <TableHead className="text-green-950">Rider Info</TableHead>
              <TableHead className="text-green-950">Contact</TableHead>
              <TableHead className="text-green-950">Area</TableHead>
              <TableHead className="text-green-950">Address</TableHead>
              <TableHead className="text-green-950">App. Status</TableHead>
              <TableHead className="text-green-950">Work Status</TableHead>
              <TableHead className="text-green-950">Documents</TableHead>
              <TableHead className="text-green-950">Applied At</TableHead>
              <TableHead className="text-green-950">Bike</TableHead>
              <TableHead className="text-green-950">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <EmptyRow colSpan={11} message="Loading riders..." />
            ) : filteredRiders.length > 0 ? (
              filteredRiders.map((rider, index) => (
                <TableRow key={rider._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="font-medium" title={rider?.name}>{limitText(rider?.name)}</div>
                    <div className="text-xs text-muted-foreground break-all" title={rider?.email}>{limitText(rider?.email)}</div>
                  </TableCell>
                  <TableCell>{limitText(rider?.contact)}</TableCell>
                  <TableCell>
                    <div>{limitText(rider?.district)}</div>
                    <div className="text-xs text-muted-foreground">{limitText(rider?.region)}</div>
                  </TableCell>
                  <TableCell title={rider?.address}>{limitText(rider?.address)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-white rounded-full px-3 py-1 capitalize text-xs ${badgeClass(rider?.status)}`}>
                      {rider?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{limitText(rider?.workStatus)}</TableCell>
                  <TableCell>
                    <div className="text-xs">NID: {limitText(rider?.nid)}</div>
                    <div className="text-xs text-muted-foreground">Lic: {limitText(rider?.license)}</div>
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">{formatDate(rider?.createdAt)}</TableCell>
                  <TableCell title={rider?.bike}>{limitText(rider?.bike)}</TableCell>
                  <TableCell>
                    <ActionButtons rider={rider} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyRow colSpan={11} message="No rider applications found." />
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── MOBILE CARDS — below md ─────────────────────────────────────────── */}
      <div className="md:hidden space-y-3 mx-3">
        {isLoading ? (
          <p className="text-center text-muted-foreground py-10">Loading riders...</p>
        ) : filteredRiders.length > 0 ? (
          filteredRiders.map((rider, index) => (
            <div key={rider._id} className="border rounded-2xl bg-white p-4 space-y-3">
              {/* Card header: name + status badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-sm" title={rider?.name}>
                    {index + 1}. {limitText(rider?.name)}
                  </p>
                  <p className="text-xs text-muted-foreground break-all" title={rider?.email}>
                    {limitText(rider?.email)}
                  </p>
                </div>
                <Badge variant="outline" className={`text-white rounded-full px-3 py-1 text-xs capitalize shrink-0 ${badgeClass(rider?.status)}`}>
                  {rider?.status}
                </Badge>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="font-medium">{limitText(rider?.contact)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">District / Region</p>
                  <p className="font-medium">{limitText(rider?.district)}</p>
                  <p className="text-xs text-muted-foreground">{limitText(rider?.region)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Work Status</p>
                  <p className="font-medium">{limitText(rider?.workStatus)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Applied At</p>
                  <p className="font-medium">{formatDate(rider?.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">NID</p>
                  <p className="font-medium">{limitText(rider?.nid)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">License</p>
                  <p className="font-medium">{limitText(rider?.license)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bike</p>
                  <p className="font-medium">{limitText(rider?.bike)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{limitText(rider?.address)}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t">
                <ActionButtons rider={rider} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-10">No rider applications found.</p>
        )}
      </div>
    </div>
  );
};

export default ApproveRiders;