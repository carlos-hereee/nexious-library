import { HeroCard } from "@nxs-organism";
import type { CardProp, CardSectionList } from "nxs-card";

const SectionList: React.FC<CardSectionList> = ({ sections }) => {
  // incase empty
  if (sections.length === 0) return <div />;
  // iterate list
  return (
    <div className={sections.length > 3 ? "sections-container" : "sections-grid"}>
      {sections.map((section) => (
        <div className="section-card" key={section.uid}>
          <HeroCard data={section as CardProp} hero={section.sectionHero} />
          {section.body && <p className="text-max">{section.body}</p>}
        </div>
      ))}
    </div>
  );
};

export default SectionList;
