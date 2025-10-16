import Link from "next/link";

const CTAButton = ({
  href,
  children,
  variant = "primary",
  size = "medium",
  icon = null,
  iconPosition = "right",
  className = "",
  external = false,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "!inline-flex !items-center !justify-center !font-semibold !transition-all !duration-300 !transform hover:!-translate-y-0.5 !no-underline !cursor-pointer !bg-no-repeat focus:!outline-none focus:!ring-4 focus:!ring-blue-middle/50 !shadow-xl hover:!shadow-2xl";

  const sizes = {
    small: "!px-6 !py-3 !text-sm",
    medium: "!px-8 !py-4 !text-base",
    large: "!px-10 !py-5 !text-lg",
    xlarge: "!px-10 !py-6 !text-xl md:!text-2xl"
  };

  const variants = {
    primary: "!bg-gradient-to-r !from-blue-middle !to-blue-lightest !text-white hover:!from-yellow-light hover:!to-yellow-light/90 hover:!text-blue-darkest hover:!shadow-lg hover:!shadow-[#FEC458]/20 !border-2 !border-transparent hover:!scale-105",

    secondary: "!bg-gradient-to-r !from-blue-middle !to-blue-lightest !text-white hover:!from-yellow-light hover:!to-yellow-light/90 hover:!text-blue-darkest hover:!shadow-lg hover:!shadow-[#FEC458]/20 !border-2 !border-transparent hover:!scale-105",

    tertiary: "!bg-gradient-to-r !from-[#3C91E6] !to-[#B4C2FF] !text-white hover:!from-[#FEC458] hover:!to-[#FEC458]/90 hover:!text-blue-darkest hover:!shadow-lg !border-2 !border-transparent hover:!scale-105",

    ghost: "!bg-transparent !text-[#FEC458] !border-2 !border-[#FEC458]/50 hover:!bg-[#FEC458] hover:!border-[#FEC458] hover:!text-blue-darkest hover:!scale-105",

    white: "!bg-white !text-[#000a14] hover:!bg-[#FEC458] hover:!text-blue-darkest hover:!shadow-lg hover:!shadow-[#FEC458]/10 !border-2 !border-transparent hover:!scale-105"
  };

  const buttonStyles = `
    ${baseStyles}
    ${sizes[size]}
    ${variants[variant]}
    ${fullWidth ? "!w-full" : ""}
    ${className.includes('!rounded-full') ? '' : '!rounded-xl'}
    ${className}
  `;

  const IconComponent = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return <i className={`${icon} ${iconPosition === 'left' ? '!mr-2' : '!ml-2'}`} style={{ fontSize: '1em', transform: 'none' }} />;
    } else {
      return <span className={iconPosition === 'left' ? '!mr-2' : '!ml-2'}>{icon}</span>;
    }
  };

  const ButtonContent = () => (
    <>
      {iconPosition === 'left' && <IconComponent />}
      {children}
      {iconPosition === 'right' && <IconComponent />}
    </>
  );

  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return {
          backgroundImage: 'linear-gradient(to right, #3C91E6, #B4C2FF)',
          color: 'white',
          border: 'none'
        };
      case 'secondary':
        return {
          backgroundImage: 'linear-gradient(to right, #3C91E6, #B4C2FF)',
          color: 'white',
          border: 'none'
        };
      case 'tertiary':
        return {
          backgroundImage: 'linear-gradient(to right, #3C91E6, #B4C2FF)',
          color: 'white',
          border: 'none'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#FEC458',
          border: '2px solid rgba(254, 196, 88, 0.5)'
        };
      case 'white':
        return {
          backgroundColor: 'white',
          color: '#000a14',
          border: 'none'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch(size) {
      case 'small':
        return { padding: '0.75rem 1.5rem', fontSize: '0.875rem' };
      case 'medium':
        return { padding: '1rem 2rem', fontSize: '1rem' };
      case 'large':
        return { padding: '1.25rem 2.5rem', fontSize: '1.125rem' };
      case 'xlarge':
        return { padding: '1.5rem 2.5rem', fontSize: '1.25rem' };
      default:
        return {};
    }
  };

  const inlineStyles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    backgroundSize: variant === 'tertiary' ? '100% 100%' : 'auto',
    backgroundPosition: 'center',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    borderRadius: '0.5rem',
    transition: 'all 0.3s',
    cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
    ...props.style
  };

  if (external) {
    return (
      <a
        href={href}
        className={buttonStyles}
        style={inlineStyles}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <ButtonContent />
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <a className={buttonStyles} style={inlineStyles} {...props}>
          <ButtonContent />
        </a>
      </Link>
    );
  }

  return (
    <button className={buttonStyles} style={inlineStyles} {...props}>
      <ButtonContent />
    </button>
  );
};

export default CTAButton;