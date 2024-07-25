import React from "react";

type Props = { message: any };

const ErrorMessage = ({ message }: Props) => {
  return <div style={{ color: "red" }}>{message}</div>;
};

export default ErrorMessage;
