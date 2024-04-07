import React from "react";
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
} from "@/components/ui/dialog";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { GetBuildDataAPIResponse } from "@/types/getBuildData";
import { getBuildData } from "@/services/getBuildData";
import { toast } from "@/components/ui/use-toast";
import useGetBuildLogs from "@/hooks/useGetBuildLogs";
import { Loader2 } from "lucide-react";
import useGetBuildSheetPageSearchParams from "@/hooks/useGetBuildSheetPageSearchParams";

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

const ViewBuildLogsButton = () => {
  const { buildId } = useGetBuildSheetPageSearchParams();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const buildLogs = useGetBuildLogs(buildId);
  const isLoadingBuildLogs = buildLogs.isLoading;

  // Since this is mock data, I'm only showing in the first 3 logs for example
  const data = buildLogs.data?.slice(0, 3);

  const shouldDisableButton =
    Boolean(buildId) === false || isLoadingBuildLogs || buildLogs.isError;

  if (buildLogs.isError) {
    console.error("Error fetching build logs:", buildLogs.error);
    toast({
      title: "Error fetching Build Logs",
    });
  }

  // This makes our JSON data pretty with indentation
  const dataToJSON = JSON.stringify(data, undefined, 2);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-4" disabled={shouldDisableButton}>
          {isLoadingBuildLogs ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          View Logs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] flex flex-col h-5/6 overflow-auto">
        <DialogHeader>
          <DialogTitle>
            Viewing Logs for: <span className="ml-4">Build {buildId}</span>
          </DialogTitle>
          <DialogDescription>
            Make changes to your build log here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Card className="overflow-auto p-4">
          {data ? (
            <pre className="whitespace-pre-wrap overflow-auto">
              {dataToJSON}
            </pre>
          ) : (
            <p>No data available</p>
          )}
        </Card>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const BuildsSheet = () => {
  const { buildId, setSearchParams } = useGetBuildSheetPageSearchParams();

  const [builds, setBuilds] = React.useState<GetBuildDataAPIResponse>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showTable, setShowTable] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (buildId) {
          const data = await getBuildData(buildId);
          setBuilds(data);
          setShowTable(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setShowTable(false);

        toast({
          title: "Error fetching Build Data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchData();
    }
  }, [isLoading, buildId]);

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

  /**
   * @description
   * Handles the change of the Build ID selected to display in the table
   */
  const handleSelectBuildChange = (value: string) => {
    setSearchParams({ buildId: value });
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
            <Select onValueChange={handleSelectBuildChange} value={buildId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select A Build" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_BUILDS.map((build) => (
                  <SelectItem key={build.id} value={build.id}>
                    {build.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ViewBuildLogsButton />
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
          {/* </div> */}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default BuildsSheet;
