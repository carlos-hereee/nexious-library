export type HyperlinkProps = {
    data: {
        responseArr: [string, string];
        isLink?: boolean;
        link: string;
        word: string;
    };
};
export declare const Hyperlink: ({ data }: HyperlinkProps) => JSX.Element;
