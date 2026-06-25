// components/CtaBlock.tsx
import CTAButton from "@/components/CTAButton";

interface CtaBlockProps {
  emoji: string;
  text: string;
  href: string;
  sub: string;
  variant?: "primary" | "ghost" | "white";
}

const CtaBlock = ({
  emoji,
  text,
  href,
  sub,
  variant = "primary",
}: CtaBlockProps) => {
  return (
    <div
      style={{
        margin: "2.5rem 0",
        padding: "2rem",
        borderRadius: "0.75rem",
        background: "linear-gradient(135deg, rgba(60,145,230,0.08) 0%, rgba(180,194,255,0.08) 100%)",
        border: "1px solid rgba(60,145,230,0.2)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <span style={{ fontSize: "2rem", lineHeight: 1 }}>{emoji}</span>
      <CTAButton href={href} variant={variant} size="large" external>
        {text}
      </CTAButton>
      <p
        style={{
          margin: 0,
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.6)",
          maxWidth: "480px",
        }}
      >
        {sub}
      </p>
    </div>
  );
};

export default CtaBlock;