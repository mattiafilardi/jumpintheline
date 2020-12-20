import { useState, useEffect } from "react";
import { BASE_URL } from "../utility/BaseUrl";

export function useSupermarket() {
  const [isLoading, setLoading] = useState(true);
  const [supermarkets, setSupermarkets] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/getSupermarkets`)
      .then((response) => response.json())
      .then((json) => {
        setSupermarkets(json.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return {
    isLoading,
    supermarkets,
  };
}
