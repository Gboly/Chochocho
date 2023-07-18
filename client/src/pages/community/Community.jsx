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
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getCommunityOutletIndexFromLocation,
  showPopupOnTransparentOverlay,
} from "../../util/functions";
import { GeneralContext } from "../../routes/Router";
import { outletOptionsType } from "../../util/types";

export default function Community() {
  const communityNode = useRef();
  const dispatch = useDispatch();
  const { isOpen: outletOptionIsOpen, valueId } =
    useSelector(getOutletOptionState);

  const { authUser } = useContext(GeneralContext);
  const followers = authUser?.followers || [];
  const followings = authUser?.following || [];

  const navigate = useNavigate();
  const location = useLocation();

  // const [valueId, setvalueId] = useState(value);
  // console.log(value, valueId);

  useLayoutEffect(() => {
    //setvalueId(getCommunityOutletIndexFromLocation(location.pathname));
    dispatch(
      setOutletOption(getCommunityOutletIndexFromLocation(location.pathname))
    );
  }, [location, dispatch]);

  const outlets = [
    `${followers.length} Followers`,
    `${followings.length} Following`,
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

  const showOptions = (e) => {
    const overlayParams = {
      type: outletOptionsType,
      x: e.clientX,
      y: e.clientY,
    };
    showPopupOnTransparentOverlay(openOutletOptions, overlayParams);
  };

  return (
    <>
      <div ref={communityNode} className="community-wrapper">
        <div>
          <header>
            {content}
            <div onClick={showOptions}>
              <CustomSelect {...CustomSelectProps} />
            </div>
          </header>
          {authUser && (
            <Outlet
              context={{ followers, followings, authUser, communityNode }}
            />
          )}
        </div>
      </div>
      <div className="rightbar-container">
        <RightBar />
      </div>
    </>
  );
}
