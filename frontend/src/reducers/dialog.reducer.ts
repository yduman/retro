import {
  OPEN_DELETE_ITEM_DIALOG,
  CLOSE_DELETE_ITEM_DIALOG,
  OPEN_DELETE_COLUMN_DIALOG,
  CLOSE_DELETE_COLUMN_DIALOG,
  OPEN_EDIT_ITEM_DIALOG,
  CLOSE_EDIT_ITEM_DIALOG,
  OPEN_EDIT_COLUMN_DIALOG,
  CLOSE_EDIT_COLUMN_DIALOG,
  OPEN_CREATE_ITEM_DIALOG,
  CLOSE_CREATE_ITEM_DIALOG,
} from "../actions/dialog.actions";
import { DialogState, DialogAction } from "../types/context.types";

export const reducer = (state: DialogState, action: DialogAction) => {
  switch (action.type) {
    case OPEN_DELETE_ITEM_DIALOG:
      return {
        ...state,
        itemId: action.payload?.itemId as string,
        isDeleteItemDialogOpen: true,
      };
    case CLOSE_DELETE_ITEM_DIALOG:
      return {
        ...state,
        itemId: null,
        isDeleteItemDialogOpen: false,
      };
    case OPEN_DELETE_COLUMN_DIALOG:
      return {
        ...state,
        columnId: action.payload?.columnId as string,
        isDeleteColumnDialogOpen: true,
      };
    case CLOSE_DELETE_COLUMN_DIALOG:
      return {
        ...state,
        columnId: null,
        isDeleteColumnDialogOpen: false,
      };
    case OPEN_EDIT_ITEM_DIALOG:
      return {
        ...state,
        itemId: action.payload?.itemId as string,
        itemAuthor: action.payload?.itemAuthor as string,
        itemContent: action.payload?.itemContent as string,
        isEditItemDialogOpen: true,
      };
    case CLOSE_EDIT_ITEM_DIALOG:
      return {
        ...state,
        itemId: null,
        itemAuthor: "",
        itemContent: "",
        isEditItemDialogOpen: false,
      };
    case OPEN_EDIT_COLUMN_DIALOG:
      return {
        ...state,
        columnId: action.payload?.columnId as string,
        columnTitle: action.payload?.columnTitle as string,
        isEditColumnDialogOpen: true,
      };
    case CLOSE_EDIT_COLUMN_DIALOG:
      return {
        ...state,
        columnId: null,
        columnTitle: "",
        isEditColumnDialogOpen: false,
      };
    case OPEN_CREATE_ITEM_DIALOG:
      return {
        ...state,
        columnId: action.payload?.columnId as string,
        itemAuthor: action.payload?.itemAuthor as string,
        itemContent: "",
        isCreateItemDialogOpen: true,
      };
    case CLOSE_CREATE_ITEM_DIALOG:
      return {
        ...state,
        columnId: null,
        itemAuthor: "",
        itemContent: "",
        isCreateItemDialogOpen: false,
      };
    default:
      return state;
  }
};
