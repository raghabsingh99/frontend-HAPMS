function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-[#151d35]/90 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;