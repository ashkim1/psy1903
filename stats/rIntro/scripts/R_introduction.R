#### (1) Setup initial directory structure -------------------------------------

## Start by setting your working directory to your psy1903 folder. Replace "~/Desktop/" with the correct path to your psy1903 directory:
setwd("~/Desktop/PSY 1903/psy1903/")

## Create a new parent directory called "stats" where we will be doing all of our R work:
dir.create("stats/")

## Create a new directory called "rIntro" for today's exercises:
dir.create("stats/rIntro")
## Create new subdirectories "data", "scripts", & "output" for today's exercises:
dir.create("stats/rIntro/data")
dir.create("stats/rIntro/scripts")
dir.create("stats/rIntro/output")

## Set working directory to the rIntro/scripts parent directory, which will be our home base for today:
setwd("~/Desktop/PSY 1903/psy1903/stats/rIntro/scripts")

## Save this script as R_introduction.R within your scripts directory (you can just use command+S or File → Save As)

#### (2) Installation of packages ----------------------------------------------

## Packages are essential toolboxes that you load into R and allow you to do cool things with your data
## One package called "pacman" makes installing packages very easy...

if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R

## Then use p_load and a list of all of the packages that you need for the project (with each one being in "quotes")

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot")  # tidyverse contains many packages like dplyr, tidyr, stringr, and ggplot2, among others, and the additional packages should cover our data manipulations, plotting, and analyses

## Variables
myVar <- 8  # This will create a variable called myVar and assign it a value of 8.
myVar + 2  # This will use the myVar variable and add 2, outputting 10
myVar <- myVar + 2  # This will overwrite the value of 8, and myVar will now be assigned 10 instead
#myVar 

## Functions
sum(1, 2, 3)       # Adds numbers 1, 2, and 3, returns 6
mean(c(1, 2, 3))   # Finds the mean (average) of the numbers. 
length(c(1, 2, 3)) # Finds the length of a vector, returns 3

mean(c(1, 2, 3, NA, 5)) # Will output NA because it doesn't know how to handle it
mean(c(1, 2, 3, NA, 5), na.rm = TRUE) # Will remove the NA and calculate the mean of the remaining numbers, outputting 2.75 (the correct answer)

## Load Dataset
mydata <- read.csv("../data/data.csv")
mydata <- read.csv("~/Desktop/PSY 1903/psy1903/stats/rIntro/data/data.csv", header = TRUE, stringsAsFactors = FALSE, na.strings = c("NA", "?"))

head(mydata)      # View the first few rows
str(mydata)       # See the structure of the data frame
summary(mydata)   # Get a summary of each column

mydata$moodGroup <- as.factor(mydata$moodGroup)
