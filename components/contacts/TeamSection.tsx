import { Image } from "../../types/types";
import ImageBack from "../common/ImageBack";
import { ButtonTeam } from "../ui/buttonTeam";
import { useDepartment } from "../../context/DepartmentContext";
import { useRouter } from "next/navigation";

export default function TeamSection({ team_image, departments }: { team_image: Image, departments: string[] }) {
  const { selectedDepartment, setSelectedDepartment } = useDepartment();
  const router = useRouter();

  const handleDepartmentClick = (e:any, service: string) => {
    e.preventDefault();
    setSelectedDepartment(service);
    router.push("/our-team");
  };
  return (
    <>
      <div className="border-t-4 border-secondary-500 w-16 mb-4"></div>
      <h2 className="text-2xl font-bold text-primary-500 mb-6">Our team at your fingertips</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 lg:w-2/5">
          <ImageBack
            src={team_image?.filename_disk}
            alt="Our team"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-3/5">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">
            {departments.map((service, index) => (
              <>
              {service !== null &&
              <div key={index}>
                <ButtonTeam
                  text={service}
                  onClick={(e) => handleDepartmentClick(e,service)}
                  className="w-full"
                />
              </div>
              }
            </>
          ))}
          </div>
        </div>
      </div>
    </>
  )
}