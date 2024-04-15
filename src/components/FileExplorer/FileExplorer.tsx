import React, { useState } from "react";

import "./FileExplorer.css";
import data from "../../data/fileExplorer.ts";
import Folder from "./Folder.tsx";

export interface FolderData {
  id: string;
  name: string;
  isFolder: boolean;
  items: FolderData[];
}

const FileExplorer = () => {
  const [fileExplorer, setfileExplorer] = useState<FolderData>(data);

  const handleInsert = (
    currentFile: FolderData,
    id: string,
    name: string,
    isFolder: boolean
  ): FolderData => {
    if (currentFile.id === id && currentFile.isFolder) {
      currentFile.items.unshift({
        id: new Date().getTime().toString(),
        name: name,
        isFolder: isFolder,
        items: [],
      });

      return currentFile;
    }

    let updatedItems: FolderData[] = [];

    updatedItems = currentFile.items.map((item) => {
      return handleInsert(item, id, name, isFolder);
    });

    return { ...currentFile, items: updatedItems };
  };

  const addNode = (id: string, name: string, isFolder: boolean) => {
    const newRoot = handleInsert(fileExplorer, id, name, isFolder);
    setfileExplorer(newRoot);
  };

  return <Folder {...fileExplorer} addNode={addNode} />;
};

export default FileExplorer;
