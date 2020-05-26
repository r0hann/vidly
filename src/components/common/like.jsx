import React from "react";

const Like = ({ liked, onLikeToggle }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={onLikeToggle}
      aria-hidden="true"
    />
  );
};

export default Like;
