import Image from "next/image"

interface SocialLinksProps {
  socialLinks: {
    linkedin?: string;
  };
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  if (!socialLinks.linkedin) {
    return null;
  }

  return (
    <div className="pt-4 border-t border-gray-100">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
        Social Media
      </p>

      <div className="flex gap-3">
        {socialLinks.linkedin && (
        <Image
          src="/images/linkedin.svg"
          alt="LinkedIn"
          width={40}
          height={40}
          className="p-1 cursor-pointer"
          onClick={() => window.open(socialLinks.linkedin, "_blank")}
          title="LinkedIn"
        />
        )}
      </div>
    </div>
  );
}
