import { getBuildData } from "@/services/getBuildData";
import { useQuery } from "@tanstack/react-query";

const useGetBuildData = (buildId: string) => {
  const isValidBuildId = Boolean(buildId);

  const response = useQuery({
    enabled: isValidBuildId,
    queryKey: [`useGetBuildData`, buildId],
    queryFn: () => getBuildData(buildId),
  });

  return response;
};

export default useGetBuildData;
