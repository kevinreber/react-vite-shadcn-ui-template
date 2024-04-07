import { useSearchParams } from "react-router-dom";

/**
 *
 * Description: This hook is used to get the search params from the Builds Sheet Page URL
 */
const useGetBuildSheetPageSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Changes `searchParams` into an object Ex: { buildId: '2' }
  const existingURLSearchParams = Object.fromEntries(searchParams);
  const buildId = existingURLSearchParams.buildId || undefined;

  return { buildId, setSearchParams };
};

export default useGetBuildSheetPageSearchParams;
