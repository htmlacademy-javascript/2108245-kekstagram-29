const getMinutes = (string) => {
  const times = string.split(':').map(Number);
  return times[0] * 60 + times[1];
};

const checkTime = (workingDayBeginning, workingDayEnding, meetingBeginning, meetingDuration) => getMinutes(meetingBeginning) >= getMinutes(workingDayBeginning) && getMinutes(meetingBeginning) + meetingDuration <= getMinutes(workingDayEnding);

console.log(checkTime('8:00', '17:30', '08:00', 900));
