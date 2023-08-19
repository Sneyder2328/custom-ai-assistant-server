import timeout from "express-timeout-handler";
import { MAX_REQUEST_TIMEOUT } from "../utils/constants/constants.js";

export const timeoutMiddleware = timeout.handler({
  // Default timeout for all endpoints
  timeout: MAX_REQUEST_TIMEOUT,

  disable: ["write", "setHeaders", "send", "json", "end"],

  onTimeout: function (req, res, next) {
    res.status(503).send("Service unavailable. Please retry.");
  },
});
