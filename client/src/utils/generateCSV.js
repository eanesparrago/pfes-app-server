export default (logs, type) => {
  if (type === "domestic") {
    let data = [
      [
        "JO#",
        "Associate",
        "Shipper/Consignee",
        "Mode of Transport",
        "BL/AWB#",
        "Origin Address",
        "Origin City/Municipality",
        "Origin Province Name",
        "Origin Province Key",
        "Destination Address",
        "Destination City/Municipality",
        "Destination Province Name",
        "Destination Province Key",
        "ETD",
        "ETA",
        "Rating",
        "Contact Name",
        "Contact Number",
        "Contact Email",
        "Status",
        "Urgent",
        "Important",
        "Insured",
        "Is Completed?",
        "Date Completed",
        "Completion Remarks",
        "Date Added",
        "Date Last Modified",
        "Type"
      ]
    ];

    logs.forEach(log => {
      data.push([
        log.domJo.toString(),
        log.associate,
        log.shipperConsignee,
        log.modeOfTransport,
        log.blAwb,
        log.origin.location,
        log.origin.city,
        log.origin.provinceName,
        log.origin.provinceKey,
        log.destination.location,
        log.destination.city,
        log.destination.provinceName,
        log.destination.provinceKey,
        log.etd ? log.etd.slice(0, 10) : "",
        log.eta ? log.eta.slice(0, 10) : "",
        log.rating,
        log.contact.name,
        log.contact.number,
        log.contact.email,
        log.status,
        log.tags.urgent === true ? "YES" : "NO",
        log.tags.important === true ? "YES" : "NO",
        log.tags.insured === true ? "YES" : "NO",
        log.isCompleted === true ? "YES" : "NO",
        log.dateCompleted,
        log.remarks,
        log.date,
        log.dateModified,
        log.type
      ]);
    });

    return data;
  } else if (type === "international") {
    let data = [
      [
        "JO#",
        "Associate",
        "Shipper/Consignee",
        "Mode of Transport",
        "BL/AWB#",
        "Origin Address",
        "Origin Country",
        "Destination Address",
        "Destination Country",
        "ETD",
        "ETA",
        "Rating",
        "Contact Name",
        "Contact Number",
        "Contact Email",
        "Status",
        "Urgent",
        "Important",
        "Insured",
        "Date Added",
        "Date Last Modified",
        "Type"
      ]
    ];

    logs.forEach(log => {
      data.push([
        log.domJo.toString(),
        log.associate,
        log.shipperConsignee,
        log.modeOfTransport,
        log.blAwb,
        log.origin.location,
        log.origin.country,
        log.destination.location,
        log.destination.country,
        log.etd.slice(0, 10),
        log.eta.slice(0, 10),
        log.rating,
        log.contact.name,
        log.contact.number,
        log.contact.email,
        log.status,
        log.tags.urgent === true ? "YES" : "NO",
        log.tags.important === true ? "YES" : "NO",
        log.tags.insured === true ? "YES" : "NO",
        log.date,
        log.dateModified,
        log.type
      ]);
    });

    return data;
  }
};
