import PostHogPageView from "./components/PostHogPageView.ts";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { BrowserRouter } from "react-router-dom";
// App.jsx
import Hero from "@/components/custom/Hero";
import IslandCarousel from "@/components/custom/IslandCarousel";
import ResortFinder from "@/components/custom/ResortFinder";
import ResortGallery from "@/components/custom/ResortGallery";
import { useEffect, useState } from "react";
import Footer from "./components/custom/Footer";
import { resortData } from "./resortData";
import MapGTMHandler from "./components/custom/MapGTMhandler";
import { POSTHOG_HOST, POSTHOG_KEY, trackGAEvent } from "./constants";
// Just a test for permission

type Resort = {
  ResortTitle: string;
  ResortLink: string;
  Island: string;
  ResortDescription: string;
  IdealFor: { name: string; background: string; textColor?: string }[];
  IdealFor2?: { name: string; background: string; textColor?: string }[];
  IdealFor3?: { name: string; background: string; textColor?: string }[];
  Tags: string;
  Images: string;
  Beaches: string;
  Pool: string;
  Map?: string;
  Dining: string;
  watersports?: string;
  IslandTours?: string;
  City?: string;
  Tabs: { name: string; images: string[] }[];
};

const pushVirtualPageView = () => {
  console.log("Virtual Pageview Fired", {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  });
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "virtualPageview",
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
    });
  }
};

const App = () => {
  const [showResortData, setShowResortData] = useState<Resort[]>([]);
  const [selectedIsland, setSelectedIsland] = useState<string>("");
  const [showNoResults, setShowNoResults] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [, setFinderType] = useState("");

  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("user_logged_in");
    // posthog.identify(String(user_profile_id), {
    //   email,
    // })
    return () => {
      posthog.reset();
    };
  }, []);

  // Get resort name from URL parameters
  useEffect(() => {
    const urlParams = window.location.search.replace("?", "");

    if (urlParams) {
      const resortTitle = urlParams
        .replace(/=$/, "")
        .split("-")
        .map((word) =>
          word === "and"
            ? word
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      const matchingResort = resortData.find(
        (resort) => resort.ResortTitle === resortTitle
      );
      if (matchingResort) {
        setShowResortData([matchingResort]);
        setShowNoResults(false);
        pushVirtualPageView(); //Fire virtual pageview
      }
    }
  }, []); // Run once on component mount

  useEffect(() => {
    if (selectedIsland) {
      const filtered = resortData.filter(
        (resort: Resort) => resort.Island === selectedIsland
      );
      if (filtered.length === 0) {
        setShowNoResults(true);
      } else {
        setShowNoResults(false);
        setShowResortData(filtered);
        pushVirtualPageView();
      }
    }
  }, [selectedIsland]);

  useEffect(() => {
    if (showNoResults) {
      const galleryElement = document.querySelector(".gallery-no-result");
      if (galleryElement) {
        // Add a small delay to ensure state updates have completed
        setTimeout(() => {
          galleryElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
      return;
    }
    if (selectedIsland || showResortData.length > 0) {
      const galleryElement = document.querySelector(".gallery");
      if (galleryElement) {
        // Add a small delay to ensure state updates have completed
        setTimeout(() => {
          galleryElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [selectedIsland, showNoResults, showResortData]);

  // Check for search query in URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");
  const fallbackQuery = window.location.search.startsWith("?")
    ? window.location.search.substring(1)
    : null;
  const finalSearchQuery = searchQuery || fallbackQuery;
  useEffect(() => {
    if (finalSearchQuery) {
      const eventName = `Map_Pin_Explore More_${finalSearchQuery?.replace(
        /\s+/g,
        "_"
      )}`;
      trackGAEvent(eventName, {});
    }
  }, [finalSearchQuery, searchQuery]);

  //iframe GA tracking
  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      const { event: eventName } = event.data || {};

      if (eventName && typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];

        (window as any).dataLayer.push({
          event: eventName,
          category: "AtlistMapIframe",
          action: "Click",
          label: eventName.replaceAll("_", " "),
        });

        console.log("GA Event pushed from iframe:", eventName);
      }
    };

    window.addEventListener("message", handleIframeMessage);

    return () => {
      window.removeEventListener("message", handleIframeMessage);
    };
  }, []);

  return (
    <BrowserRouter>
      <PostHogProvider
        apiKey={POSTHOG_KEY}
        options={{
          api_host: POSTHOG_HOST,
        }}
      >
        <PostHogPageView />
        <div className="bg-secondary">
          <Hero />

          <div className="">
            <div className="gallery">
              <ResortGallery
                // finderType={finderType}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                resorts={showResortData}
                selectedIsland={selectedIsland}
                showNoResults={showNoResults}
              />
            </div>
            <div className="pt-10 pb-8" id="explore-map">
              <h2
                id="map-heading"
                className="text-[#0066FF] text-4xl w-full overflow-visible max-w-7xl mx-auto md:w-10/12 lg:w-11/12 md:px-0 font-sandalsSlab  "
              >
                Explore the Map
              </h2>
            </div>
            <iframe
              className="map h-[500px] md:h-[750px]"
              src="https://my.atlist.com/map/45ce2394-2a9a-49ac-ba8b-dc419396ba26?share=true"
              allow="geolocation 'self' https://my.atlist.com"
              margin-bottom="-5px"
              width="100%"
              // height="750px"
              loading="lazy"
              scrolling="no"
              id="atlist-embed"
            ></iframe>

            <MapGTMHandler />

            <IslandCarousel
              setActiveTab={setActiveTab}
              setSelectedIsland={setSelectedIsland}
              setFinderType={setFinderType}
            />
            <ResortFinder
              setActiveTab={setActiveTab}
              setShowResortData={setShowResortData}
              setShowNoResults={setShowNoResults}
              showNoResults={showNoResults}
              setFinderType={setFinderType}
            />
            <Footer />
          </div>
        </div>
      </PostHogProvider>
    </BrowserRouter>
  );
};

export default App;
