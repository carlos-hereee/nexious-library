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
# # Accessing the first argument PATH
arg1="$1"
# # Accessing the second argument
arg2="$2"
# # Accessing the third argument
arg3="$3"
# Define function for error handling
require_all_args() {
  # # Accessing the first argument PATH
  local path="$1"
  # # Accessing the second argument
  local pattern="$2"
  # # Accessing the third argument
  local newName="$3"
  # Check if the first argument is provided and not empty
  echo "Found arg. path is $path"
  # # -z is the test operator to check if path is empty
  if [ -z "$path" ]; then
    echo "Error Occured: first argument is not provided"
    echo "Posible Fix: change value to desired schema /path/to/directory"
    # Exit Code 1: This is often used to indicate a general error.
    # If a program or script encounters an unspecified or unexpected issue,
    # it may return an exit code of 1 to signal a problem without providing specific details.
    exit 1
  fi
  # Check if second argument is provided
  echo "Found arg. old file extensions are $pattern "
  if [ -z "$pattern" ]; then
    echo "Error Occured:  second argument is not provided"
    echo "Old file extension name is $pattern"
    echo "Posible Fix: change value to desired schema {js,jsx} or similar"
    # Exit Code 1: This is often used to indicate a general error.
    exit 1
  fi
  # Check if third argument is provided
  echo "Found arg. new file extensions is $newName"
  if [ -z "$newName" ]; then
    echo "Error Occured:  thrid argument is not provided"
    echo "Old file extension name is $newName"
    echo "Posible Fix: change value to desired schema {jsx} or similar"
    # Exit Code 1: This is often used to indicate a general error.
    exit 1
  fi
  # passed all errors start next process
  echo "Searching from root directory $path"
}
# Define function for searching files in a directory
search_directory() {
  local folder="$1"
  local pattern="$2"
  local newName="$3"

  # Check if folder exists
  if [ ! -d "$folder" ]; then
    echo "Folder does not exits"
    return 1
  fi

  # Search for files that match search critiria and count them
  local count
  count=$(find "$folder" -type f -name "$pattern" | wc -l)

  # if any files were found
  if [ "$count" -gt 0 ]; then
    echo "Files found "$count" matching the search criteria were found"
  else
    echo "Files found "$count" matching the search criteria were found"
  fi
}
# error handling first
require_all_args $arg1 $arg2 $arg3
# search directory
search_directory $arg1 $arg2 $arg3
