## Set WD to stats
# setwd("~/Desktop/PSY 1903/psy1903/stats/")

## Create new directories
dir.create("data_cleaning/") # (this will be the parent directory for our R exercises)
dir.create("data_cleaning/output") # (data visualizations and plots will go here)
dir.create("data_cleaning/scripts") # (this is where we'll save any scripts we create)
dir.create("data_cleaning/data") # (if we save any intermediary or final data files, they will go here)



#### TASK SET 12 ####
setwd("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/scripts/")

## Load packages
if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse", "rstudioapi", "lme4", "emmeans", "psych", "corrplot", "jsonlite")

## Read csv
iat_data1 <- read.csv("~/Desktop/PSY 1903/psy1903/osfstorage-archive/iat-2024-11-05-22-01-17.csv")

## Subset
iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "disorders or humanizing" |
                         iat_data1$expectedCategoryAsDisplayed == "disorders or stigmatizing" |
                         iat_data1$expectedCategoryAsDisplayed == "treatment or stigmatizing" |
                         iat_data1$expectedCategoryAsDisplayed == "treatment or humanizing",
                       c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]

## Convert to factors with for loop
col_list <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")
for (col in col_list) {
  iat_data2[, col] <- as.factor(iat_data2[, col])
}
str(iat_data2)


#### Q2: Updating d-score Function ----
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
## Test function
calculate_IAT_dscore(iat_data2) # output: 0.8726469




#### Q3: Score Questionnaire Function ----
## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
score_questionnaire <- function(data) {
  
  ## Extract questionnaire data cell
  json_data <- data[data$trialType == "questionnaire", "response"]
  
  ## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
  
  ## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric)) # override questionnaire
  questionnaire2 <- questionnaire
  
  ## Reverse score if necessary
  rev_items <- c("Q5", "Q6", "Q7", "Q8", "Q9")
  for (rev_item in rev_items) {
    questionnaire[,rev_item] <- 5 - questionnaire[,rev_item]
  }
  ## Calculate & return questionnaire score (mean)
  score <- rowMeans(questionnaire, na.rm = TRUE)
  
  return(score)
}

## Check
score_questionnaire(iat_data1) # output: 2.7



#### Q4: Refactoring within For Loop ----
#### Q5: Finalizing For Loop ----
## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* 
directory_path <- "~/Desktop/PSY 1903/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame w/ *FOUR columns
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 4))

## Rename  default column names to something meaningful AND add whichPrime, questionnaire
colnames(dScores) <- c("participant_ID", "d_score", "whichPrime", "questionnaire")

str(dScores)

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Initiate a for loop that iterates across each file in files_list
for (file in files_list) {
  
  ## Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file)
  
  ## "rt" column is numeric
  tmp$rt <- as.numeric(tmp$rt)
  
  ## "correct" column is logical
  tmp$correct <- is.logical(tmp$correct)
  
  ## Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  ## participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  
  ## Assign the dScores "whichPrime" column to be the current participant's prime label. 
  dScores[i, "whichPrime"] <- tmp$whichPrime[1]
  
  ## Isolate the d_score column for the current row number (i) and assign it to be the current d-score by using our calculate_IAT_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
  
  ## Assign the "questionnaire" column to be the output of the score_questionnaire function
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  
  ## Remove the temporary data file tmp  
  rm(tmp)
  
  ## Increase our row number variable i by one for the next iteration
  i <- i + 1
}

## "whichPrime" - factor
dScores$whichPrime <- as.factor(dScores$whichPrime)

## "d_score" and "questionnaire" - numeric
dScores$d_score <- as.numeric(dScores$d_score)
dScores$questionnaire <- as.numeric(dScores$questionnaire)

## "participant_ID" - character
dScores$participant_ID <- as.character(dScores$participant_ID)

## Remove rows with NA
dScores <- na.omit(dScores)

## Check your dScores data frame after you've run your for loop
view(dScores)
str(dScores)

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/PSY 1903/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)



