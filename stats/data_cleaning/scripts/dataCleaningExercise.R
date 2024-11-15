## Set WD to stats
#setwd("~/Desktop/PSY 1903/psy1903/stats/")

## Create new directories
dir.create("data_cleaning/") # (this will be the parent directory for our R exercises)
dir.create("data_cleaning/output") # (data visualizations and plots will go here)
dir.create("data_cleaning/scripts") # (this is where we'll save any scripts we create)
dir.create("data_cleaning/data") # (if we save any intermediary or final data files, they will go here)

#### QUESTION 2 ------
## Set working directory
setwd("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/scripts/")

## Load packages
if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse", "rstudioapi", "lme4", "emmeans", "psych", "corrplot", "jsonlite")

## Read csv
iat_data1 <- read.csv("~/Desktop/PSY 1903/psy1903/osfstorage-archive/iat-2024-11-05-22-01-17.csv")

## Examine df
str(iat_data1)
summary(iat_data1)

#### QUESTION 3 ----
## Subset IAT
iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "disorders or humanizing" |
                         iat_data1$expectedCategoryAsDisplayed == "disorders or stigmatizing" |
                         iat_data1$expectedCategoryAsDisplayed == "treatment or stigmatizing" |
                         iat_data1$expectedCategoryAsDisplayed == "treatment or humanizing",
                       c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]

## Structure of iat_data2
str(iat_data2)
summary(iat_data2)

## Convert to factors
#iat_data2$expectedCategory <- as.factor(iat_data2$expectedCategory)
#iat_data2$expectedCategoryAsDisplayed <- as.factor(iat_data2$expectedCategoryAsDisplayed)
#iat_data2$leftCategory <- as.factor(iat_data2$leftCategory)
#iat_data2$rightCategory <- as.factor(iat_data2$rightCategory)

## Convert to factors with for loop
col_list <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")
for (col in col_list) {
  iat_data2[, col] <- as.factor(iat_data2[, col])
}
str(iat_data2)

#### QUESTION 4 ----
## IAT
## Step 1: Specify your function with one argument, data
calculate_IAT_dscore <- function(data) {
  
  ## Step 2: Select only trials with rt > 300 ms and < 5000 ms (subset full data frame into new data frame called tmp)
  tmp <- data[data$rt > 300 & data$rt < 5000,]
  
  ## Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials) 
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "disorders or stigmatizing" | tmp$expectedCategoryAsDisplayed == "treatment or humanizing",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "disorders or humanizing" | tmp$expectedCategoryAsDisplayed == "treatment or stigmatizing",]
  
  ## Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
  mean_congruent <- mean (congruent_trials$rt, na.rm = TRUE)
  mean_incongruent <- mean (incongruent_trials$rt, na.rm = TRUE)
  
  ## Step 5: Calculate standard deviation for all trials (pooled_sd) 
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  ## Step 6: Calculate D-score
  d_score <- (mean_incongruent - mean_congruent) / pooled_sd
  
  ## Step 7: Delete tmp file
  rm(tmp)
  
  ## Step 8: Return D-score
  return(d_score)
}
## Test out your function and see if you get a d-score
calculate_IAT_dscore(data) # output: 0.8726469


#### QUESTION 5 ----
## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* 
directory_path <- "~/Desktop/PSY 1903/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## IAT Version
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

## Rename the default column names to something meaningful
## IAT Version
colnames(dScores) <- c("participant_ID", "d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Now fill in the remaining code following the commented instructions:
# file <- files_list[[1]] # just for testing for loop

## Step 1: Initiate a for loop that iterates across each file in files_list
for (file in files_list) {
  
  ## Step 2: Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file)
  
  ## Step 3: Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))

  ## Step 4: Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  
  ## Step 5: Using similar logic, isolate the d_score column for the current row number (i) and assign it to be the current d-score by using our calculate_IAT_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  
  ## Step 6: Remove the temporary data file tmp  
  rm(tmp)

  ## Step 7: Increase our row number variable i by one for the next iteration
  i <- i + 1
}
## Step 8: Check your dScores data frame after you've run your for loop


## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

