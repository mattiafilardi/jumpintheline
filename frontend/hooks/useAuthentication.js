import { useState } from "react";
import { BASE_URL } from "../utility/BaseUrl";

export function useAuthentication() {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const doLogin = (username, password) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("username", username.value);
    formData.append("password", password.value);

    fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.httpResponseCode == 200) {
          setError("");
          setUser(json.result);
        } else {
          setError(json.message);
          setUser(json.result);
        }
      })
      .catch((err) => err)
      .finally(() => setLoading(false));
  };

  return {
    isLoading,
    doLogin,
    user,
    error,
  };
}
