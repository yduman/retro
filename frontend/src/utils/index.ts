import { nanoid } from "nanoid";
import { DraggableLocation } from "react-beautiful-dnd";

export const BACKEND_DEV_HOST = "localhost";

export const BACKEND_DEV_PORT = 3001;

export const BACKEND_ENDPOINT =
  process.env.REACT_APP_PROD_URL ||
  `http://${BACKEND_DEV_HOST}:${BACKEND_DEV_PORT}`;

export const defaultBoard = {
  boardId: "",
  title: "",
  format: "",
  items: {},
  columns: {},
  columnOrder: [],
  error: false,
  isBlurred: true,
  maxVoteCount: 3,
  showContinueDiscussion: false,
  continueDiscussionVotes: {
    yes: 0,
    no: 0,
    abstain: 0,
  },
};

export const postData = (url = "", data = {}) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

function populateBoard(read: FileReader, title: string) {
  const readResult = read.result;
  if (typeof readResult === "string") {
    const tmpBoard = JSON.parse(readResult);
    tmpBoard.boardId = nanoid();
    tmpBoard.title = title;
    return JSON.stringify(tmpBoard);
  } else {
    throw new Error("Type of read.result while uploading was not a string!");
  }
}

export const upload = async (file: File, title: string) => {
  try {
    const response = await new Promise((resolve) => {
      const read = new FileReader();
      read.readAsBinaryString(file);
      read.onloadend = async () => {
        const board = populateBoard(read, title);
        const result = await fetch("/api/boards/template-import", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: board,
        });
        return resolve(result);
      };
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const isBoardIdValid = async (boardId: string) => {
  try {
    const response = await fetch(`/api/boards/validate/${boardId}`);
    return response.ok;
  } catch (error) {
    return error;
  }
};

export const exportBoard = async (boardId: string, resource: string) => {
  try {
    const response = await fetch(`/api/boards/${resource}/${boardId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const isInputEmpty = (inputLength: number) => inputLength <= 0;

export const validateInput = (
  inputLength: number,
  minLength: number,
  maxLength: number
) => {
  const isEmpty = isInputEmpty(inputLength);
  const isTooShort = inputLength < minLength;
  const isTooLong = inputLength > maxLength;
  const isValid = !isEmpty && !isTooShort && !isTooLong;

  return { isEmpty, isTooShort, isTooLong, isValid };
};

export const removeFirstOccurenceFromArray = (
  array: string[],
  element: string
): string[] => {
  const index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};

export const isSamePosition = (
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  return (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  );
};

export const isSameColumn = (columns: any, source: any, destination: any) => {
  return columns[source.droppableId] === columns[destination.droppableId];
};
