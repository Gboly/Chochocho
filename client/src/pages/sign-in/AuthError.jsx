import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthError({ error }) {
  const navigate = useNavigate();

  useEffect(() => {
    error &&
      (error.status === 401 || error.originalStatus === 401) &&
      navigate("/auth/sign-in");
  }, [error, navigate]);

  return <></>;
}
