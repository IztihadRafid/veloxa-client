import useAllUser from "@/routes/API/useAllUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/CustomComponents/FormateDate";
import { Button } from "@/components/ui/button";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegTrashAlt } from "react-icons/fa";

const UsersManagement = () => {
  const { users, isLoading, refetch, setSearchText, searchText } = useAllUser();
  const axiosSecure = useAxiosSecure();

  //   remove Admin function
  const handleRemoveAdmin = async (user) => {
    Swal.fire({
      title: "Remove From Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56bd1f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "user" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            console.log(res.data);
            Swal.fire({
              title: `${user.firstName} ${user.lastName} Removed From Admin`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  //   ADMIN making functions
  const handleMakeAdmin = async (user) => {
    Swal.fire({
      title: "Make him/her Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56bd1f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            console.log(res.data);
            Swal.fire({
              title: `${user.firstName} ${user.lastName} is now an Admin`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // // handle Delete User
  const handleDeleteUser=(user)=>{
    Swal.fire({
      title: "Delete User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56bd1f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({ title: "User Deleted", icon: "success" });
            refetch();
          }
        });
      }
    });
  }
  return (
    <div>
      <div>
        <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold text-lime-700 md:p-8 p-4 bg-green-100 rounded-4xl">
          User Management
        </h1>
        <p className="lg:text-4xl md:text-3xl text-2xl font-bold text-lime-700 md:p-8 ">
          Total Users: {users.length}
        </p>
      </div>
      <div className="p-2 ml-8 flex justify-between">
        <input
          type="search"
          placeholder="Search by name..."
          onChange={(e) => setSearchText(e.target.value)}
          className="lg:w-1/4 md:w-1/3 w-full px-4 py-3 rounded-[15px] border border-green-600 bg-white text-green-900 placeholder-gray-400 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200"
        />
      </div>
      <div className="m-10 overflow-hidden rounded-[15px] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-100 hover:bg-green-100">
              <TableHead className="w-16 text-green-950">No.</TableHead>
              <TableHead className="text-green-950">User</TableHead>
              <TableHead className="text-green-950">Email</TableHead>
              <TableHead className="text-green-950">Role</TableHead>
              <TableHead className="text-green-950">Created At</TableHead>
              <TableHead className="text-green-950">Admin Action</TableHead>
              {/* <TableHead className="text-green-950">User Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-700">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    {user.role === "admin" ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => handleRemoveAdmin(user)}
                            className={"btn-primary bg-green-600 text-white"}
                          >
                            <FiShieldOff></FiShieldOff>

                            <TooltipContent side="right">
                              {user.role}
                            </TooltipContent>
                          </Button>
                        </TooltipTrigger>
                      </Tooltip>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => handleMakeAdmin(user)}
                            className={"btn-primary bg-orange-500 text-white"}
                          >
                            <FaUserShield></FaUserShield>
                            <TooltipContent side="right">
                              {user.role}
                            </TooltipContent>
                          </Button>
                        </TooltipTrigger>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          onClick={() => handleDeleteUser(user)}
                          className={"btn-primary bg-red-600 text-white"}
                        >
                          <FaRegTrashAlt></FaRegTrashAlt>
                          <TooltipContent side="right">
                            Remove User
                          </TooltipContent>
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersManagement;
