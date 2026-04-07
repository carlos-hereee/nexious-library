interface ContainerHeaderProps {
  data: {
    title?: string;
    subtitle?: string;
    name?: string;
    description?: string;
  };
  onClose?: () => void;
  children?: React.ReactNode;
  subTitleTheme?: string;
}

const ContainerHeader = ({ data, onClose, children, subTitleTheme }: ContainerHeaderProps) => (
  <div className="container w-full">
    <div className="container-header">
      <div className="header-content">
        {(data.title || data.name) && <h1 className="heading">{data.title || data.name}</h1>}
        {(data.subtitle || data.description) && (
          <h3 className={`heading ${subTitleTheme || ""}`}>{data.subtitle || data.description}</h3>
        )}
      </div>
      {onClose && (
        <div>
          <button type="button" aria-label="Close" className="container-btn required highlight" onClick={onClose}>
            &times;
          </button>
        </div>
      )}
    </div>
    {children}
  </div>
);
export default ContainerHeader;
