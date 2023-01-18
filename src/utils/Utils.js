import resolveConfig from "tailwindcss/resolveConfig";

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig("./src/css/tailwind.config.js");
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export const formatPercent = (value) =>
  Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value);

export const iconStyling = {
  TikTok: "fa-brands fa-tiktok z-0",
  Instagram: "fa-brands fa-instagram z-0",
  Facebook: "fa-brands fa-facebook z-0",
  Twitter: "fa-brands fa-twitter z-0",
  YouTube: "fa-brands fa-youtube z-0",
  Twitch: "fa-brands fa-twitch z-0",
  Snapchat: "fa-brands fa-snapchat z-0",
  Reddit: "fa-brands fa-reddit z-0",
  Pinterest: "fa-brands fa-pinterest z-0",
  LinkedIn: "fa-brands fa-linkedin z-0",
};
