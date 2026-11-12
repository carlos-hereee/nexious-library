import IconButton from "@nxs-molecules/buttons/IconButton";

interface MessageReactionsProps {
  likeList: string[];
  messageId: string;
  className?: string;
  commentPing?: number;
  activeReply?: boolean;
  replyIcon?: boolean;
  allowRemoval?: boolean;
  onLikeClick?: () => void;
  onReplyClick?: () => void;
  onRemovalClick?: () => void;
}

const MessageReactions = (props: MessageReactionsProps) => {
  const { likeList, messageId, activeReply, replyIcon, className, allowRemoval, commentPing } = props;
  const { onReplyClick, onLikeClick, onRemovalClick } = props;
  return (
    <div className={`flex-g${className ? ` ${className}` : ""}`}>
      {onLikeClick && (
        <IconButton
          icon={{ icon: "heart" }}
          title="Like"
          className={`btn-icon-reaction btn-small highlight${likeList.includes(messageId) ? ` btn-like-icon` : ""}`}
          onClick={onLikeClick}
        />
      )}
      {onReplyClick && (
        <IconButton
          icon={{ icon: replyIcon ? "reply" : "comment" }}
          title={replyIcon ? "Reply" : "Comment"}
          className={`btn-icon-reaction highlight btn-small${activeReply ? " btn-selected" : ""}`}
          onClick={onReplyClick}
          ping={commentPing || undefined}
        />
      )}
      {allowRemoval && (
        <IconButton
          icon={{ icon: "cancel" }}
          title="Remove reaction"
          className={`btn-icon-reaction highlight btn-small${activeReply ? " btn-selected" : ""}`}
          onClick={onRemovalClick}
        />
      )}
    </div>
  );
};
export default MessageReactions;
