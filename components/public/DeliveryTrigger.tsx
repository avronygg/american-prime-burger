"use client";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function DeliveryTrigger({ className, style, children }: Props) {
  function open() {
    window.dispatchEvent(new CustomEvent("apb:openDelivery"));
  }
  return (
    <button
      onClick={open}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
