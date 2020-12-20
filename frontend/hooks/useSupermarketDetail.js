import { useState, useEffect } from "react";
import { BASE_URL } from "../utility/BaseUrl";

export function useSupermarketDetail(id) {
  const [isLoading, setLoading] = useState(true);
  const [supermarketDetail, setSupermarketDetail] = useState({});

  useEffect(() => {
    if (!id) return;
    getSupermarketDetail(id);
  }, [id]);
  
  const getSupermarketDetail = (id) => {
    fetch(`${BASE_URL}/getSupermarket/${id} `)
      .then((response) => response.json())
      .then((json) => {
        setSupermarketDetail(json.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }

  return {
    isLoading,
    supermarketDetail,
  };
}
