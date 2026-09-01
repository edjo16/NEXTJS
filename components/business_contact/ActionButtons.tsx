import { Phone, Mail, MapPin } from "lucide-react";

interface ActionButtonsProps {
  phone: string;
  email: string;
}

export function ActionButtons({ phone, email }: ActionButtonsProps) {
  const handleCall = () => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleEmail = () => {
    window.open(`mailto:${email}`, "_self");
  };

  const handleDirections = () => {
    const addressString = `Somerley Building 1st floor, Somerley, Worthing Main Road, Worthing,Christ Church, BB22025 Barbados`;
    const encodedAddress = encodeURIComponent(addressString);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank");
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <ActionButton
        icon={<Phone className="w-4 h-4" />}
        label="CALL"
        onClick={handleCall}
      />
      <ActionButton
        icon={<Mail className="w-4 h-4" />}
        label="EMAIL"
        onClick={handleEmail}
      />
      <ActionButton
        icon={<MapPin className="w-4 h-4" />}
        label="DIRECTIONS"
        onClick={handleDirections}
      />
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 min-w-[80px] group"
    >
      <div className="transform group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-xs font-medium tracking-wide">{label}</span>
    </button>
  );
}
