import { StatusChangeTable } from "../../../components/status-change-table";
import { getQuery, createMutation as updateManyMutation } from "../../../dataprovider";


// Change data to match the table headers
function transformData(data) {
    return data.map((item) => {
      const transformedItem = {};
      Object.keys(item).forEach((key) => {
        if (key === "status") {
          transformedItem["Status"] = item[key];
        } else if (key === "full_name") {
          transformedItem["Full Name"] = item[key];
        } else {
          transformedItem[key] = item[key];
        }
      });
      return transformedItem;
    });
  }
  
  export default function ManageApplications() {
    const { data: result, isLoading, isError } = getQuery("manager/applications");
  
    const { mutate: updateIds} = updateManyMutation("manager/update-applications",["manager/applications"])
  
    const handleStatusChange = (selected, status) => {
        const newStatus = status === "approve" ? "Approved" : "Rejected";
        updateIds({ids: selected, newStatus})
    };
    let data = result ?? [];
    data = transformData(data);
    return (
      <>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        <StatusChangeTable
          title="Manage Applications"
          data={data}
          headers={["Full Name", "Status"]}
          handleStatusChange={handleStatusChange}
        />
      </>
    );
  }
  
