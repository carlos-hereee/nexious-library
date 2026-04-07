import IconButton from "@nxs-molecules/buttons/IconButton";

interface MessageReactionsProps {
  likeList: string[];
  messageId: string;
  theme?: string;
  commentPing?: number;
  activeReply?: boolean;
  replyIcon?: boolean;
  allowRemoval?: boolean;
  onLikeClick?: () => void;
  onReplyClick?: () => void;
  onRemovalClick?: () => void;
}

const MessageReactions = (props: MessageReactionsProps) => {
  const { likeList, messageId, activeReply, replyIcon, theme, allowRemoval, commentPing } = props;
  const { onReplyClick, onLikeClick, onRemovalClick } = props;
  return (
    <div className={`flex-g${theme ? ` ${theme}` : ""}`}>
      {onLikeClick && (
        <IconButton
          icon={{ icon: "heart" }}
          title="Like"
          theme={`btn-icon-reaction btn-small highlight${likeList.includes(messageId) ? ` btn-like-icon` : ""}`}
          onClick={onLikeClick}
        />
      )}
      {onReplyClick && (
        <IconButton
          icon={{ icon: replyIcon ? "reply" : "comment" }}
          title={replyIcon ? "Reply" : "Comment"}
          theme={`btn-icon-reaction highlight btn-small${activeReply ? " btn-selected" : ""}`}
          onClick={onReplyClick}
          ping={commentPing || undefined}
        />
      )}
      {allowRemoval && (
        <IconButton
          icon={{ icon: "cancel" }}
          title="Remove reaction"
          theme={`btn-icon-reaction highlight btn-small${activeReply ? " btn-selected" : ""}`}
          onClick={onRemovalClick}
        />
      )}
    </div>
  );
};
export default MessageReactions;
