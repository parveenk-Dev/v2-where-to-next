export const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY
export const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST


type GAEventData = object;

// handle the Google tag analytics by flow
// window.gtag('event', 'Event name', {any_key: `${value}`,})
export const trackGAEvent = (eventName: string, eventData: GAEventData) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
}

type ResortType = { ResortTitle: string, ResortLink: string }
export const handleBookNowClick = (resort: ResortType, eventData = {}, findertype: string) => {
  const cardPrefix = `${findertype === "filter" ? "Filter" : findertype.replace(/\s+/g, "_") + "_Card"}_Book_Now_`
  const eventName = `${cardPrefix}${resort.ResortTitle.replace(/\s+/g, "_")}`
  trackGAEvent(eventName, eventData)
   console.log("GA4 Tracking Event Fired:", eventName);
   
  window.open(`${resort.ResortLink}`, "_blank");
};

export const handleHeroBookNowClick = (title: string = "Homepage_Hero_Book_Now_Button", eventData = {}) => {
  trackGAEvent(title, eventData)
  window.open("http://ltobe.sandals.com/", "_blank");
};

// logging function
export const logging = (message: string) => {
  console.log(message);
};

export const termsAndConditionClick = () => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  const eventData = {
    event: "footerLinkClick",
    label: "Terms & Conditions"
  };

  (window as any).dataLayer.push(eventData);

  console.log("GA4 Tracking Event Fired:", eventData);

  window.open("https://www.sandals.com/terms/", "_blank");
};

export const cookiesAndPrivacyPolicyClick = () => {
  (window as any).dataLayer = (window as any).dataLayer || [];

  const eventData = {
    event: "footerLinkClick",
    label: "Cookies & Privacy Policy"
  };

  (window as any).dataLayer.push(eventData);

  console.log("GA4 Tracking Event Fired:", eventData);

  window.open("https://www.sandals.com/privacy/", "_blank");
};

export const privacyChoiceClick = () => {
  (window as any).dataLayer = (window as any).dataLayer || [];

  const eventData = {
    event: "footerLinkClick",
    label: "Privacy Choice"
  };

  (window as any).dataLayer.push(eventData);

  console.log("GA4 Tracking Event Fired:", eventData);

  window.open("https://www.sandals.com/privacy-preferences/", "_blank");
};