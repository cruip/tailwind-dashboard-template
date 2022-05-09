
LOAD DATA INFILE 'rsui/csv/performance.csv' 
INTO TABLE widget_performance 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;



-- better use tsv for decimal value---
LOAD DATA INFILE 'rsui/csv/performance.tsv'
INTO TABLE widget_performance
FIELDS TERMINATED BY '\t'
ENCLOSED BY ''
LINES TERMINATED BY '\n'
IGNORE 1 LINES;