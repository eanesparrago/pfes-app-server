import moment from "moment";

function generateCompleted(logs, date) {
  const domesticLogs = logs.domestic;
  const internationalLogs = logs.international;

  const year = moment(date).format("YYYY");

  var d = new Date();
  var currentMonth = d.getMonth() + 1;

  const completedDomestic = domesticLogs.filter(log => {
    return log.isCompleted;
  });

  const completedInternational = internationalLogs.filter(log => {
    return log.isCompleted;
  });

  // const resultDomestic = completedDomestic.filter(log => {
  //   return moment(log.dateCompleted).format("YYYY-MM") === date;
  // });

  const domesticValues = [];

  for (let i = 1; i <= currentMonth; i++) {
    let month = ("0" + i).slice(-2);

    domesticValues.push(
      completedDomestic.filter(log => {
        return (
          moment(log.dateCompleted).format("YYYY-MM") === `${year}-${month}`
        );
      }).length
    );
  }

  const internationalValues = [];

  for (let i = 1; i <= currentMonth; i++) {
    let month = ("0" + i).slice(-2);

    internationalValues.push(
      completedInternational.filter(log => {
        return (
          moment(log.dateCompleted).format("YYYY-MM") === `${year}-${month}`
        );
      }).length
    );
  }

  const completedData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    datasets: [
      {
        label: "Domestic",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#36A2EB",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#36A2EB",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: domesticValues
      },

      {
        label: "International",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#ff7a71",
        borderColor: "#ff7a71",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#ff7a71",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#ff7a71",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: internationalValues
      }
    ]
  };

  return completedData;
}

function generateTransport(logs, date) {
  const domesticLogs = logs.domestic;
  const internationalLogs = logs.international;

  const resultDomestic = domesticLogs.filter(log => {
    return moment(log.date).format("YYYY-MM") === date;
  });

  const resultInternational = internationalLogs.filter(log => {
    return moment(log.date).format("YYYY-MM") === date;
  });

  let truckDomestic = 0;
  let seaDomestic = 0;
  let airDomestic = 0;
  let seaInternational = 0;
  let airInternational = 0;

  resultDomestic.forEach(log => {
    switch (log.modeOfTransport) {
      case "Truck":
        truckDomestic++;
        break;

      case "Sea":
        seaDomestic++;
        break;

      case "Air":
        airDomestic++;
        break;

      default:
        console.log("Impossible value bug");
    }
  });

  resultInternational.forEach(log => {
    switch (log.modeOfTransport) {
      case "Sea":
        seaInternational++;
        break;

      case "Air":
        airInternational++;
        break;

      default:
        console.log("Impossible value bug");
    }
  });

  const transportData = {
    labels: ["Modes of Transport"],
    datasets: [
      {
        label: "Truck (D)",
        backgroundColor: "#36a2eb",
        borderColor: "#36a2eb",
        borderWidth: 1,
        hoverBackgroundColor: "#36a2eb",
        hoverBorderColor: "#36a2eb",
        data: [truckDomestic]
      },
      {
        label: "Sea (D)",
        backgroundColor: "#b192f3",
        borderColor: "#b192f3",
        borderWidth: 1,
        hoverBackgroundColor: "#b192f3",
        hoverBorderColor: "#b192f3",
        data: [seaDomestic]
      },
      {
        label: "Air (D)",
        backgroundColor: "#ff77c4",
        borderColor: "#ff77c4",
        borderWidth: 1,
        hoverBackgroundColor: "#ff77c4",
        hoverBorderColor: "#ff77c4",
        data: [airDomestic]
      },
      {
        label: "Sea (I)",
        backgroundColor: "#ff7a71",
        borderColor: "#ff7a71",
        borderWidth: 1,
        hoverBackgroundColor: "#ff7a71",
        hoverBorderColor: "#ff7a71",
        data: [seaInternational]
      },
      {
        label: "Air (I)",
        backgroundColor: "#ffa600",
        borderColor: "#ffa600",
        borderWidth: 1,
        hoverBackgroundColor: "#ffa600",
        hoverBorderColor: "#ffa600",
        data: [airInternational]
      }
    ]
  };

  return transportData;
}

