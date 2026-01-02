import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FRSRedirect = () => {
  const { frsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (frsId) {
      // Extract the numeric part from FRS-IND-2026-XXXXXX format
      const match = frsId.match(/FRS-IND-\d{4}-(\d+)/i);
      if (match) {
        const shortId = parseInt(match[1], 10).toString(); // Remove leading zeros
        navigate(`/${shortId}`, { replace: true });
      } else {
        // If format doesn't match, redirect to home
        navigate("/", { replace: true });
      }
    }
  }, [frsId, navigate]);

  return null;
};

export default FRSRedirect;
