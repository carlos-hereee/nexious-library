#!/bin/bash

# KEY VARIABLES
# Total number of arguments
num_args="$#"
# All arguments as a single string
all_args="$*"
# All arguments as an array
args_array=("$@")
# Accessing the filename
filename="$0"
# Accessing the first argument
path="$1"
# Accessing the second argument
from="$2"
# Accessing the third argument
extentionName="$3"

# Check if the first argument is provided and not empty
# # -z is the test operator to check if path is empty
if [ -z $path ]; then
  echo "Error Occured: The first argument is not provided or is empty"
  echo "Path is $path"
  echo "Posible Fix: change value to desired schema /path/to/directory"
  # Exit Code 1: This is often used to indicate a general error.
  # If a program or script encounters an unspecified or unexpected issue,
  # it may return an exit code of 1 to signal a problem without providing specific details.
  exit 1
fi
# Check if the second argument is provided and not empty
if [ -z $from ]; then
  echo "Error Occured:  The second argument is not provided or is empty"
  echo "Posible Fix: change value to desired schema **/*.{js,jsx} or *.{js,jsx} or similar"
  # Exit Code 1: This is often used to indicate a general error.
  # If a program or script encounters an unspecified or unexpected issue,
  # it may return an exit code of 1 to signal a problem without providing specific details.
  exit 1
fi
# Check if the second argument is provided and not empty
if [ -z $to ]; then
  echo "Error Occured:  The second argument is not provided or is empty"
    echo "new file extention name is $to"
  echo "Posible Fix: change value to desired schema **/*.{js,jsx} or *.{js,jsx} or similar"
  # Exit Code 1: This is often used to indicate a general error.
  # If a program or script encounters an unspecified or unexpected issue,
  # it may return an exit code of 1 to signal a problem without providing specific details.
  exit 1
fi

# find ./src -type f -name '*.js' -not -name '*.jsx' -not -name '*.ejs' -exec bash -c 'grep -l "</" $0' {} \;
# -exec bash -c 'git mv "$0" "${0%.js}.jsx"' {} \;
# # use find --- searching for files and directories based on various criteria.
# # -type f -- specify the type of object you want to search for f means regular files
# # -name "" -- specify search criteria files with names ending in ".extesionName"
# find $path -type f -name "*.log" -exec echo "Processing file: {}" \;

#     echo "Proccesing file: $file"
#     # # add more stuff
