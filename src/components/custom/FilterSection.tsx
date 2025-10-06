import { Button } from "../ui/button";

const FilterSection = ({
  selectedFilters,
  onFilterSelect,
  onUpdateResults,
  onReset,
}: {
  selectedFilters: Record<string, string[]>;
  onFilterSelect: (filter: string, category: string) => void;
  onUpdateResults: () => void;
  onReset: () => void;
}) => {
  // updated filter categories
  const filterCategories = {
    guestProfile: ["Adults Only, 18+", "Families with Kids, Under 18"],
    beachType: ["Cove Beach", "Long Stretch"],
    resortMood: [
      "More Tranquil",
      "More Intimate",
      "More Social",
      "More Expansive",
    ],
    signatureAccommodations: [
      "Rondoval Villas",
      "Over-The-Water Accommodations",
      "SkyPool and Swim Up Suites",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-3 mt-12" id="resort-filter">
      <div className="sticky top-0 z-10 bg-secondary py-4">
        <div className="flex lg:flex-row flex-col justify-between items-start">
          <div className=" text-primary">
            <h2 className=" text-4xl font-sandalsSlab mb-2">
              Build Your Dream Vacation
            </h2>
            <h3 className="text-base font-medium max-w-xl">
              Select your guest profile and up to three additional preferences,
              then press the submit preferences button to explore your
              recommended resort options.
            </h3>
            <div className="tag-breadcrumb"></div>
          </div>

          <div className="flex sm:flex-row w-full lg:w-auto flex-col mt-4 lg:mt-0 gap-3">
            <Button variant="outline" onClick={onUpdateResults}>
              Submit Preferences
            </Button>
            <Button variant="outline" onClick={onReset}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      {Object.entries(filterCategories).map(([category, filters]) => (
        <div
          key={category}
          className={`flex sm:flex-row flex-col sm:items-center gap-3 sm:gap-0  border-b border-primary  py-4 ${
            category === "guestProfile" ? "pb-4" : ""
          }`}
        >
          <h3 className=" text-primary  max-w-32 min-w-32 capitalize font-sandalsSans font-medium text-base">
            {category.replace(/([A-Z])/g, " $1").trim()}

            {category === "guestProfile" && (
              <>
                *
                <br />
                <span> Required</span>
              </>
            )}
          </h3>

          <div className="flex flex-wrap gap-2 ml-6">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={`${
                  selectedFilters[category]?.includes(filter)
                    ? "default"
                    : "secondary"
                }`}
                onClick={() => onFilterSelect(filter, category)}
              >
                <h3 className="font font-medium">{filter}</h3>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
