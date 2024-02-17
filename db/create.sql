BEGIN;

CREATE EXTENSION postgis;

CREATE TABLE spaces (
  campus VARCHAR,
  bldgname VARCHAR, 
  ts TIMESTAMP WITHOUT TIME ZONE, 
  present_elec_kwh NUMERIC,
  historical_elec_kwh NUMERIC,
  present_htwt_mmbtuh NUMERIC,
  historical_htwt_mmbtuh NUMERIC,
  present_wtr_usgal NUMERIC,
  historical_wtr_usgal NUMERIC,
  present_chll_tonh NUMERIC,
  historical_chll_tonh NUMERIC,
  present_co2_tonh NUMERIC,
  historical_co2_tonh NUMERIC,
  latitude NUMERIC,
  longitude NUMERIC,
  year INT,
  month INT,
  day INT,
  hour INT
);

\copy spaces FROM '/data/Animal_Science_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Arena_Auditorium_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Beta_House_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Centennial_Complex_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Central_Energy_Plant_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Centrex_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Child_Care_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/College_of_Law_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Corbett_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Fieldhouse_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Fieldhouse_North_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Fine_Arts_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Gateway_Center_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/General_Storage_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/High_Bay_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Indoor_Practice_Facility_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Information_Technology_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/RMMC_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Stadium_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Visual_Arts_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/WTBC_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Anthropology_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Arts_and_Sciences_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Aven_Nelson_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Berry_Center_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Biological_Sciences_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Cheney_Center_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Classroom_Building_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Coe_Library_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/College_of_Agriculture_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/College_of_Business_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/College_of_Education_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Earth_Sciences_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Education_Annex_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/EERB_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Energy_Innovation_Center_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Engineering_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Enzi-STEM_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Geological_Survey_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Geology_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Half_Acre_Gym_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/HAPC_and_RAC_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Health_Science_and_Pharmacy_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Hoyt_Hall_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Knight_Hall_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/McWhinnie_Hall_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Merica_Hall_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Old_Main_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Physical_Science_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Ross_Hall_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Science_Initiative_Building_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Service_Building_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Student_Union_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Vet_Lab_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Williams_Conservatory_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/WRI_and_Bureau_of_Mines_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';
\copy spaces FROM '/data/Wyoming_Hall_Data.csv' DELIMITER ',' CSV HEADER NULL AS '';

commit;