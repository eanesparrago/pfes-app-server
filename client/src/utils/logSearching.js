const JsSearch = require("js-search");

export default (logs, category, value) => {
  var search = new JsSearch.Search("_id");

  search.addDocuments(logs);

  if (category === "originLocation") {
    search.addIndex(["origin", "location"]);
    return search.search(value);
  } else if (category === "originCity") {
    search.addIndex(["origin", "city"]);
    return search.search(value);
  } else if (category === "originProvince") {
    search.addIndex(["origin", "provinceName"]);
    return search.search(value);
  } else if (category === "originCountry") {
    search.addIndex(["origin", "country"]);
    return search.search(value);
  } else if (category === "destinationLocation") {
    search.addIndex(["destination", "location"]);
    return search.search(value);
  } else if (category === "destinationCity") {
    search.addIndex(["destination", "city"]);
    return search.search(value);
  } else if (category === "destinationProvince") {
    search.addIndex(["destination", "provinceName"]);
    return search.search(value);
  } else if (category === "destinationCountry") {
    search.addIndex(["destination", "country"]);
    return search.search(value);
  } else if (category === "all") {
    search.addIndex("domJo");
    search.addIndex("associate");
    search.addIndex("shipperConsignee");
    search.addIndex("modeOfTransport");
    search.addIndex("blAwb");
    search.addIndex("pickupDate");
    search.addIndex("etd");
    search.addIndex("eta");
    search.addIndex(["origin", "location"]);
    search.addIndex(["origin", "city"]);
    search.addIndex(["origin", "provinceName"]);
    search.addIndex(["destination", "location"]);
    search.addIndex(["destination", "city"]);
    search.addIndex(["destination", "provinceName"]);
    return search.search(value);
  } else if (category === "tags") {
    switch (value) {
      case "urgent":
        return logs.filter(log => {
          return log.tags.urgent;
        });

      case "important":
        return logs.filter(log => {
          return log.tags.important;
        });

      case "insured":
        return logs.filter(log => {
          return log.tags.insured;
        });

      default:
        return logs;
    }
  } else {
    search.addIndex(category);
    return search.search(value);
  }
};
