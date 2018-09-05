import moment from "moment";

export default function(logs) {
  const activeLogs = logs.filter(
    log => log.active === true && (log.status === "Ongoing" || log.status === "Complete")
  );

  const events = activeLogs.map(log => {
    const { preloading, loading, unloading } = log.operations;

    let operationsStatus = "Preloading";

    if (preloading.isFinished === true) {
      operationsStatus = "Loading";

      if (loading.isFinished === true) {
        operationsStatus = "Unloading";

        if (unloading.isFinished === true) {
          operationsStatus = "Delivered";
        }
      }
    }

    return {
      id: log._id,
      title: `${log.type.charAt(0)}-${log.domJo}`,
      allDay: true,
      start: moment(log.pickupDate).format("YYYY-MM-DD"),
      end: moment(log.eta).format("YYYY-MM-DD"),
      type: log.type,
      shipperConsignee: log.shipperConsignee,
      status: log.status,
      operationsStatus: operationsStatus,
      associate: log.associate,
      log: log
    };
  });

  return events;
}
