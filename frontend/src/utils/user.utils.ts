import { removeFirstOccurenceFromArray } from ".";

export const ROLE_MODERATOR = "moderator";

export const ROLE_PARTICIPANT = "participant";

export const getUser = (boardId: string) => {
  const userObject = localStorage.getItem(boardId);

  if (userObject !== null) {
    return JSON.parse(userObject);
  }

  return null;
};

export const setUser = (
  propertyName: string,
  newValue: any,
  boardId: string
) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    userObject[propertyName] = newValue;
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
};

// TODO: test this
export const setVotedItem = (
  cardId: string,
  boardId: string,
  isUpvote: boolean
) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    const votedItems = userObject["votedItems"];

    if (isUpvote) votedItems.push(cardId);
    else removeFirstOccurenceFromArray(votedItems, cardId);

    userObject["votedItems"] = votedItems;
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
};

export const setMaxVoteCountAndReset = (
  newVoteCount: number,
  boardId: string
) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    userObject["maxVoteCount"] = newVoteCount;
    userObject["votesLeft"] = newVoteCount;
    userObject["votedItems"] = [];
    saveToLocalStorage(boardId, JSON.stringify(userObject));
  }
};

export const hasVotedFor = (cardId: string, boardId: string) => {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    const votedItems = userObject["votedItems"];

    if (votedItems.includes(cardId)) {
      return true;
    }
  }

  return false;
};

export const createRole = (
  role: string,
  boardId: string,
  maxVoteCount: number
) => {
  const data = JSON.stringify({
    role,
    name: "",
    maxVoteCount,
    votesLeft: maxVoteCount,
    votedItems: [],
  });

  saveToLocalStorage(boardId, data);
};

const saveToLocalStorage = (boardId: string, data: string) => {
  localStorage.setItem(boardId, data);
};
