interface CardDetailsData {
  details?: string;
  detailsList?: string[];
}

interface CardDetailsProps {
  data: CardDetailsData;
}

const CardDetails = ({ data }: CardDetailsProps) => (
  <div>
    {data.details && <h3 className="heading">{data.details}:</h3>}
    {data.detailsList && (
      <ul className="section-list-details-list">
        {data.detailsList.map((d) => (
          <li className="section-list-details-list-item" key={d}>
            {d}
          </li>
        ))}
      </ul>
    )}
  </div>
);
export default CardDetails;
