// Removed carousel imports - now using grid layout

type Island = {
  name: string;
  image: string;
};

const IslandCarousel = ({
  setActiveTab,
  setSelectedIsland,
  setFinderType,
}: {
  setActiveTab: (value: string) => void;
  setSelectedIsland: (value: string) => void;
  setFinderType: (value: string) => void;
}) => {
  const islands: Island[] = [
    { name: "Antigua", image: "assets/images/splash/antigua.webp" },
    { name: "Barbados", image: "assets/images/splash/barbados.jpg" },
    { name: "Bahamas", image: "assets/images/splash/bahamas.webp" },
    { name: "Curacao", image: "assets/images/splash/curacao.webp" },
    { name: "Grenada", image: "assets/images/splash/grenada.jpeg" },
    { name: "Jamaica", image: "assets/images/splash/jamaica.webp" },
    { name: "Saint Lucia", image: "assets/images/splash/saintlucia.webp" },
    { name: "Saint Vincent", image: "assets/images/splash/Vincent.jpg" },
    { name: "Turks and Caicos", image: "assets/images/splash/Turks.webp" },
  ];

  const handleIslandClick = (islandName: string) => {
    setActiveTab("Overview");
    setFinderType(islandName);
    setSelectedIsland(islandName);
  };

  return (
    <div className="islandCarousel" id="choose-your-island">
      <h2 className="text-[#0066FF] text-4xl max-w-7xl mx-auto font-normal font-sandalsSlab pl-3 mb-6 pt-12">
        Choose Your Island
      </h2>

      {/* 3x3 Grid Layout */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {islands.map((island, index) => (
            <div
              key={index}
              className=" w-full h-[170px] lg:h-[250px] relative rounded-3xl overflow-hidden cursor-pointer group"
              onClick={() => handleIslandClick(island.name)}
              data-island={island.name.toLowerCase().replace(/\s+/g, "-")}
            >
              <img
                src={island.image}
                alt={island.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute font-sandalsScript font-light bottom-4 left-4 text-white text-2xl lg:text-[42px]">
                {/* {island.name} */}
                {island.name === "Curacao" ? "Curaçao" : island.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IslandCarousel;