function generateAssociate(logs, date) {
  const domesticLogs = logs.domestic;
  const internationalLogs = logs.international;

  const resultDomestic = domesticLogs.filter(log => {
    return moment(log.date).format("YYYY-MM") === date;
  });

  const resultInternational = internationalLogs.filter(log => {
    return moment(log.date).format("YYYY-MM") === date;
  });

  let domesticAssociates = [];
  resultDomestic.forEach(log => {
    domesticAssociates.push(log.associate);
  });

  let domesticAssociatesCount = {};
  domesticAssociates.forEach(associate => {
    domesticAssociatesCount[associate] =
      (domesticAssociatesCount[associate] || 0) + 1;
  });

  let internationalAssociates = [];
  resultInternational.forEach(log => {
    internationalAssociates.push(log.associate);
  });

  let internationalAssociatesCount = {};
  internationalAssociates.forEach(associate => {
    internationalAssociatesCount[associate] =
      (internationalAssociatesCount[associate] || 0) + 1;
  });

  let domesticAssociatesResult = [];

  for (let i in domesticAssociatesCount) {
    domesticAssociatesResult.push([i, domesticAssociatesCount[i]]);
  }

  domesticAssociatesResult.sort((a, b) => {
    return b[1] - a[1];
  });

  // International
  let internationalAssociatesResult = [];

  for (let i in internationalAssociatesCount) {
    internationalAssociatesResult.push([i, internationalAssociatesCount[i]]);
  }

  internationalAssociatesResult.sort((a, b) => {
    return b[1] - a[1];
  });

  return { domesticAssociatesResult, internationalAssociatesResult };
}

function generateShipper(logs, date) {
  const domesticLogs = logs.domestic;
  const internationalLogs = logs.international;

  const resultDomestic = domesticLogs.filter(log => {
    return moment(log.date).format("YYYY-MM") === date;
  });

  const resultInternational = internationalLogs.filter(log => {
    return moment(log.date).format("YYYY-MM") === date;
  });

  let domesticShippers = [];
  resultDomestic.forEach(log => {
    domesticShippers.push(log.shipperConsignee);
  });

  let domesticShippersCount = {};
  domesticShippers.forEach(shipperConsignee => {
    domesticShippersCount[shipperConsignee] =
      (domesticShippersCount[shipperConsignee] || 0) + 1;
  });

  let internationalShippers = [];
  resultInternational.forEach(log => {
    internationalShippers.push(log.shipperConsignee);
  });

  let internationalShippersCount = {};
  internationalShippers.forEach(shipperConsignee => {
    internationalShippersCount[shipperConsignee] =
      (internationalShippersCount[shipperConsignee] || 0) + 1;
  });

  let domesticShippersResult = [];

  for (let i in domesticShippersCount) {
    domesticShippersResult.push([i, domesticShippersCount[i]]);
  }

  domesticShippersResult.sort((a, b) => {
    return b[1] - a[1];
  });

  // International
  let internationalShippersResult = [];

  for (let i in internationalShippersCount) {
    internationalShippersResult.push([i, internationalShippersCount[i]]);
  }

  internationalShippersResult.sort((a, b) => {
    return b[1] - a[1];
  });

  return { domesticShippersResult, internationalShippersResult };
}

export default (logs, date) => {
  const completedData = generateCompleted(logs, date);
  const transportData = generateTransport(logs, date);
  const {
    domesticAssociatesResult,
    internationalAssociatesResult
  } = generateAssociate(logs, date);
  const {
    domesticShippersResult,
    internationalShippersResult
  } = generateShipper(logs, date);

  return {
    completedData,
    transportData,
    domesticAssociatesResult,
    internationalAssociatesResult,
    domesticShippersResult,
    internationalShippersResult
  };
};
