import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AccountInfo } from "../utils/CommonTypes";

// Save profile data information in context a provide it to all components

type ProfileContext = {
  profileData: AccountInfo;
  setProfileData: React.Dispatch<React.SetStateAction<AccountInfo>>;
};

const ProfileContext = createContext({} as ProfileContext);

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profileData, setProfileData] = useLocalStorage<AccountInfo>(
    "profileData",
    {} as AccountInfo
  );

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
}
