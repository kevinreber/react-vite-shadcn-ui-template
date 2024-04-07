const FAKER_API_BASE_URL = "https://fakerestapi.azurewebsites.net/api/v1";

type FakerRestAPIBook = {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  excerpt: string;
  publishDate: string;
};

/**
 *
 * Fetching Activity data from Faker REST API: https://fakerestapi.azurewebsites.net/index.html
 */
export const getBuildLogs = async (
  buildId: string
): Promise<FakerRestAPIBook[]> => {
  try {
    const response = await fetch(`${FAKER_API_BASE_URL}/Books`);
    if (response.ok === false) {
      throw new Error(`Error fetching build data for: ${buildId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw new Error(`Error fetching data: ${error}`);
  }
};
