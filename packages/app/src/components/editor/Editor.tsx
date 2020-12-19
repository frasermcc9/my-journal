/// <reference path="../../../draftail.d.ts"/>

import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { convertFromRaw, EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
//@ts-ignore
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
import { DraftailEditor } from "draftail";
import "draftail/dist/draftail.css";
import React, { useEffect } from "react";
import { QUERY_CONTENT } from "../../apollo/providers/ContentProvider";
import { GetEntry } from "../../apollo/types";
import { TimeConverterStrategy } from "../../util/TimeConverter/TimeConverterStrategy";
import "./Editor.css";

interface EditorProps {
  date: Date;
  timeConversionStrategy: TimeConverterStrategy;
  editorState: EditorState;
  setEditorState: any;
}

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

const EditorScreen: React.FC<EditorProps> = ({
  date,
  timeConversionStrategy,
  editorState,
  setEditorState,
}) => {
  const { data, loading } = useQuery<GetEntry>(QUERY_CONTENT, {
    variables: {
      day: timeConversionStrategy.convertTime(date),
    },
  });

  useEffect(() => {

    const entry = data?.getEntry;

    if (!loading && entry) {
      const state = convertFromRaw(JSON.parse(entry.content));
      setEditorState(() => EditorState.createWithContent(state));
    } else {
      setEditorState(() => EditorState.createEmpty());
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="m-8 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="Editor">
          <DraftailEditor
            plugins={plugins}
            editorState={editorState}
            onChange={setEditorState}
            placeholder="What do you want to write?"
          />
          {/* @ts-ignore */}
          <InlineToolbar />
          <SideToolbar />
        </div>
      )}
    </>
  );
};

export default EditorScreen;
