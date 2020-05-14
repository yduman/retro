export const BACKEND_DEV_HOST = "localhost";

export const BACKEND_DEV_PORT = 3001;

export const BACKEND_ENDPOINT =
  process.env.REACT_APP_PROD_URL || `http://${BACKEND_DEV_HOST}:${BACKEND_DEV_PORT}`;

export const defaultBoard = {
  boardId: "",
  title: "",
  format: "",
  items: [],
  columns: [],
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

export const isBoardIdValid = async (boardId) => {
  try {
    const response = await fetch(`/api/boards/validate/${boardId}`);

    return await response.ok;
  } catch (error) {
    return error;
  }
};

export const exportBoard = async (boardId) => {
  try {
    const response = await fetch(`/api/boards/export/${boardId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const isInputEmpty = (inputLength) => inputLength <= 0;

export const validateInput = (inputLength, minLength, maxLength) => {
  const isEmpty = isInputEmpty(inputLength);
  const isTooLong = inputLength > maxLength;
  const isValid = !isEmpty && !isTooLong;

  return { isEmpty, isTooLong, isValid };
};

export const removeFirstOccurenceFromArray = (array, element, shallReturn) => {
  const index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1);
  }

  if (shallReturn) {
    return array;
  }
};

export const isSamePosition = (source, destination) => {
  return destination.droppableId === source.droppableId && destination.index === source.index;
};

export const isSameColumn = (columns, source, destination) => {
  return columns[source.droppableId] === columns[destination.droppableId];
};
