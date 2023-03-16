declare module 'react-file-reader' {
    import * as React from 'react';
    export interface IFileReaderProps {
        as?: string;
        base64?: boolean;
        children?: React.ReactNode;
        disabled?: boolean;
        handleFiles: (files: FileList) => void;
        multipleFiles?: boolean;
        style?: React.CSSProperties;
        fileTypes?: string;
    }
    export default class FileReader extends React.Component<IFileReaderProps, {}> {
    }
}
