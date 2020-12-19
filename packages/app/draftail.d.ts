declare module "draftail" {
    import { EditorState, RawDraftContentState } from "draft-js";
    import * as React from "react";

    export interface DrafTailEditorProps {
        // Initial content of the editor. Use this to edit pre-existing content.
        rawContentState: RawDraftContentState | null;
        // Called when changes occured. Use this to persist editor content.
        onSave: (rawContent: RawDraftContentState | null) => void;
        // Content of the editor; when using the editor as a controlled component. Incompatible with `rawContentState` and `onSave`.
        editorState: EditorState;
        // Called whenever the editor state is updated. Use this to manage the content of a controlled editor. Incompatible with `rawContentState` and `onSave`.
        onChange: (editorState: EditorState) => void;
        // Called when the editor receives focus.
        onFocus: () => {};
        // Called when the editor loses focus.
        onBlur: () => {};
        // Displayed when the editor is empty. Hidden if the user changes styling.
        placeholder: string;
        // Enable the use of horizontal rules in the editor.
        enableHorizontalRule: boolean;
        // Enable the use of line breaks in the editor.
        enableLineBreak: boolean;
        // Show undo control in the toolbar.
        showUndoControl: boolean;
        // Show redo control in the toolbar.
        showRedoControl: boolean;
        // Disable copy/paste of rich text in the editor.
        stripPastedStyles: boolean;
        // Set whether spellcheck is turned on for your editor.
        // See https://draftjs.org/docs/api-reference-editor.html#spellcheck.
        spellCheck: boolean;
        // Set whether the editor should be rendered in readOnly mode.
        // See https://draftjs.org/docs/api-reference-editor.html#readonly
        readOnly: boolean;
        // Optionally set the overriding text alignment for this editor.
        // See https://draftjs.org/docs/api-reference-editor.html#textalignment.
        textAlignment: "left" | "center" | "right";
        // Optionally set the overriding text directionality for this editor.
        // See https://draftjs.org/docs/api-reference-editor.html#textdirectionality.
        textDirectionality: "left" | "center" | "right";
        // Set if auto capitalization is turned on and how it behaves.
        // See https://draftjs.org/docs/api-reference-editor.html#autocapitalize-string.
        autoCapitalize: boolean;
        // Set if auto complete is turned on and how it behaves.
        // See https://draftjs.org/docs/api-reference-editor.html#autocomplete-string.
        autoComplete: boolean;
        // Set if auto correct is turned on and how it behaves.
        // See https://draftjs.org/docs/api-reference-editor.html#autocorrect-string.
        autoCorrect: boolean;
        // See https://draftjs.org/docs/api-reference-editor.html#aria-props.
        ariaDescribedBy: null;
        // List of the available block types.
        blockTypes: any[];
        // List of the available inline styles.
        inlineStyles: any[];
        // List of the available entity types.
        entityTypes: any[];
        // List of active decorators.
        decorators: any[];
        // Additional React components to render in the toolbar.
        controls: any[];
        // List of plugins of the draft-js-plugins architecture.
        plugins: any[];
        // Max level of nesting for list items. 0 = no nesting. Maximum = 10.
        maxListNesting: number;
        // Frequency at which to call the save callback (ms).
        stateSaveInterval: number;
    }

    export class DraftailEditor extends React.PureComponent<Partial<DrafTailEditorProps>> {}
}
