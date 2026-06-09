import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/CustomComponents/FormateDate";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log("res: ", payments);
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[100px]">Parcel Info</TableHead>
            <TableHead className="w-[100px]">Recipient Info</TableHead>
            <TableHead>Tracking No.</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Paid Time</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        {payments?.map((payment, index) => (
          <TableBody key={payment._id}>
            <TableRow>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {payment?.parcelName}
              </TableCell>
              <TableCell className="font-medium">
                {payment?.recipientName}
              </TableCell>
              <TableCell className="font-medium">
                {payment?.trackingId}
              </TableCell>
              <TableCell className="font-medium text-green-500">
                {payment?.amount}
              </TableCell>
              <TableCell className="font-medium"> {payment?.paidAt ? formatDate(payment.paidAt) : '—'}</TableCell>
              <TableCell>
                {" "}
                <NavLink
                  to={`/dashboard/my-payments/${payment?._id}`}
                  className="px-4 py-2 rounded-[15px] bg-yellow-400 text-black"
                >
                  View
                </NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default PaymentHistory;
