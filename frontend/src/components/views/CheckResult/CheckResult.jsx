import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

function CheckResult() {
  const history = useHistory();
  const movePage = (url) => {
    history.push(url);
  };
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => movePage("/main")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default CheckResult;
