import React, { useState } from "react";

const Folder = ({ id, name, isFolder, items, addNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [createNewData, setCreateNewData] = useState<{
    isVisible: boolean;
    isFolder: boolean;
  }>({
    isVisible: false,
    isFolder: false,
  });

  const handleFolderClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleCreateNewClick = (e, isFolder: boolean) => {
    e.stopPropagation();
    setCreateNewData((prev) => {
      return {
        isVisible: !prev.isVisible,
        isFolder: isFolder,
      };
    });
  };

  const handleCreateNewKeyDown = (e) => {
    if (e.keyCode === 13) {
      const name = e.target.value;
      addNode(id, name, createNewData.isFolder);
      setCreateNewData((prev) => {
        return {
          ...prev,
          isVisible: !prev.isVisible,
        };
      });
    }
  };

  if (!isFolder) {
    return (
      <div className="FileName">
        <span>📄{name}</span>
      </div>
    );
  }

  return (
    <div className="FolderContainer">
      <div className="FolderName" onClick={handleFolderClick}>
        <span>📁{name}</span>
        <span>
          <button onClick={(e) => handleCreateNewClick(e, true)}>
            Folder +
          </button>
          <button onClick={(e) => handleCreateNewClick(e, false)}>
            File +
          </button>
        </span>
      </div>

      {createNewData.isVisible && (
        <div className="CreateNewContainer">
          <span>{createNewData.isFolder ? "📁" : "📄"}</span>
          <input onKeyDown={handleCreateNewKeyDown}></input>
        </div>
      )}

      {isVisible &&
        items.map((item) => {
          return <Folder key={item.id} {...item} addNode={addNode} />;
        })}
    </div>
  );
};

export default Folder;
