# PRD: TerapiaRespiroEmocional

## 1. Main Features
- **Main Screen**
  - Purpose: The purpose of this screen (dashboard) is to view statistical data based on the data in the database. You will be able to see:
    - All patients registered in the database
    - All caregivers registered in the database
    - Total number of patients under 18 years of age in the database
    - Total number of patients over 18 years of age in the database
    - Total number of substitute caregivers registered in the database
    - Preview of upcoming scheduled substitute caregivers

- **Patient Registration Form**
  - Purpose: To record detailed information for each patient.
  - Fields Included: Name, age, sex, diagnosis, contact information, etc.
  - How to Use: Enter and select the required patient information.

- **Patient Personal Card**
  - Purpose: Patient record page, where detailed information for each patient can be viewed, with the ability to edit fields, undo changes, and delete the patient from the system database.
  - Fields Included: Name, age, sex, diagnosis, contact information, etc.

- **Monthly Service Calendar**
  - Objective: To view and manage the dates and times of services provided.
  - Functionality: Allows scheduling of substitute caregivers and viewing events on the calendar.
  - How to use it: Add a new substitute caregiver appointment, fill in the required fields: date, time, number of substitute caregivers, cost, caregiver, and patient, etc. Select a previously registered caregiver, then select the patient that caregiver is caring for, and then click the "Search Substitute Care" button. Browse by month, preview by month, week, and day.

- **Excel File Export**
  - Objective: To accumulate and maintain a complete record of all services provided during the year to see the stadistics year to year.
  - Functionalities: Include service history, caregiver changes, schedules, costs, etc.
  - Monthly report with details of the patient and caregiver.
  - Export button: Exports all types of reports in Excel format.


## 2. Stack Tech
| Layer | Technology  |
|-----------|-------------|
|  Frameworks  |  Express.js/Angular  |
|  Languages  |  TypeScript/JS  |
|  Database  |  MySQL  |


## System Requirements – Implementation Status

| Phase | Module / Feature                        | Status      | Description                                                                                                              |
| ----- | --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1     | Emotional Respite Therapy – Main Screen | ✅ Completed | Initial screen for “Emotional Respite Therapy” services                                                                  |
| 2     | Patient Personal Record                 | ✅ Completed | Personal patient profile with editable information                                                                       |
| 3     | Monthly Service Calendar                | ✅ Completed | Monthly calendar view of provided services                                                                               |
| 4     | Electronic Medical Record (Accumulated) | ✅ Completed | Historical record of all services received throughout the year                                                           |
| 5     | Patient Scholarship Type                | ✅ Completed | Indicates whether the patient is scholarship-based or private                                                            |
| 6     | Scholarship Program Color Coding        | ✅ Completed | Color-coded by program: FGRA (blue), NMP (brown), SLIM (blue), CECPAM (pastel pink), Private (lilac), Others (specified) |
| 7     | Patient Category                        | ✅ Completed | Differentiation between Children and Adults                                                                              |
| 8     | Patient Status Button                   | ✅ Completed | Status control: Active, Cancelled, Deceased, Suspended, Discharged                                                       |
| 9     | Editable Records                        | ✅ Completed | Ability to correct patient and service information                                                                       |
| 10    | Caregiver & Service Management          | ✅ Completed | Change caregiver, service days, schedules, and costs                                                                     |
| 11    | Patient Search                          | ✅ Completed | Search patients by typing the first last name                                                                            |
| 12    | Service Statistics                      | ✅ Completed | Number of assigned patients and number of services provided                                                              |
| 13    | Monthly Service Reports                 | ✅ Completed | Monthly reports including patient data, diagnosis, caregiver information, and location                                   |
| 14    | Scholarship Program Reports             | ✅ Completed | Reports by scholarship program (FGRA, NMP, SLIM, CECPAM, Private, Others)                                                |
| 15    | Caregiver Feedback                      | ✅ Completed | Patient feedback to caregivers regarding the service received                                                            |
| 16    | Institutional Branding                  | ✅ Completed | All views include CECPAM logo, “Emotional Respite Therapy”, and “C-cuidarte” branding                                    |
| 17    | Data Export                             | ✅ Completed | Generate Excel files with customizable columns and statistical data                                                      |



