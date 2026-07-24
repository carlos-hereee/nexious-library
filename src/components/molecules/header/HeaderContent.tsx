import { ErrorMessage, Heading } from "@nxs-atoms/index";
import type { PHeaderCotent } from "nxs-typography";

const HeaderContent: React.FC<PHeaderCotent> = ({ data, children, theme, isDev }) => {
  if (!data)
    return (
      <ErrorMessage
        isDev={isDev}
        error={{ value: data, code: "missingProps", prop: "data", component: "HeaderContent" }}
      />
    );
  return (
    <div className={theme || "header-content"}>
      {data.title && <Heading data={data.title} />}
      {data.tagline && <Heading data={data.tagline} scale={2} />}
      {data.subtitle && <Heading data={data.subtitle} scale={4} />}
      {children}
    </div>
  );
};
export default HeaderContent;
