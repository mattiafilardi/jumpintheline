import { useState } from "react";
import { BASE_URL } from "../utility/BaseUrl";

export function useRegistration() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState("");

  const doRegistration = (name, surname, username, password) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("name", name.value);
    formData.append("surname", surname.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    
    fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if(json.httpResponseCode == 200){
          setOutcome("Registrazione effettuata!")
          setError("");
        }else{
          setError(json.message);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return {
    isLoading,
    doRegistration,
    outcome,
    error
  };
}
