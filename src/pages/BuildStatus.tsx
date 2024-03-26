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
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/builds");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
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
    name: "Build 1",
    description: "This is the first build",
  },
  {
    id: "2",
    name: "Build 2",
    description: "This is the second build",
  },
  {
    id: "3",
    name: "Build 3",
    description: "This is the third build",
  },
];

const BuildsStatusPage = () => {
  const [builds, setBuilds] = React.useState<BuildType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showTable, setShowTable] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    const fetchDataOnPageLoad = async () => {
      try {
        const data = await getData();
        setBuilds(MOCK_BUILDS); // Use MOCK_BUILDS for demonstration
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchDataOnPageLoad();
    }
  }, [isLoading]);

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
          <CardTitle>Check the status for a build</CardTitle>
          <CardDescription>Select a Site below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Build" />
              </SelectTrigger>
              <SelectContent>
                {builds.map((build) => (
                  <SelectItem key={build.id} value={build.id}>
                    {build.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleFetchClick} className="ml-4">Fetch!</Button>
          </div>
          {showTable && (
            <>
              <Table>
              <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px]">Site</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>ZTP</TableHead>
                    <TableHead>Config</TableHead>
                    <TableHead>Audit</TableHead>
                    <TableHead>Nautobot</TableHead>
                    </TableRow>
                    </TableHeader>
                <TableBody>
                  {[...Array(10)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell contentEditable={isEditable}>Site {index + 1}</TableCell>
                      <TableCell contentEditable={isEditable}>Device {index + 1}</TableCell>
                      <TableCell contentEditable={isEditable}>True</TableCell>
                      <TableCell contentEditable={isEditable}>True</TableCell>
                      <TableCell contentEditable={isEditable}>True</TableCell>
                      <TableCell contentEditable={isEditable}>True</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default BuildsStatusPage;
