import { GetBuildDataAPIResponse } from "@/types/getBuildData";
import mock_build_data from "../data/mock_build_data.json";
const BASE_URL = "https://api.example.com";

export const getBuildData = async (
  buildId: string
): Promise<GetBuildDataAPIResponse> => {
  try {
    console.log(`Fetching build data for: ${buildId}`);

    // const response = await fetch(`${BASE_URL}/builds/${buildId}`);
    // if (response.ok === false) {
    //   throw new Error(`Error fetching build data for: ${buildId}`);
    // }
    // const data = await response.json();
    // return data;
    return mock_build_data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw new Error(`Error fetching data: ${error}`);
  }
};
