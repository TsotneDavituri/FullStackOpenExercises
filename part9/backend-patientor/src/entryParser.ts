import {
  EntryWithoutId,
  Diagnoses,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }
  return employerName;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge object');
  }

  const { date, criteria } = discharge as { date: unknown; criteria: unknown };

  if (!isString(date) || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge properties');
  }

  return {
    date,
    criteria,
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickLeave object');
  }

  const { startDate, endDate } = sickLeave as {
    startDate: unknown;
    endDate: unknown;
  };

  if (!isString(startDate) || !isString(endDate)) {
    throw new Error('Incorrect or missing sickLeave properties');
  }

  return {
    startDate,
    endDate,
  };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    typeof rating !== 'number' ||
    !Object.values(HealthCheckRating).includes(rating)
  ) {
    throw new Error('Incorrect or missing HealthCheckRating value');
  }

  return rating as HealthCheckRating;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnoses['code']> => {
  if (!Array.isArray(diagnosisCodes)) {
    return [] as Array<Diagnoses['code']>;
  }

  return diagnosisCodes as Array<Diagnoses['code']>;
};

const toNewHospitalEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'discharge' in object &&
    'type' in object
  ) {
    const newHospitalEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      discharge: parseDischarge(object.discharge),
      type: 'Hospital',
    };
    return newHospitalEntry;
  }
  throw new Error(
    'Incorrect data: some fields are missing or not filled out properly'
  );
};

const toNewHealthCheckEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'healthCheckRating' in object &&
    'type' in object
  ) {
    const newHealthCheckEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      type: 'HealthCheck',
    };
    return newHealthCheckEntry;
  }
  throw new Error(
    'Incorrect data: some fields are missing or not filled out properly'
  );
};

const toOccupationalHealthcareEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'diagnosisCodes' in object &&
    'sickLeave' in object &&
    'employerName' in object &&
    'type' in object
  ) {
    const newOccupationalHealthcareEntry: EntryWithoutId = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      sickLeave: parseSickLeave(object.sickLeave),
      employerName: parseEmployerName(object.employerName),
      type: 'OccupationalHealthcare',
    };
    return newOccupationalHealthcareEntry;
  }
  throw new Error(
    'Incorrect data: some fields are missing or not filled out properly'
  );
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (typeof object !== 'object' || object === null) {
    throw new Error('Invalid or missing object');
  }

  const entry = object as { type?: unknown };

  if (typeof entry.type !== 'string') {
    throw new Error('Invalid or missing entry type');
  }
  switch (entry.type) {
    case 'OccupationalHealthcare':
      return toOccupationalHealthcareEntry(object);
    case 'HealthCheck':
      return toNewHealthCheckEntry(object);
    case 'Hospital':
      return toNewHospitalEntry(object);
    default:
      throw new Error('Invalid entry type');
  }
};

export default toNewEntry;
