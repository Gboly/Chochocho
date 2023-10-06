import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import {
  bookmarksBasePathType,
  communityBasePathType,
  homeBasePathType,
  logOutType,
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
    name: "Bookmarks",
    icon: <BookmarkAddOutlinedIcon />,
    id: bookmarksBasePathType,
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
    id: logOutType,
  },
];
