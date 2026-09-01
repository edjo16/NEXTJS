import { Phone, Smartphone, Mail, Globe, MapPin } from "lucide-react";

interface ContactInfoProps {
  phone: string;
  phone2: string;
  email: string;
  website: string;
}

export function ContactInfo({
  phone,
  phone2,
  email,
  website,
}: ContactInfoProps) {
  return (
    <div className="space-y-4">
      {/* Phone Numbers */}
      <div className="space-y-3">
        <ContactItem
          icon={<Smartphone className="w-4 h-4" />}
          label="Mobile"
          value={phone}
          href={`tel:${phone.slice(3)}`}
        />
        <ContactItem
          icon={<Phone className="w-4 h-4" />}
          label="Telephone"
          value={`(507) 263 3147`}
          href={`tel:(507) 263 3147`}
        />
      </div>

      {/* Email */}
      <ContactItem
        icon={<Mail className="w-4 h-4" />}
        label="Email"
        value={email}
        href={`mailto:${email}`}
      />

      {/* Website */}
      <ContactItem
        icon={<Globe className="w-4 h-4" />}
        label="Website"
        value={website}
        href={`https://${website}`}
        external
      />

      {/* Address */}
      <div className="flex items-start gap-3 text-sm">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 mt-0.5">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Address
          </p>
          <div className="text-gray-700 leading-relaxed">
            <p>Somerley Building 1st floor, Somerley,</p>
            <p>
              Worthing Main Road, Worthing,
            </p>
            <p>Christ Church, BB22025</p>
            <p>Barbados</p>
          </div>
          <button
            onClick={() => {
              const addressString = `Worthing Main Rd, Somerley Building 1st floor, Bridgetown, Christ Church Barbados`;
              const encodedAddress = encodeURIComponent(addressString);
              window.open(
                `https://maps.google.com/maps?q=${encodedAddress}`,
                "_blank",
              );
            }}
            className="text-teal-600 hover:text-primary-500 text-xs font-medium mt-2 hover:underline transition-colors"
          >
            SHOW ON MAP
          </button>
        </div>
      </div>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

function ContactItem({
  icon,
  label,
  value,
  href,
  external = false,
}: ContactItemProps) {
  return (
    <div className="flex items-center gap-3 text-sm group">
      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 group-hover:bg-teal-100 rounded-full flex items-center justify-center text-gray-800 group-hover:text-primary-500 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <a
          href={href}
          target={external ? "_blank" : "_self"}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-gray-700 hover:text-primary-500 transition-colors truncate block font-medium"
        >
          {value}
        </a>
      </div>
    </div>
  );
}
