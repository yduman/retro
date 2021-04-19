export interface RetroCard {
  id: string;
  author: string;
  content: string;
  points: number;
  isBlurred: boolean;
  isDiscussed: boolean;
}

export interface RetroColumn {
  id: string;
  columnTitle: string;
  itemIds: string[];
  isBlurred: boolean;
}

export interface RetroBoard {
  boardId: string;
  title: string;
  format: string;
  items: {
    [key: string]: RetroCard;
  };
  columns: {
    [key: string]: RetroColumn;
  };
  columnOrder: string[];
  error: boolean;
  isBlurred: boolean;
  maxVoteCount: number;
  showContinueDiscussion: boolean;
  continueDiscussionVotes: {
    yes: number;
    no: number;
    abstain: number;
  };
}

export interface Poker {
  pokerId: string;
  story: PokerStory;
  pokerUnit: PokerUnit;
  error: boolean;
  participants: PokerUser[];
  chartData: PokerChartData;
}

export interface PokerChartData {
  data: ChartData[];
}

export interface ChartData {
  name: string;
  value: number;
}

interface PokerUnit {
  unitType: string;
  unitRangeHigh: number;
}

interface PokerUser {
  id: string;
  role: string;
  name: string;
  vote: number;
  voted: false;
}

interface PokerStory {
  storyTitle: string;
  storyUrl?: string;
}

export type DarkTheme = "dark";

export type LightTheme = "light";
