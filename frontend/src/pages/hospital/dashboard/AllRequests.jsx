import { useState, useEffect } from "react";
import axios from "../../../util/axios";
import RequestCard from "../requests/RequestCard";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { ParagraphText } from "../../../components/elements/paragraphText/ParagraphText";

export function AllRequests() {
  const [requests, setRequests] = useState([""]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await axios({
      method: "get",
      url: "/hospital/requests/all",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
      },
    });
    setRequests(response.data.requests);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : !requests ? (
        <ParagraphText
          text="You haven’t requested any models yet"
          align="left"
        />
      ) : (
        <Grid container spacing={2}>
          {requests.map((request, index) => (
            <Grid item xs={12} sm={12} md={6} key={request._id}>
              <RequestCard
                requestId={request._id}
                diseaseCategory={request.diseaseCategory}
                spec={request.spec}
                requestNumber={index + 1}
                requestStatus={request.status}
                formattedDate={request.formattedDate}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
