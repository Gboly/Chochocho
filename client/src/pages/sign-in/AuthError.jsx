import { useEffect } from "react";

export default function AuthError({ error }) {
  useEffect(() => {
    error &&
      (error.status === 401 || error.originalStatus === 401) &&
      // I need a page refresh for everytime is logged out just so data does not remain cached. Hence, the use of the native js navigation instead of the useNavigate.
      (window.location.href = "/auth/sign-in");
  }, [error]);

  return <></>;
}
