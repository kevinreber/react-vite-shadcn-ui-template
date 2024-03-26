import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import mock_build_data from "../data/mock_build_data.json"

const MOCK_DATA = [
  {
    id: 123,
    title: 'Halo'
  },
  {
    id: 345,
    title: 'Harry Potter'
  }
]


// Function to fetch data from the API
const fetchDataFromAPI = async () => {
  try {
    const response = await fetch("YOUR_API_ENDPOINT_HERE");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

type BuildType = {
  id: string;
  name: string;
  description: string;
};


const MOCK_BUILDS: BuildType[] = [
  {
    id: "1",
    name: "Site 1",
    description: "This is the first build",
  },
  {
    id: "2",
    name: "Site 2",
    description: "This is the second build",
  },
  {
    id: "3",
    name: "Site 3",
    description: "This is the third build",
  },
];



  const PopupContent = (props : {text: string; data: any[]}) => {
    const isValidText = props.text ? props.text : 'No text'
    const dataToJSON = JSON.stringify(props.data, undefined, 2);
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button  className="ml-4">
              View Logs
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Viewing Logs</DialogTitle>
            <DialogTitle>{props.text}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Card>

          <pre>{dataToJSON}</pre>
          </Card>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }



const BuildsSheet = () => {
  const [builds, setBuilds] = React.useState<BuildType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State variable to manage popup visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from API
        // const data = await fetchDataFromAPI(); // Uncomment this line to fetch data from API
        // For now, using mock data
        const data = mock_build_data;
        setBuilds(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  const handleLogsClick = () => {
    setShowPopup(true); // Show the popup when logs are clicked
  };


  const handleFetchClick = () => {
    setShowTable(true);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSubmitClick = () => {
    // Show confirmation popup
    if (window.confirm("Are you sure you want to submit?")) {
      alert("Submitted to Nautabot");
      setIsEditable(false);
    }
  };

  const handleCancelClick = () => {
    // Show confirmation popup
    if (window.confirm("Do you want to cancel?")) {
      setIsEditable(false);
    }
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>View Build Sheet</CardTitle>
          <CardDescription>Select a Site below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Build" />
              </SelectTrigger>
              <SelectContent>
                {/* Map over builds to populate dropdown options */}
                {MOCK_BUILDS.map((build) => (
                  <SelectItem key={build.id} value={build.id}>
                    {build.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleFetchClick} className="ml-4">
              Fetch!
            </Button>
          <PopupContent text="hello world" data={MOCK_DATA} />
          </div>
          {showTable && (
            <>
              <Table className="border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="border border-gray-300">Device Name</th>
                    <th className="border border-gray-300">Device Role</th>
                    <th className="border border-gray-300">Rack Cabinet</th>
                    <th className="border border-gray-300">Position</th>
                    <th className="border border-gray-300">RU</th>
                    <th className="border border-gray-300">Manufacturer</th>
                    <th className="border border-gray-300">Model</th>
                    <th className="border border-gray-300">Deployed</th>
                    <th className="border border-gray-300">S/N</th>
                    <th className="border border-gray-300">L3 VNI MAC</th>
                    <th className="border border-gray-300">Management IP</th>
                    <th className="border border-gray-300">BGP AS Number</th>
                    <th className="border border-gray-300">BGP Router ID</th>
                    <th className="border border-gray-300">VTEP IP</th>
                    <th className="border border-gray-300">VRF IP</th>
                    <th className="border border-gray-300">Netbox Import</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over builds to populate table rows */}
                  {builds.map((build, index) => (
                    <TableRow key={index} className="border border-gray-300">
                      <TableCell contentEditable={isEditable}>
                        {build.device_name}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.device_role}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.rack_cabinet}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.position}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.ru}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.manufacturer}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.model}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.deployed}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.serial}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.l3_vni_mac}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.management_ip}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.bgp_as_number}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.bgp_router_id}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.vtep_ip}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.vrf}
                      </TableCell>
                      <TableCell contentEditable={isEditable}>
                        {build.netbox_import}
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
              <div className="flex justify-end mt-4">
                <Button onClick={handleEditClick} className="mr-2">
                  Edit
                </Button>
                <Button onClick={handleSubmitClick} className="mr-2">
                  Submit
                </Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default BuildsSheet;
