import { useEffect, useState } from "react";

export const useGetUserID = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    // Assuming you're getting the user ID from localStorage or another source
    const id = localStorage.getItem("userID");
    if (id) {
      setUserID(id);
    } else {
      console.error("No userID found in localStorage");
    }
  }, []);

  return userID;
};
