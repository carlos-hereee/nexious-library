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

# Define function for error handling
require_all_args() {
  # # Accessing the first argument
  local path="$1"
  # # Accessing the second argument
  local oldName="$2"
  # # Accessing the third argument
  local newName="$3"
  # Check if the first argument is provided and not empty
  # # -z is the test operator to check if path is empty
  if [ -z $path ]; then
    echo "Error Occured: first argument is not provided"
    echo "Path is $path"
    echo "Posible Fix: change value to desired schema /path/to/directory"
    # Exit Code 1: This is often used to indicate a general error.
    # If a program or script encounters an unspecified or unexpected issue,
    # it may return an exit code of 1 to signal a problem without providing specific details.
    exit 1
  fi
  # Check if second argument is provided
  if [ -z $oldName ]; then
    echo "Error Occured:  second argument is not provided"
    echo "Old file extension name is $oldName"
    echo "Posible Fix: change value to desired schema {js,jsx} or similar"
    # Exit Code 1: This is often used to indicate a general error.
    exit 1
  fi
  # Check if third argument is provided
  if [ -z $newName ]; then
    echo "Error Occured:  thrid argument is not provided"
    echo "Old file extension name is $newName"
    echo "Posible Fix: change value to desired schema {jsx} or similar"
    # Exit Code 1: This is often used to indicate a general error.
    exit 1
  fi
  # passed all errors start next process
  echo "Command found searching from root directory $path"
}
require_all_args $1 $2 $3
# find ./src \
# -type f
# -name '*.js'
# -not -name '*.jsx' -not -name '*.ejs'
# -exec bash -c 'grep -l "</" $0' {} \;
# -exec bash -c 'git mv "$0" "${0%.js}.jsx"' {} \;

# Search for files in the specified directory and its subdirectories
# that match the criteria of being regular files with names ending in ".log"
# and perform an action on each found file.
find $path -type f -name $oldName \
  -exec echo "Processing file: $filename" \;

#     # # add more stuff
