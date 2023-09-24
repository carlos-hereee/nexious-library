#!/bin/bash

# KEY VARIABLES
# Total number of arguments
num_args="$#"
# All arguments as a single string
all_args="$*"
# All arguments as an array
args_array=("$@")
# # Accessing the filename
filename="$0"
# Get the current directory path
current_dir=$(pwd)
# # Accessing the first argument PATH
path="$1"
# # Accessing the second argument
pattern="$2"
# # Accessing the third argument
newName="$3"

# for error handling, check if path exists, and directory
require_path() {
  # Check if the first argument is provided and not empty
  # # -z is the test operator to check if path is empty
  if [ -z "$path" ]; then
    echo "Error Occured: first argument is not provided"
    echo "Posible Fix: update first arg. value to desired schema ./path/to/directory"
    # Exit Code 1: This is often used to indicate a general error.
    # If a program or script encounters an unspecified or unexpected issue,
    # it may return an exit code of 1 to signal a problem without providing specific details.
    return 1
  else
    # first argument is path and it exists. Check if folder exists
    # ! -d checks if the directory does not exist
    if [ ! -d "$path" ]; then
      echo "No directory found on path "$path""
      return 1
    else
      echo "Directory found on path "$path""
    fi

  fi

  # Check if third argument is provided
  if [ -z "$newName" ]; then
    echo "Error Occured:  thrid argument is not provided"
    echo "Old file extension name is $newName"
    echo "Posible Fix: change value to desired schema {jsx} or similar"
    # Exit Code 1: This is often used to indicate a general error.
    exit 1
  else
    echo "Found arg. new file extensions is $newName"
  fi
  # passed all errors start next process
  echo "Searching directory $path"
}
# Define function for searching files in a directory
search_directory() {
  # Check if second argument is provided
  if [ -z "$pattern" ]; then
    echo "Error Occured:  second argument is not provided"
    echo "Old file extension name is $pattern"
    echo "Posible Fix: change value to desired schema 'jsx' or similar"
    # Exit Code 1: This is often used to indicate a general error.
    return 1
  else
    # Search for files that match search critiria and count them
    local count
    count=$(find "$path" -type f -name "*.{$pattern}" | wc -l)
    # if any files were found
    if [ "$count" -gt 0 ]; then
      # do things
      echo "Files found "$count" matching the search criteria"
    else
      # No files found
      echo ""$count" files found matching search criteria"
      echo "You are in the directory: "$current_dir""
      return 1
    fi
  fi
}
# error handling first
require_path ""
# search directory
# search_directory ""
