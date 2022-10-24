import {
  RaccoonMeadowsVolunteers,
  RaccoonMeadowsActivity,
  raccoonMeadowsVolunteers,
} from './raccoon-meadows-log';

import {
  WolfPointVolunteers,
  WolfPointActivity,
  wolfPointVolunteers,
} from './wolf-point-log';

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

type Volunteers = {
  id: number;
  name: string;
  activities: CombinedActivity[];
};

function combineVolunteers(
  volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
) {
  return volunteers.map(volunteer => {
    let id = volunteer.id
    if (typeof id === 'string') {
      const replc = id.replace(/\D/g, '')
      id = Number(replc)
    }

    return {
      id: id,
      name: volunteer.name,
      activities: volunteer.activities
    }
  })
}

function isVerified(verified: string | boolean) {
  if (typeof verified === 'string') {
    return verified === 'Yes'
  }

  return verified
}

function getHours(activity: CombinedActivity) {
  return 'hours' in activity ? activity.hours : activity.time
}

function calculateHours(volunteers: Volunteers[]) {
  return volunteers.map((volunteer) => {
    let hours = 0;

    volunteer.activities.forEach((activity) => {
      //change this later if no other changes
      if (isVerified(activity.verified)) {
        hours += getHours(activity)
      }
    });

    return {
      id: volunteer.id,
      name: volunteer.name,
      hours: hours,
    };
  });
}

function byHours(
    a : {id: number, name: string, hours: number},
    b : {id: number, name: string, hours: number}
    ) {
  return b.hours - a.hours
}

const combinedVolunteers = combineVolunteers(
  [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);

const result = calculateHours(combinedVolunteers)
console.log(result.sort(byHours))