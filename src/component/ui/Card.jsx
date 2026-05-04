function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[22px] border border-[#e7e2d6] bg-white p-5 shadow-[0_10px_30px_rgba(32,44,35,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;