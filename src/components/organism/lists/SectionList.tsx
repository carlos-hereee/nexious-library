import { Card, HeroCard } from "@nxs-organism";
import type { CardSectionList } from "nxs-card";

const SectionList: React.FC<CardSectionList> = ({ sections, className, handleClick }) => {
  // incase empty
  if (sections.length === 0) return <div />;
  // iterate list

  return (
    <div className={className || (sections.length > 3 ? "sections-container" : "sections-grid")}>
      {sections.map((section) =>
        section.hero ? (
          <div className={`${section.className}-wrapper`} key={section.uid}>
            <HeroCard data={section} hero={section.hero} onClick={handleClick} />
            {section.body && <p className="w-full">{section.body}</p>}
          </div>
        ) : (
          <Card data={section} key={section.uid} />
        )
      )}
    </div>
  );
};

export default SectionList;
