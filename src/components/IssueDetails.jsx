import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"; //to support tasklists
import Avatar from "./Avatar";

function IssueDetails() {
  //get the github token on the connected user
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  //to be able to use dayjs package.
  dayjs.extend(relativeTime);

  const params = useParams();

  //to hold the current GitHub issue
  const [issue, setIssue] = useState();

  //keep track of any error while querying the API
  const [error, setError] = useState();

  //to show a fetching indicator
  const [isFetching, setIsFetching] = useState(false);

  sessionStorage.setItem("hasViewDetailsPage", true);


  var input = params.owner + "/" + params.organisation;

  const url =
    "https://api.github.com/repos/" + input + "/issues/" + params.issueNumber;

  useEffect(() => {
    async function fetchIssue() {
      try {
        setIsFetching(true);
        const response = await axios.get(url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
        });
        setIssue(response.data);
        setIsFetching(false);
      } catch (error) {
        /* the error is thrown by axios*/
        setError(error);
      }
    }
    fetchIssue();
  }, []);


  if (error) {
    return <p style={{ color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {!isFetching && issue && (
        <>
        <Avatar />
        <div className="holder" >
          <div className="issue-details">
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h2>
              #{issue.number} {issue.title}
            </h2>
            <p>
              <strong>{issue.user?.login}</strong> wrote{" "}
              {dayjs(issue.created_at).fromNow()}
            </p>
            <p>
              <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                {issue.body}
              </Markdown>
            </p>
          </div>
          </div>
        </>
      )}
    </>
  );
}

export default IssueDetails;
