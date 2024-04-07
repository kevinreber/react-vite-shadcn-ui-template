import { getBuildLogs } from "@/services/getBuildLogs";
import { useQuery } from "@tanstack/react-query";

const useGetBuildLogs = (buildId: string) => {
  const isValidBuildId = Boolean(buildId);

  const response = useQuery({
    enabled: isValidBuildId,
    queryKey: [`useGetBuildLogs`, buildId],
    queryFn: () => getBuildLogs(buildId),
  });

  return response;
};

export default useGetBuildLogs;
