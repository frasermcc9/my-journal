import { gql } from "@apollo/client";
import { Fade } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { sanitize } from "dompurify";
import { convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import client from "../apollo/client";
import { ContentProviderImpl, QUERY_CONTENT } from "../apollo/providers/ContentProvider";
import UnixTimeRoundToDay, {
  TimeConverterStrategy,
} from "../util/TimeConverter/TimeConverterStrategy";
import Calendar from "./calendar/Calendar";
import EditorScreen from "./editor/Editor";
import { Header } from "./editor/Header";
import Actions from "./util/Actions";

require("medium-editor/dist/css/medium-editor.css");
require("medium-editor/dist/css/themes/default.css");

interface AppProps {
  timeConversionStrategy: TimeConverterStrategy;
}

const App: React.FC<AppProps> = ({ timeConversionStrategy }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDay, setActiveDay] = useState(new Date(Date.now()));

  const contentProvider = new ContentProviderImpl();
  const updateContent = contentProvider.saveContent();

  const saveContent = async () => {
    const dateCopy = new Date(activeDay);
    const raw = convertToRaw(editorState.getCurrentContent());
    const jsonRaw = JSON.stringify(raw);
    const clean = sanitize(jsonRaw);

    await updateContent({
      variables: {
        day: timeConversionStrategy.convertTime(dateCopy),
        content: clean,
      },
      refetchQueries: [
        { query: QUERY_CONTENT, variables: { day: timeConversionStrategy.convertTime(dateCopy) } },
      ],
    });
  };
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleDayChosen = (date: Date) => {
    saveContent();
    setActiveDay(date);
    setShowCalendar(false);
  };

  const handleCalendarSelection = () => {
    saveContent();
    setShowCalendar(!showCalendar);
  };

  const headerArrowHook = () => {
    saveContent();
    return true;
  };

  return (
    <div className="overflow-hidden h-full">
      <Header
        setActiveDay={setActiveDay}
        calendarHandler={handleCalendarSelection}
        date={activeDay}
        preDateHook={headerArrowHook}
      />

      {showCalendar ? (
        <Fade in={showCalendar}>
          <div>
            <div>
              <Calendar onDayChosen={handleDayChosen} date={activeDay} />
            </div>
            <div>
              <Actions actions={SpeedDialActions} />
            </div>
          </div>
        </Fade>
      ) : (
        <EditorScreen
          timeConversionStrategy={new UnixTimeRoundToDay()}
          date={activeDay}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      )}
    </div>
  );
};

export default App;

const SpeedDialActions = [
  {
    icon: <ExitToApp />,
    name: "Logout",
    action: () => client.mutate({ mutation: MUTATE_LOGOUT }) && window.location.reload(),
  },
];

const MUTATE_LOGOUT = gql`
  mutation {
    logout
  }
`;
