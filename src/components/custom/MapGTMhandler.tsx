import { trackGAEvent } from "@/constants";
import { useEffect } from "react";

const MapGTMHandler = () => {
  useEffect(() => {
    function checkAndAttachListeners() {
      const iframe = document.querySelector("iframe");
      if (!iframe) return;

      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDocument) return;

      const bookNowBtn = iframeDocument.getElementById("Map_Pin_Book_Now");
      const exploreMoreBtn = iframeDocument.getElementById("Map_Pin_Explore_More");

      bookNowBtn?.addEventListener("click", function (e) {
        const target = e.target as HTMLElement;
        const eventBook = "Map_Pin_Book_Now_" + target.innerText.replace(/\s+/g, "_")
        trackGAEvent(eventBook, {});
      });

      exploreMoreBtn?.addEventListener("click", function (e) {
        const target = e.target as HTMLElement;
        const eventExplore = "Map_Pin_Explore_More_" + target.innerText.replace(/\s+/g, "_")
        trackGAEvent(eventExplore, {});
      });
    }

    function handleIframeClick() {
      checkAndAttachListeners(); // Re-check for buttons when iframe is clicked
    }

    const iframe = document.querySelector("iframe");
    iframe?.addEventListener("load", checkAndAttachListeners);
    iframe?.addEventListener("click", handleIframeClick); // Check dynamically

    return () => {
      iframe?.removeEventListener("load", checkAndAttachListeners);
      iframe?.removeEventListener("click", handleIframeClick);
    };
  }, []);

  return null; // This component doesn't render anything, just attaches listeners
};

export default MapGTMHandler;
