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
        "Port of Departure Address",
        "Port of Departure City/Municipality",
        "Port of Departure Province Name",
        "Port of Departure Province Key",
        "Port of Arrival Address",
        "Port of Arrival City/Municipality",
        "Port of Arrival Province Name",
        "Port of Arrival Province Key",
        "Destination Address",
        "Destination City/Municipality",
        "Destination Province Name",
        "Destination Province Key",
        "Pickup Date",
        "Pickup Time",
        "ETD",
        "ETA",
        "Delivery Time",
        "Contact Name",
        "Contact Number",
        "Contact Email",
        "Status",
        "Urgent",
        "Insured",
        "Additional Remarks",
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
        log.modeOfTnsport,
        log.blAwb,
        log.origin.location,
        log.origin.city,
        log.origin.provinceName,
        log.origin.provinceKey,
        log.portOfDeparture.location,
        log.portOfDeparture.city,
        log.portOfDeparture.provinceName,
        log.portOfDeparture.provinceKey,
        log.portOfArrival.location,
        log.portOfArrival.city,
        log.portOfArrival.provinceName,
        log.portOfArrival.provinceKey,
        log.destination.location,
        log.destination.city,
        log.destination.provinceName,
        log.destination.provinceKey,
        log.pickupDate ? log.etd.slice(0, 10) : "",
        log.pickupTime,
        log.etd ? log.etd.slice(0, 10) : "",
        log.eta ? log.eta.slice(0, 10) : "",
        log.deliveryTime,
        log.contact.name,
        log.contact.number,
        log.contact.email,
        log.status,
        log.tags.urgent === true ? "YES" : "NO",
        log.tags.insured === true ? "YES" : "NO",
        log.additional,
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
        "Port of Departure Address",
        "Port of Departure Country",
        "Port of Arrival Address",
        "Port of Arrival Country",
        "Destination Address",
        "Destination Country",
        "Pickup Date",
        "ETD",
        "ETA",
        "Contact Name",
        "Contact Number",
        "Contact Email",
        "Status",
        "Urgent",
        "Insured",
        "Additional Remarks",
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
        log.portOfDeparture.location,
        log.portOfDeparture.country,
        log.portOfArrival.location,
        log.portOfArrival.country,
        log.destination.location,
        log.destination.country,
        log.pickupDate.slice(0, 10),
        log.etd.slice(0, 10),
        log.eta.slice(0, 10),
        log.contact.name,
        log.contact.number,
        log.contact.email,
        log.status,
        log.tags.urgent === true ? "YES" : "NO",
        log.tags.insured === true ? "YES" : "NO",
        log.additional,
        log.date,
        log.dateModified,
        log.type
      ]);
    });

    return data;
  }
};
