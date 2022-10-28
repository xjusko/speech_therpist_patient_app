import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AccountInfo } from "../utils/CommonTypes";

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
