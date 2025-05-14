import { useEffect, useState } from "react";

/* 
{
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
} */

const USER_URI_API = "https://jsonplaceholder.typicode.com/users";
export function useFetchUser(userId) {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUser = async () => {
      try {
        setError(undefined);
        setIsLoading(true);
        const response = await fetch(`${USER_URI_API}/${userId}`, {
          signal: abortController.signal,
        });
        const jsonRes = await response.json();
        setUserData(jsonRes);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  return { userData, isLoading, error };
}
