import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import {
  chatsBasePathType,
  communityBasePathType,
  homeBasePathType,
  notificationsBasePathType,
  profileBasePathType,
  settingsBasePathType,
} from "./types";

export const sidebarContent = [
  {
    name: "Home",
    icon: <OtherHousesOutlinedIcon />,
    id: homeBasePathType,
  },
  {
    name: "Profile",
    icon: <PermIdentityOutlinedIcon />,
    id: profileBasePathType,
  },
  {
    name: "Community",
    icon: <PeopleAltOutlinedIcon />,
    id: communityBasePathType,
  },
  {
    name: "Chats",
    icon: <LocalPostOfficeOutlinedIcon />,
    id: chatsBasePathType,
  },
  {
    name: "Notification",
    icon: <NotificationsOutlinedIcon />,
    id: notificationsBasePathType,
  },
  // {
  //   name: "Explore",
  //   icon: <ExploreOutlinedIcon />,
  //   id: "explore",
  // },
  {
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    id: settingsBasePathType,
  },
  {
    name: "Logout",
    icon: <LogoutOutlinedIcon />,
    id: "log-out",
  },
];
