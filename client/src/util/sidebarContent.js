import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";

export const sidebarContent = [
  {
    name: "Home",
    icon: <OtherHousesOutlinedIcon />,
    id: "",
  },
  {
    name: "Profile",
    icon: <PermIdentityOutlinedIcon />,
    id: "profile",
  },
  {
    name: "Community",
    icon: <PeopleAltOutlinedIcon />,
    id: "community",
  },
  {
    name: "Chats",
    icon: <LocalPostOfficeOutlinedIcon />,
    id: "chats",
  },
  {
    name: "Notification",
    icon: <NotificationsOutlinedIcon />,
    id: "notifications",
  },
  // {
  //   name: "Explore",
  //   icon: <ExploreOutlinedIcon />,
  //   id: "explore",
  // },
  {
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    id: "settings",
  },
  {
    name: "Logout",
    icon: <LogoutOutlinedIcon />,
    id: "log-out",
  },
];
