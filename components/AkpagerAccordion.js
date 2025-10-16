
const AkpagerAccordion = ({ event, active, onClick, title, children }) => {
  const isActive = active === event;

  return (
    <div className="mb-4">
      <h5 className="mb-0">
        <button
          className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 flex items-center justify-between ${
            isActive
              ? 'bg-[#FEC458]/10 border-2 border-[#FEC458] text-white'
              : 'bg-black/5 border border-white/10 text-white/90 hover:bg-black/10'
          }`}
          onClick={() => onClick(event)}
        >
          <span className="font-medium text-lg">{title}</span>
          <span className={`text-2xl transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
            {isActive ? '−' : '+'}
          </span>
        </button>
      </h5>
      <div className={`overflow-hidden transition-all duration-300 ${
        isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 text-white/80 text-base leading-relaxed whitespace-pre-line">
          {children || (
            <p>
              At vero eoset accusamus etiusto dignissimos duci blanditiis
              praesentium corrupti dolores molest excepturi sint occaecati
              cupiditate
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AkpagerAccordion;
