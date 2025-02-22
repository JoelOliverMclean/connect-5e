import React, { useState } from "react";
import Image from "next/image";

function CombatFeatures({ features, type }) {
  const [expandedFeature, setExpandedFeature] = useState({});
  const [isFeatureCollapsed, setIsFeatureCollapsed] = useState(
    features.reduce((acc, feature) => {
      acc[feature.name] = true;
      return acc;
    }, {})
  );

  const togglefeatureDescriptionWrapping = (featureName) => {
    const isExpanding = !expandedFeature[featureName];

    setExpandedFeature((prev) => ({
      ...prev,
      [featureName]: isExpanding,
    }));

    if (!isExpanding) {
      setTimeout(() => {
        setIsFeatureCollapsed((prev) => ({
          ...prev,
          [featureName]: true,
        }));
      }, 500);
    } else {
      setIsFeatureCollapsed((prev) => ({
        ...prev,
        [featureName]: false,
      }));
    }
  };

  return (
    <>
      <h2 className="text-center text-xl">{type}</h2>
      {features.map((feature) => (
        <div
          key={feature.name}
          className="p-2 border border-red-600 bg-red-950 rounded-lg flex flex-col gap-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold underline">{feature.name}</h4>
              {feature.usage && (
                <div className="text-sm font-bold flex items-center gap-2">
                  <div>Uses:</div>
                  <div className="flex gap-1">
                    {Array.from({ length: feature.usage.max }, (_, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-center w-[12px] h-[12px] rounded-full bg-black`}
                      >
                        <div
                          key={index}
                          className={`w-[6px] h-[6px] rounded-full p-1 ${
                            index < feature.usage.current && "bg-white"
                          }`}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {feature.usage && (
              <div className="text-sm px-1 border rounded-md bg-green-800 hover:bg-green-700 shadow-sm shadow-black">
                Use
              </div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col gap-1 ${
              expandedFeature[feature.name] ? "max-h-[1000px]" : "max-h-5"
            }`}
          >
            <p
              className={`text-xs ${
                !expandedFeature[feature.name] &&
                isFeatureCollapsed[feature.name]
                  ? "one-line-ellipsis"
                  : ""
              }`}
            >
              {feature.description}
            </p>
          </div>
          {feature.usage && (
            <p className="text-xs">Uses refresh on {feature.usage.refresh}</p>
          )}
          {feature.description.length > 50 && (
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => togglefeatureDescriptionWrapping(feature.name)}
            >
              <Image
                src="/icons/down_arrow_icon.png"
                width={24}
                height={24}
                alt="expand bonus action description"
                className={`transition-transform duration-300 ${
                  expandedFeature[feature.name] ? "rotate-180" : ""
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default CombatFeatures;
