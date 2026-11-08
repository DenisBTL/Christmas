import React from "react";
import { createRoot } from "react-dom/client";
import Christmas from "../app/christmas";
import "../app/globals.css";

declare const __CHRISTMAS_REPLIES_API__: string;

createRoot(document.getElementById("root")!).render(
  <Christmas replyEndpoint={__CHRISTMAS_REPLIES_API__} />,
);
