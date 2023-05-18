import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";

const Individual = () => {
  const { data: userData, error, loading } = useFetch("/leaderboard");

  useEffect(() => {
    if (error) {
      window.location.replace("/error");
    }
  }, [error]);

  return (
    <>
      <div>
        <p>Individual dashboard content</p>
      </div>
      {loading && <div>LOADING!</div>}
      {userData && <Leaderboard userData={userData} />}
    </>
  );
};
export default Individual;