#### TASK SET 13 ####
## Q2: Analyze the effect of your IV on your DV with a one-way ANOVA ##
## formula: aov(DV ~ IV, data = your_data)
aov <- aov(d_score ~ whichPrime, data = dScores)
summary(aov)

## Q3: T-Tests
tukey <- TukeyHSD(aov)
print(tukey)

## Q4: Correlation
correlation <- cor.test(dScores$d_score, dScores$questionnaire, 
                        method = "pearson")
print(correlation)

## Q5: Base R Histogram
png("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/output/Fig1_baseR_histogram.png", width = 600, height = 500)

histogram <- hist(dScores$d_score, 
                  main = "Distribution of D-Scores",
                  xlab = "D-Scores", 
                  ylab = "Frequency")
dev.off()

## Q6: GGPlot Histogram
png("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/output/Fig2_ggplot_histogram.png", width = 600, height = 500)

ggplot(dScores, aes(x = d_score)) + 
  geom_histogram(binwidth = 0.15, color = "black", fill = "skyblue") + 
  labs(title = "Distribution of D-Scores", 
       x = "D-Scores", 
       y = "Frequency") + 
  theme_minimal()

dev.off()


## Q7: GGPlot Histogram by Prime
png("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/output/Fig3_ggplot_histogram_by_prime.png", width = 600, height = 500)

ggplot(dScores, aes(x = d_score)) + 
  geom_histogram(binwidth = 0.15, color = "black", fill = "skyblue") + 
  labs(title = "Distribution of D-Scores", 
       x = "D-Scores", 
       y = "Frequency") + 
  theme_classic() +
  facet_wrap(~ whichPrime)

dev.off()

## Q8: GGPlot Boxplot
png("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/output/Fig4_ggplot_boxplot.png", width = 600, height = 500)

ggplot(dScores, aes(x = whichPrime, 
                    y = d_score, 
                    fill = whichPrime)) +
  geom_boxplot() + 
  labs(title = "Effect of Prime on D-Scores", 
       x = "Prime Condition", 
       y = "D-Scores") +  # Adds titles and labels
  theme_classic() +  # Apply the classic theme
  theme(legend.position = "none") +  # Remove the legend
  scale_x_discrete(labels = c("harvard" = "Home at Harvard",
                              "degree" = "College Degree is Hard"))

dev.off()

## Q9: GGPlot Scatterplot
png("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/output/Fig5_ggplot_scatter.png", width = 600, height = 500)

ggplot(dScores, aes(x = questionnaire, y = d_score)) + 
  geom_point() + 
  geom_smooth(method = "lm", se = FALSE, color = "blue") + 
  labs(title = "Correlation Between Questionnaire and D-Scores", 
       x = "Questionnaire", 
       y = "D-Scores") + 
  theme_classic()

dev.off()

## Q10: GGPlot Theme
png("~/Desktop/PSY 1903/psy1903/stats/data_cleaning/output/Fig6_custom_theme.png", width = 600, height = 500)

ggplot(dScores, aes(x = d_score)) + 
  geom_histogram(binwidth = 0.15, color = "black", fill = "darkblue") + 
  labs(title = "Distribution of D-Scores", 
       x = "D-Scores", 
       y = "Frequency") + 
  theme(
    plot.title = element_text(family = "Times New Roman", size = 17, face = "bold", color = "black", hjust = 0.5),
    axis.title.x = element_text(family = "Times New Roman", size = 13, color = "black"),
    axis.title.y = element_text(family = "Times New Roman", size = 13, color = "black"),
    
    axis.text.x = element_text(family = "Times New Roman", size = 12, color = "black"),
    axis.text.y = element_text(family = "Times New Roman", size = 12, color = "black"),
    
    panel.grid.major = element_line(color = "lightgray", size = 0.5),
    panel.grid.minor = element_line(color = "gray", size = 0.2),
    
    panel.background = element_rect(fill = "white", color = "black"),
    plot.background = element_rect(fill = "white"),
  ) +
  facet_wrap(~ whichPrime,
             labeller = labeller(whichPrime = c("harvard" = "Home at Harvard", 
                                                "degree" = "College Degree is Hard")))

dev.off()

