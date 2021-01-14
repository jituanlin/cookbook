import React, { useEffect, useState } from "react";
import { services } from "toy-js/dist/es6/index.client";
import type { FileService } from "./FileService";

export const ToyJsExample = () => {
  const [content, setContent] = useState("");

  const fetchFileContent = async () => {
    const fileService = new services.FileService<FileService>();
    const content = await fileService.readFile("./index.tsx");
    setContent(content);
  };
  useEffect(() => {
    fetchFileContent();
  }, []);

  return <div>{content}</div>;
};
