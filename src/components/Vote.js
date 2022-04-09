import { useState } from "react";
import { FcUp, FcDown } from "react-icons/fc";
import Toast, { useToasts } from "@/components/Toast";
import Tooltip from "./Tooltip";

export default ({ idPost, vote }) => {
  const [isVote, setVote] = useState(vote);
  const [toast, setToast] = useToasts();
  const handleClick = (status) => {
    const body = JSON.stringify({
      idPost,
    });
    fetch("/api/posts/vote/" + status, {
      body,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setToast(res.error);
        setVote(res.vote);
        setToast("Vote successfully");
      })
      .catch((err) => {
        setToast("Something went wrong");
        console.log(err);
      });
  };
  return (
    <>
      {toast ? <Toast>{toast}</Toast> : null}
      <div className="flex flex-col items-center pt-8">
        <div className="flex">
          <button data-tip="Vote Lirick Up" data-for="voteUp" onClick={() => handleClick("UP")}>
            <FcUp className="h-8 w-8" />
          </button>
          <Tooltip id="voteUp" place="left" />
          <span className="mx-10 text-xl pt-1">{isVote}</span>
          <button onClick={() => handleClick("DOWN")} data-tip="Vote Lirick Down" data-for="voteDown">
            <FcDown className="h-8 w-8" />
          </button>
          <Tooltip id="voteDown" place="right" />
        </div>
      </div>
    </>
  );
};
