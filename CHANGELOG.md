# Changelog

## [Unreleased]

### Added

- Import/Export of board data
  - If you want to reuse a board for another retrospective, you can now export the data of the board as JSON and import it later for another session
- Docker development support
- Container-based deployment support

### Changed

- Frontend
  - Using TypeScript now!
  - Major UI redesign!
  - Hooks all the way - no more HOCs!
- Backend
  - Storage clean up will now be handled via Node.js instead of writing your own cronjob manually

### Fixed

- The call to `getBoard()` on the backend now handles parsing errors and redirects the user to the error page

### Removed

## [0.3.2] - 2019-10-21

### Added

- Retro Formats
  - On board creation, the user can now select well known retrospective formats

### Changed

- Maximum card content length is now 10000

## [0.3.1] - 2019-09-30

### Changed

- Some dependency updates
- Dialogs don't display an error state by default (#44)

### Fixed

- Fixed draggable dialogs
  - Dialog components are now outside of a drag and drop context
- Fixed layout issues regarding the buttons on the board header
- Fixed layout issues regarding board cards (#43)
- Fixed an issue where columns where expanding its height while dragging (#45)
- Fixed vote count dialog (#42)
  - Disallowed negative vote counts
  - Cancel button should work properly now

## [0.3.0] - 2019-08-22

### Added

- **Validation** for all Dialogs
- **Error messages** for all text fields that are invalid
- **ESLint** for `backend`
- **Roles**
  - Users are now divided into roles: **1 moderator and N participants**
  - Moderator
    - the moderator is the one, who's controlling the retrospective and has access to features that participants don't have
  - Participants
    - participants are the ones, who are joining the retrospective and just have the ability to make CRUD operations on cards or open the QR-Code modal
- **Author name autofill**
  - You can now provide your name which will be saved and autofilled on each card creation
- **New voting system**
  - Vote Count button
    - is only accessible by the moderator
    - the moderator can set a maximum vote count for each user
    - the moderator can also reset all votes in order to start a re-vote
    - re-setting the maximum vote count is also considered as a re-vote
    - by default, every user has 3 votes
  - While voting several things happen
    - a Snackbar opens which displays how many votes are left for the user
    - on the voted card, a thumb-down icon appears, which let's you take back your vote 
    - all cards you voted for are highlighted with a dark background on the Avatar
    - after reaching your maximum amount of votes, you can't vote anymore, unless you take back a vote from another card
- **Tab Name**
  - `document.title` is now set as `"Retro | <YOUR_BOARD_NAME>"`
- **QR-Code**
  - Mobile users can now scan a QR-Code which should open the link to the board in the browser 
    - _thanks to @mrpatpat_
- **Hooks and Context API**
  - we removed a lot of prop-drilling, boilerplate code and refactored all classes to functional components, utilizing React Hooks and the new Context API
  - BoardContext
    - provides the `boardId` to all child components
    - provides the `socket` to all child components
  - UserContext
    - provides user related data and performs changes, utilizing `useReducer`
- **Preventing unwanted card merges**
  - Sometimes when I was dragging cards around I merged them by accident. To prevent this, we're now prompting the user if it really wants to merge or not.
- **Highlight the card that is currently talked about**
  - The moderator can now highlight the card that the team is currently talking about. This is handy if you are for example in a video conference. The moderator can highlight a card by hovering over a card and pressing the `F` key, which will make the border of the card red. The moderator can remove the highlighting by hovering over a card and pressing `Shift + F`.
- **E2E Tests**
  - I replaced `testing-library/react` with `cypress`. The reason was that I didn't wanted to test each of my components on its own. I rather wanted something like scenario testing and Cypress really suits well for this case.
- **husky & lint-staged**
  - These both libraries are executing formatting, linting and testing of code before commit and push
- **LocalStorage**
  - We're using the LocalStorage to store important data. In the future, this will be removed, since we'll add a database.
  - We store it the following way
    - Key: Board ID
    - Value: `{maxVoteCount: number, name: string, role: string, votedItems: Array<string>, votesLeft: number}`
  - The original idea of Retro was to use the app for a single session, that is why we're currently not using a DB for instance. Now we get feature requests that will need a DB and we could realize some of the features for now by adding the LocalStorage layer.
  - **Dealing with moderator**: If your moderator is somehow missing and you want to swap the role of someone, then please change the `role` field from `participant` to `moderator`.

### Changed

- Less used column buttons like delete, edit and sort are now grouped in a menu, so that the column header looks cleaner and we have more space for the column name itself
- Replaced `uniqid` with `nanoid`
- Some API changes due to updated dependencies
- Rewrite of socket API in `frontend`
  - Formerly, each call to `connectSocket(id)` would create a new socket. This meant that every feature which needed to send data with a socket would create an additional socket (yeah I know). The rewrite to a Singleton ensured that there is now only one socket per user. Furthermore we removed all values from the deps array of `useEffect`, since we only want the listeners to be created once. In some tests we inspected that certain events took too long, because some listners would be created over and over again.

### Fixed

- CSS issues
  - Really long words are now handled properly
  - Mobile UI should be a bit better now 
    - _thanks to @mrpatpat_
- Improved render performance on several places
- `LoadBoardDialog` validation should not result in a `SyntaxError` anymore
- All invalid URLs will now be redirected to a 404 page
- The client-side `CONNECT` socket-event shouldn't cause a re-render anymore
- Persistent state now on the Board-Page

## [0.2.1] - 2019-03-29

### Fixed

- WebSockets are now in their appropriate room. Every room is defined by the board ID

## [0.2.0] - 2019-03-29

### Added

- Edit column names
- Load your board by providing a board ID
- Rudimentary solution for maximum votes

### Removed

- Removed the "New Board" button on the board component because it behaved really buggy

### Fixed

- Fixed some minor naming issues

## [0.1.0] - 2019-03-29

### Added

- Create boards
- Create columns 
- Create cards 
- Delete columns 
- Delete cards
- Edit cards
- Sort columns
- Toggle blurring on cards
- Export your board
- Drag and drop columns and cards
- Combine two cards
- Upvote cards

[Unreleased]: https://github.com/yduman/retro/compare/0.3.2...master
[0.3.2]: https://github.com/yduman/retro/releases/tag/0.3.2
[0.3.1]: https://github.com/yduman/retro/releases/tag/0.3.1
[0.3.0]: https://github.com/yduman/retro/releases/tag/0.3.0
[0.2.1]: https://github.com/yduman/retro/releases/tag/0.2.1
[0.2.0]: https://github.com/yduman/retro/releases/tag/0.2.0
[0.1.0]: https://github.com/yduman/retro/releases/tag/0.1.0