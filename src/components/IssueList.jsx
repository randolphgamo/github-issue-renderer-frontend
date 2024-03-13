import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function IssueList(props) {
  //get the github token on the connected user
  const token = sessionStorage.getItem("token");

  //issues holds the current list of GitHub issues
  const [issues, setIssues] = useState([]);

  //keep track of any error while querying the API
  const [error, setError] = useState();

  //to show a fetching indicator
  const [isFetching, setIsFetching] = useState(false);

  //state variable to store linkheader
  const [linkHeader, setLinkHeader] = useState();

  sessionStorage.setItem("hasViewDetailsPage", false);

  var input = props.input;

  //we initialize the observer
  const observer = useRef();

  //to check if there are more pages
  let pagesRemaining = true;

  /*node correspond to the html element) */
  const lastIssueElementRef = useCallback((node) => {
    /* if we are still fetching don't return any thing */
    if (isFetching) return;

    if (observer.current) observer.current.disconnect();

    //this part only executes if the last issue is visible,
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("Visible");
        console.log(linkHeader);

        pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

        /* if there are no more pages then we don't need to fetch any more data */
        if (!pagesRemaining) {
          return;
        }

        /* I would have to fetch additional data */

        const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;

        const url = linkHeader.match(nextPattern)[0];

        //ref:https://dev.to/vishnusatheesh/exploring-infinite-scroll-techniques-in-react-1bn0

        

        const response = axios
          .get(url, {
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: `token ${token}`,
            },
            params: {
              per_page: 50,
            },
          })
          .then((response) => {
            setIssues([...issues, ...response.data]);
            setLinkHeader(response.headers.link);
          });

        //
      }
    });

    /* if we have a last element  then we want to observe it */
    if (node) {
      observer.current.observe(node);
    }
  });

  const url = `https://api.github.com/repos/${input}/issues`;

  useEffect(() => {
    async function fetchIssues() {
      try {
        setIsFetching(true);
        //  const token = "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";
        const response = await axios.get(url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
          params: {
            per_page: 50,
          },
        });

        setIssues(response.data);
        setLinkHeader(response.headers.link);

        /*  console.log(
          response.headers.link.match(/(?<=<)([\S]*)(?=>; rel="Next")/i)[0]
        ); */

        setIsFetching(false);
        setError(false);
      } catch (error) {
        /* the error is thrown by axios*/
        setError(error);
      }
    }
    fetchIssues();
  }, [props.input]);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <>
      {isFetching && <p>Fetching data ... </p>}
      {!isFetching && issues.length && (
        <>
          <h1>You are currently viewing issues for {props.input}</h1>
          <div className="issue-list">
            <ul>
              {/* map through the array of issues and render them*/}
              {issues.map((issue, index) => {
                if (issues.length === index + 1) {
                  return (
                    <li ref={lastIssueElementRef} key={issue.id}>
                      <Link to={`/${props.input}/issues/${issue.number}`}>
                        #{issue.number} {issue.title}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={issue.id}>
                      <Link to={`/${props.input}/issues/${issue.number}`}>
                        #{issue.number} {issue.title}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default IssueList;
