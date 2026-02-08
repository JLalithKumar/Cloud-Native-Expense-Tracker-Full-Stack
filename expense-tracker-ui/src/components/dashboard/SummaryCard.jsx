import "./dashboard.css";

const SummaryCard = ({ title, amount, type }) => {
  return (
    <div className={`summary-card ${type}`}>
      <h4>{title}</h4>
      <h2>₹ {amount}</h2>
    </div>
  );
};

export default SummaryCard;
