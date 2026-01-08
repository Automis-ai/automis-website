import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const CaseStudyCard = ({
  caseStudy,
  imagePosition = 'top',
  index = 0,
  readMoreLabel = "Read Full Story"
}) => {
    const pathname = usePathname();
  const isItalian = pathname.startsWith('/it');
  const href = `${isItalian ? '/it' : ''}/use-cases/${caseStudy.slug}`;
  const {
    slug,
    industry,
    title,
    primaryMetric,
    primaryMetricLabel,
    supportingMetrics,
    heroImage
  } = caseStudy;

  const imageSection = (
    <div className={`!relative !overflow-hidden ${
      imagePosition === 'top' ? '!h-full !min-h-[300px]' : '!h-full !min-h-[300px]'
    }`}>
      <Image
        src={heroImage}
        alt={title}
        fill
        className="!object-cover !transition-transform !duration-500 group-hover:!scale-110"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <div className="!absolute !inset-0 !bg-gradient-to-t !from-gray-900 !via-gray-900/50 !to-transparent" />

      <div className="!absolute !top-4 !left-4">
        <span className="!inline-block !px-3 !py-1 !text-xs !font-semibold !text-gray-900 !bg-yellow-400">
          {industry}
        </span>
      </div>
    </div>
  );

  const backgroundColors = [
    '!bg-[#001916]',
    '!bg-[#1f0042]',
    '!bg-slate-800',
    '!bg-zinc-800'
  ];

  const contentSection = (
    <div className={`!p-16  ${backgroundColors[index % 4]}`}>
      <h3 className="!mb-4 !text-xl lg:!text-2xl !font-bold !text-white !leading-tight" data-aos="fade-up" data-aos-delay="100">
        {title}
      </h3>

      <div className="!mb-4" data-aos="fade-up" data-aos-delay="200">
        <div className="!text-3xl lg:!text-4xl !font-bold !text-yellow-400">
          {primaryMetric}
        </div>
        <div className="!text-sm !text-gray-400">{primaryMetricLabel}</div>
      </div>

      <div className="!flex !flex-wrap !gap-4 !mb-6" data-aos="fade-up" data-aos-delay="300">
        {supportingMetrics.map((metric, index) => (
          <div key={index} className="!text-left">
            <div className="!text-lg !font-semibold !text-white">{metric.value}</div>
            <div className="!text-xs !text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>

      <div data-aos="fade-up" data-aos-delay="400">
<Link
  href={href}
  className="!inline-flex !items-center !text-sm !font-semibold !text-yellow-400 hover:!text-yellow-300 !transition-colors !duration-200 !group"
>
<span>{readMoreLabel}</span>
        <svg
          className="!w-4 !h-4 !ml-2 !transition-transform !duration-200 group-hover:!translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      </div>
    </div>
  );

  return (
    <div
      className="!overflow-hidden !group !transition-all !duration-300 hover:!shadow-2xl hover:!shadow-yellow-400/10 !min-h-[550px] !flex !flex-col shadow-md shadow-yellow-500/10 !rounded-2xl"
    >
      {imagePosition === 'top' ? (
        <>
          {imageSection}
          {contentSection}
        </>
      ) : (
        <>
          {contentSection}
          {imageSection}
        </>
      )}
    </div>
  );
};

export default CaseStudyCard;