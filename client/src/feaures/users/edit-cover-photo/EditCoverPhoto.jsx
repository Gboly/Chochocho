// import SimpleHeader from "../../../components/simple-header/SimpleHeader";
// import "./edit-avatar.css";
// import { Stack, Slider } from "@mui/material";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RestartAltIcon from "@mui/icons-material/RestartAlt";
// import { closeEditAvatar } from "../../../app/actions/profileActions";
// import { getEditAvatarState } from "../../../pages/profile/profileSlice";
// import { useSelector } from "react-redux";

// export default function EditAvatar() {
//   const { src } = useSelector(getEditAvatarState);
//   return (
//     <div className="edit-avatar-container">
//       <SimpleHeader desc={"Edit photo"} closeAction={closeEditAvatar} />
//       <div>
//         <img src={src} alt="edit new avatar" />
//         <div></div>
//       </div>
//       <section>
//         <aside>
//           <div>
//             <Stack spacing={1.5} direction="row" alignItems="center">
//               <RemoveCircleOutlineIcon style={{ fontSize: "1.2rem" }} />
//               <Slider sx={{ width: "12rem", color: "#c32aa3" }} />
//               <AddCircleOutlineIcon style={{ fontSize: "1.2rem" }} />
//             </Stack>
//           </div>
//           <span>45%</span>
//           <i>
//             <RestartAltIcon />
//           </i>
//         </aside>
//         <button>Save</button>
//       </section>
//     </div>
//   );
// }
