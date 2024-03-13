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

const BuildsPage = () => {
  const [builds, setBuilds] = React.useState<BuildType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchDataOnPageLoad = async () => {
      try {
        const data = await getData();
        // setBuilds(data);
        setBuilds(MOCK_BUILDS);
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

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Builds Page</CardTitle>
          <CardDescription>Select a Build below</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default BuildsPage;
