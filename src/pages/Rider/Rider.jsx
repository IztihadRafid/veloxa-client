import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [serviceCenters, setServiceCenters] = useState([]);

  // fetching data
  useEffect(() => {
    fetch("/data/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);
      });
  }, []);

  const regionDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionDuplicate)];
  const districtByRegion = (region) => {
    const regionDisrict = serviceCenters.filter((c) => c.region === region);
    const districts = regionDisrict.map((d) => d.district);
    return districts;
  };
  const region = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    
    axiosSecure.post("/riders", data)
    .then((res) => {
         if (res.data.insertedId) {
           console.log("Rider created in DB",res);
              Swal.fire({
                title: "Application Has Submitted",
                text: "Waiting For Approval",
                icon: "success",
                confirmButtonColor: "#56bd1f",
              });
            }  
    })
  };

  return (
    <div>
      <h1 className="text-6xl text-green-600 p-6 font-bold">Be a Rider</h1>
      <form onSubmit={handleSubmit(handleRiderApplication)} className="p-16 bg-white rounded-[15px]">
        {/* tow columnm */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black ">
          {/* Rider */}
          <div className="lg:border-r lg:pr-6 border-gray-300">
            <h3 className="text-2xl font-bold mb-8 text-primary">
             Rider Details
            </h3>

            <div className="mb-6">
              <label className="block mb-1 font-medium">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter Rider's Name"
                defaultValue={user?.displayName}
                className="w-full px-4 py-2 border rounded-[20px]"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-medium">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter Your Email"
                defaultValue={user?.email}
                className="w-full px-4 py-2 border rounded-[20px]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

          
            <div className="mb-6">
              <label className="block mb-1 font-medium">Contact</label>
              <input
                {...register("contact", { required: true })}
                type="number"
                placeholder="Enter Your Contact"
                className="w-full px-4 py-2 border rounded-[20px]"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-medium">Region</label>
              <select
                {...register("region", { required: true })}
                defaultValue=""
                className="w-full px-4 py-2 border rounded-[20px]"
              >
                <option value="" disabled>
                  Select Region
                </option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-medium">
                Select Your District
              </label>
              <select
                {...register("district", { required: true })}
                defaultValue=""
                className="w-full px-4 py-2 border rounded-[20px]"
              >
                <option value="" disabled>
                  Select District
                </option>
                {districtByRegion(region).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>
           
             <div className="mb-6">
              <label className="block mb-1 font-medium">Address</label>
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Enter Your Address"
                className="w-full px-4 py-2 border rounded-[20px]"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

          </div>

          {/* More details */}
          <div className="lg:pl-6">
            <h3 className="text-2xl font-bold mb-8 text-primary">
              More Details
            </h3>

            <div className="mb-6">
              <label className="block mb-1 font-medium">Driving License Number</label>
              <input
                {...register("license", { required: true })}
                type="number"
                placeholder="Enter Driving License Number"
                className="w-full px-4 py-2 border rounded-[20px]"
              />
              {errors.license && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-medium">NID</label>
              <input
                {...register("nid", { required: true })}
                type="number"
                placeholder="Enter Your NID"
                className="w-full px-4 py-2 border rounded-[20px]"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

          

            <div className="mb-6">
              <label className="block mb-1 font-medium">Bike</label>
              <input
                {...register("bike", { required: true })}
                type="text"
                placeholder="Enter Bike information"
                className="w-full px-4 py-2 border rounded-[20px]"
              />
              {errors.bike && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

          </div>
        </div>

        <input
          className="hover:bg-primary bg-lime-600  md:w-60 lg:w-xl duration-150 text-white px-4 py-2 rounded-[15px] "
          type="submit"
          value="Apply Now"
        />
      </form>
    </div>
  );
};

export default Rider;
