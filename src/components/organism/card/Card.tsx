export type CardProps = {};
/**
 * Component - Card
 * @param menu    array tobe iterated
 *                  menu: [{
 *                            uid: string,
 *                            isToggle: boolean,
 *                            isAlt: boolean,
 *                            name: string,
 *                            alt?: string, optional param
 *                         }]
 * @param click   callback to be fired when button is click
 * @returns Card
 */
const Card: React.FC<CardProps> = ({}) => {
  return (
    <div className="card">
      {/* {menu.map((m) =>
        m.isToggle ? (
          <NavButton data={m} key={m.uid} click={toggle} />
        ) : (
          <NavButton data={m} key={m.uid} click={click} />
        )
      )} */}
    </div>
  );
};

export default Card;
