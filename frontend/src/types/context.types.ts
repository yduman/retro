export interface Action {
  type: string;
}

// --------------- REDUCER STATE TYPES --------------- //
export interface UserState {
  role: string;
  name: string;
  maxVoteCount: number;
  votesLeft: number;
  votedItems: string[];
}

export interface BoardState {
  focusedCard: string;
  showContinueDiscussion: boolean;
  continueDiscussionVotes: {
    yes: number;
    no: number;
    abstain: number;
  };
}

export interface DialogState {
  itemId: string | null;
  columnId: string | null;
  itemAuthor: string;
  itemContent: string;
  columnTitle: string;
  isDeleteItemDialogOpen: boolean;
  isDeleteColumnDialogOpen: boolean;
  isEditItemDialogOpen: boolean;
  isEditColumnDialogOpen: boolean;
  isCreateItemDialogOpen: boolean;
}

// --------------- REDUCER ACTION TYPES --------------- //
export interface UserAction extends Action {
  payload?: {
    cardId?: string;
    maxVoteCount?: number;
    name?: string;
    role?: string;
  };
}

export interface BoardAction extends Action {
  payload?: {
    focusedCard?: string;
    isToggled?: boolean;
  };
}

export interface DialogAction extends Action {
  payload?: {
    itemId?: string;
    columnId?: string;
    itemAuthor?: string;
    itemContent?: string;
    columnTitle?: string;
  };
}

// ---------- CONTEXT PROVIDER VALUES TYPES ---------- //
export interface UserContextValues {
  userState: UserState;
  upvoteCard: (boardId: string, cardId: string, votesLeft: number) => void;
  downvoteCard: (boardId: string, cardId: string, votesLeft: number) => void;
  setMaxVote: (boardId: string, maxVoteCount: number) => void;
  resetVotes: (boardId: string, maxVoteCount: number) => void;
  setUsername: (boardId: string, name: string) => void;
  createModerator: (
    boardId: string,
    role: string,
    maxVoteCount: number
  ) => void;
  createParticipant: (
    boardId: string,
    role: string,
    maxVoteCount: number
  ) => void;
}

export interface BoardContextValues {
  boardId: string;
  boardState: BoardState;
  socket: SocketIOClient.Socket;
  setFocusedCard: (focusedCard: string) => void;
  removeFocusedCard: () => void;
  toggleContinueDiscussion: (isToggled: boolean) => void;
  voteYes: () => void;
  voteNo: () => void;
  voteAbstain: () => void;
}

export interface DialogContextValues {
  dialogsState: DialogState;
  openDeleteItemDialog: (itemId: string) => void;
  openDeleteColumnDialog: (columnId: string) => void;
  openEditItemDialog: (
    itemId: string,
    itemAuthor: string,
    itemContent: string
  ) => void;
  openEditColumnDialog: (columnId: string, columnTitle: string) => void;
  openCreateItemDialog: (columnId: string, itemAuthor: string) => void;
  closeDeleteItemDialog: () => void;
  closeDeleteColumnDialog: () => void;
  closeEditItemDialog: () => void;
  closeEditColumnDialog: () => void;
  closeCreateItemDialog: () => void;
}
