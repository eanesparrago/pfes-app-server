const holidays = [
  {
    title: "New Year's Day",
    comments: "Regular holiday",
    month: "01",
    day: "01"
  },
  {
    title: "New Year's Holiday",
    comments: "Regular holiday",
    month: "01",
    day: "02"
  },
  {
    title: "People Power Revolution",
    comments: "A special holiday for all schools",
    month: "02",
    day: "25"
  },
  {
    title: "The Day of Valor",
    comments: "Regular holiday",
    month: "04",
    day: "09"
  },
  {
    title: "Labor Day",
    comments: "Regular holiday",
    month: "05",
    day: "01"
  },
  {
    title: "Independence Day",
    comments: "Regular holiday",
    month: "06",
    day: "12"
  },
  {
    title: "Ninoy Aquino Day",
    comments: "Special non-working day",
    month: "08",
    day: "21"
  },
  {
    title: "All Saints Day",
    comments: "Special non-working day",
    month: "11",
    day: "01"
  },

  {
    title: "Bonifacio Day",
    comments: "Regular holiday",
    month: "11",
    day: "30"
  },
  {
    title: "Immaculate Conception Day",
    comments: "Special non-working holiday",
    month: "12",
    day: "08"
  },
  {
    title: "Christmas Eve",
    comments: "Special non-working day",
    month: "12",
    day: "24"
  },
  {
    title: "Christmas Day",
    comments: "Regular holiday",
    month: "12",
    day: "25"
  },
  {
    title: "Rizal Day",
    comments: "Regular holiday",
    month: "12",
    day: "30"
  },
  {
    title: "New Year's Eve",
    comments: "Special non-working day",
    month: "12",
    day: "31"
  }
];

const now = new Date();

export default holidays.map((holiday, index) => {
  return {
    id: index,
    title: holiday.title,
    allDay: true,
    start: new Date(`${now.getFullYear()}-${holiday.month}-${holiday.day}`),
    end: new Date(`${now.getFullYear()}-${holiday.month}-${holiday.day}`),
    type: "Holiday"
  };
});
