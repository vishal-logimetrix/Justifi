import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/data/india-states.geojson";

// Simple color scale based on active case count
const getColor = (active) => {
  if (active > 20) return "#e63946";
  if (active > 10) return "#f4a261";
  if (active > 0) return "#a8dadc";
  return "#d3d3d3"; // default gray
};

const IndiaStateMap = ({ districtData, onDistrictClick }) => {
  const [tooltip, setTooltip] = useState("");

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [82, 22] }}
        width={800}
        height={600}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName =
                geo.properties.STATE ||
                geo.properties.st_nm ||
                geo.properties.NAME_1 ||
                geo.properties.name ||
                geo.properties.State_Name ||
                "Unknown";

              const data = districtData[stateName] || { active: 0, closed: 0 };

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() =>
                    setTooltip(
                      `${stateName}: Active ${data.active}, Closed ${data.closed}`
                    )
                  }
                  onMouseLeave={() => setTooltip("")}
                  onClick={() => onDistrictClick(stateName, data)}
                  style={{
                    default: {
                      fill: getColor(data.active),
                      stroke: "#FFF",
                      outline: "none",
                    },
                    hover: {
                      fill: "#f53",
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#e42",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            padding: "6px 10px",
            border: "1px solid #ccc",
            pointerEvents: "none",
            top: 10,
            left: 10,
            fontSize: "14px",
            borderRadius: "4px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default IndiaStateMap;
