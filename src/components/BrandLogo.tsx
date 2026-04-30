type BrandLogoProps = {
  sizeClassName?: string;
  className?: string;
};

const BrandLogo = ({ sizeClassName = "h-10 md:h-[60px]", className = "" }: BrandLogoProps) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full overflow-hidden ${sizeClassName} aspect-square ${className}`}
      style={{
        background: "linear-gradient(135deg, #f5f2ec, #e6efe6)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src="/logo.png"
        alt="Health Studio by Geeta Angra"
        className="w-full h-full rounded-full"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default BrandLogo;
