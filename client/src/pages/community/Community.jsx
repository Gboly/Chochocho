import "./community.css";
import RightBar from "../../feaures/right-bar/RightBar";
import CustomSelect from "../../components/custom-select/CustomSelect";
import { communityRoutes } from "../../util/formRadioOptions";
import { useSelector, useDispatch } from "react-redux";
import { getOutletOptionState } from "./communitySlice";
import {
  openOutletOptions,
  setOutletOption,
} from "../../app/actions/communityActions";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCommunityOutletIndexFromLocation } from "../../util/functions";
import { selectUserById } from "../../app/api-slices/usersApiSlice";

export default function Community() {
  const dispatch = useDispatch();
  const { isOpen: outletOptionIsOpen, valueId: value } =
    useSelector(getOutletOptionState);
  const user = useSelector((state) => selectUserById(state, 1));
  const followers = user?.followers || [];
  const following = user?.following || [];

  const navigate = useNavigate();
  const location = useLocation();

  const [valueId, setvalueId] = useState(value);

  useEffect(() => {
    setvalueId(getCommunityOutletIndexFromLocation(location.pathname));
  }, [location]);

  const outlets = [
    `${followers.length} Followers`,
    `${following.length} Following`,
    "People you might like",
  ];

  const handleOutletChange = (valId) => {
    dispatch(setOutletOption(valId));
    navigate(`/community/${communityRoutes[valId]}`);
  };

  const content = outlets.map((outlet, index) => (
    <button
      key={index}
      className={`community-outlet-button ${
        valueId === index ? "community-active-outlet" : ""
      }`}
      onClick={() => handleOutletChange(index)}
    >
      {outlet}
    </button>
  ));

  const CustomSelectProps = {
    options: outlets,
    valueId,
    isOpen: outletOptionIsOpen,
    getValue: (valId) => handleOutletChange(valId),
    style: "current-outlet",
  };

  return (
    <>
      <div className="community-wrapper">
        <div>
          <header>
            {content}
            <div onClick={() => dispatch(openOutletOptions())}>
              <CustomSelect {...CustomSelectProps} />
            </div>
          </header>
          <Outlet />
        </div>
      </div>
      <div className="rightbar-container">
        <RightBar />
      </div>
    </>
  );
}
