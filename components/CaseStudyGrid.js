import CaseStudyCard from './CaseStudyCard';

const CaseStudyGrid = ({ caseStudies }) => {
  return (
    <div className="!container !mx-auto">
      <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-5">
        {caseStudies.map((caseStudy, index) => (
          <div
            key={caseStudy.slug}
          >
            <CaseStudyCard
              caseStudy={caseStudy}
              imagePosition={index % 2 === 0 ? 'top' : 'bottom'}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyGrid;