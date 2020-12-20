import { useState, useEffect } from "react";
import { BASE_URL } from "../utility/BaseUrl";
import { Notifications } from "expo";
import { Permissions } from "expo-permissions";

export function usePrenotation(id) {
  const [isLoadingPrenotation, setLoading] = useState(false);
  const [prenotation, setPrenotation] = useState(null);
  const [prenotationList, setPrenotationList] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  let notification = false;

  useEffect(() => {
    if (!id) return;

    getPrenotationStatus(id);
  }, [id]);

  const askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    console.warn(finalStatus);
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  const sendNotificationImmediately = async () => {
    notification = true;
    Notifications.presentLocalNotificationAsync({
      title: "Avviso",
      body: "Puoi entrare per fare la spesa",
    });
  };

  const doPrenotation = (supermarketID, userID) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("supermarketID", supermarketID);
    formData.append("userID", userID);

    fetch(`${BASE_URL}/doPrenotation`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.httpResponseCode == 200) {
          setError("");
          setPrenotation(json.result);
        } else {
          setError(json.message);
          setUser(json.result);
        }
      })
      .catch((err) => err)
      .finally(() => setLoading(false));
  };

  const getPrenotationStatus = (id) => {
    fetch(`${BASE_URL}/getPrenotation/${id} `)
      .then((response) => response.json())
      .then((json) => {
        if (notification == false && json.result.idStato == 2) {
          sendNotificationImmediately();
        }
        setPrenotation(json.result);
        setTimeout(() => {
          getPrenotationStatus(id);
        }, 2000);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const getPrenotations = (userId) => {
    fetch(`${BASE_URL}/getPrenotations/${userId} `)
      .then((response) => response.json())
      .then((json) => {
        setPrenotationList(json.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const terminatePrenotation = (prenotationID, supermarketID) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("supermarketID", supermarketID);
    formData.append("prenotationID", prenotationID);

    fetch(`${BASE_URL}/terminatePrenotation`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.httpResponseCode == 200) {
          setMessage(json.message);
        } else {
          setError(json.message);
        }
      })
      .catch((err) => err)
      .finally(() => setLoading(false));
  };

  return {
    isLoadingPrenotation,
    doPrenotation,
    prenotation,
    getPrenotationStatus,
    error,
    message,
    terminatePrenotation,
    getPrenotations,
    prenotationList
  };
}
