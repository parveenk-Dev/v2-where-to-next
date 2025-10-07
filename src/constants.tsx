export const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

type GAEventData = Record<string, unknown>;

type DataLayerEvent = Record<string, unknown>;
type WindowWithDataLayer = Window & {
  dataLayer?: DataLayerEvent[];
  gtag?: (...args: unknown[]) => void;
};

// handle the Google tag analytics by flow
// window.gtag('event', 'Event name', {any_key: `${value}`,})
export const trackGAEvent = (eventName: string, eventData: GAEventData) => {
  const w = window as unknown as WindowWithDataLayer;
  if (w.gtag) {
    w.gtag("event", eventName, eventData);
  }
};

type ResortType = { ResortTitle: string; ResortLink: string };
// export const handleBookNowClick = (resort: ResortType, eventData = {}, findertype: string) => {
//   const cardPrefix = `${findertype === "filter" ? "Filter" : findertype.replace(/\s+/g, "_") + "_Card"}_Book_Now_`
//   const eventName = `${cardPrefix}${resort.ResortTitle.replace(/\s+/g, "_")}`
//   trackGAEvent(eventName, eventData)
//    console.log("GA4 Tracking Event Fired:", eventName);

//   window.open(`${resort.ResortLink}`, "_blank");
// };

export const handleBookNowClick = (
  resort: ResortType,
  buttonLocation: string = "Island Card"
) => {
  if (typeof window !== "undefined") {
    const w = window as unknown as WindowWithDataLayer;
    w.dataLayer = w.dataLayer || [];

    const eventData: DataLayerEvent = {
      event: "book_now_clicked",
      resort_name: resort?.ResortTitle || "Unknown Resort",
      button_location: buttonLocation,
      page_location: window.location.href,
    };

    w.dataLayer.push(eventData);

    console.log("GA4 Tracking Event Fired:", eventData);
  }

  if (resort?.ResortLink) {
    window.open(`${resort.ResortLink}`, "_blank");
  } else {
    console.error("ResortLink is undefined or empty");
  }
};

export const handleHeroBookNowClick = () => {
  if (typeof window !== "undefined") {
    const w = window as unknown as WindowWithDataLayer;
    w.dataLayer = w.dataLayer || [];

    const eventData: DataLayerEvent = {
      event: "book_now_clicked",
      resort_name: "N/A",
      button_location: "Homepage Hero",
      page_location: window.location.href,
    };

    w.dataLayer.push(eventData);
    console.log("GA4 Tracking Event Fired:", eventData);
  }
  window.open("http://ltobe.sandals.com/", "_blank");
};

// logging function
export const logging = (message: string) => {
  console.log(message);
};

export const termsAndConditionClick = () => {
  const w = window as unknown as WindowWithDataLayer;
  w.dataLayer = w.dataLayer || [];
  const eventData: DataLayerEvent = {
    event: "footerLinkClick",
    label: "Terms & Conditions",
  };

  w.dataLayer.push(eventData);

  console.log("GA4 Tracking Event Fired:", eventData);

  window.open("https://www.sandals.com/terms/", "_blank");
};

export const cookiesAndPrivacyPolicyClick = () => {
  const w = window as unknown as WindowWithDataLayer;
  w.dataLayer = w.dataLayer || [];

  const eventData: DataLayerEvent = {
    event: "footerLinkClick",
    label: "Cookies & Privacy Policy",
  };

  w.dataLayer.push(eventData);

  console.log("GA4 Tracking Event Fired:", eventData);

  window.open("https://www.sandals.com/privacy/", "_blank");
};

export const privacyChoiceClick = () => {
  const w = window as unknown as WindowWithDataLayer;
  w.dataLayer = w.dataLayer || [];

  const eventData: DataLayerEvent = {
    event: "footerLinkClick",
    label: "Privacy Choice",
  };

  w.dataLayer.push(eventData);

  console.log("GA4 Tracking Event Fired: ", eventData);

  window.open("https://www.sandals.com/privacy-preferences/", "_blank");
};
