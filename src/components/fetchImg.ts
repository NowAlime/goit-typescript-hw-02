import axios from "axios";

const ACCESS_KEY = "Pzd5WHZvc1LGW1YiJXACZG630o_NjJimOba4WjnMaTw";
axios.defaults.baseURL = "https://api.unsplash.com";

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  likes: number;
}

interface UnsplashResponse {
  results: UnsplashImage[];
  total: number;
}

const fetchImages = async (
  searchQuery: string,
  page: number
): Promise<UnsplashResponse> => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query: searchQuery,
        page: page,
        per_page: 10,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    return response.data as UnsplashResponse;
  } catch (error) {
    throw new Error("Failed to fetch images from Unsplash API");
  }
};

export default fetchImages;
