import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, CalendarDays, Mail, ShieldCheck, UserRound } from "lucide-react";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(userData);

  const fullName = `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim();
  const joinedDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* make a profile info data */}
      {isLoading ? (
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-5">
            <div className="h-28 rounded-2xl bg-gray-100" />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="h-20 rounded-xl bg-gray-100" />
              <div className="h-20 rounded-xl bg-gray-100" />
              <div className="h-20 rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      ) : (
        <section className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-lg shadow-emerald-900/5">
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 px-5 py-8 sm:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_32%)]" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative w-fit">
                  <img
                    src={userData?.photoURL || user?.photoURL}
                    alt={fullName || "User profile"}
                    className="h-24 w-24 rounded-2xl border-4 border-white/80 object-cover shadow-xl sm:h-28 sm:w-28"
                  />
                  <span className="absolute -bottom-2 -right-2 rounded-full bg-white p-2 text-emerald-600 shadow-md">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                </div>

                <div className="text-white">
                  <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
                    <ShieldCheck className="h-4 w-4" />
                    {userData?.role || "user"} account
                  </p>
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    {fullName || user?.displayName || "ZapShift User"}
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-sm text-emerald-50 sm:text-base">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{userData?.email || user?.email}</span>
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/15 px-4 py-3 text-white backdrop-blur">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-50">
                  Member since
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="h-4 w-4" />
                  {joinedDate}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-8">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <UserRound className="h-4 w-4 text-emerald-600" />
                First Name
              </p>
              <p className="mt-2 text-lg font-bold text-gray-900">
                {userData?.firstName || "Not set"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <UserRound className="h-4 w-4 text-sky-600" />
                Last Name
              </p>
              <p className="mt-2 text-lg font-bold text-gray-900">
                {userData?.lastName || "Not set"}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:col-span-2 lg:col-span-1">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <ShieldCheck className="h-4 w-4 text-teal-600" />
                Profile ID
              </p>
              <p className="mt-2 break-all text-sm font-bold text-gray-900">
                {userData?._id || "Not available"}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserDashboardHome;
