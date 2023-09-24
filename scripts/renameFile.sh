#!/bin/bash
# # Total number of arguments
# num_args="$#"
# # All arguments as a single string
# all_args="$*"
# # All arguments as an array
# args_array=("$@")
# # # Accessing the filename
# filename="$0"

# KEY VARIABLES
# Get the current directory path
current_dir=$(pwd)
node_module="node_modules/nexious-library/"
# # Accessing the first argument PATH
input_path=""$current_dir"/""$1"
# # remove node_modules from string if exists
path="${input_path//"$node_module"/}"
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
    echo "Posible Fix: update first arg. value to desired schema path or path/to/directory"
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
      # passed all errors start next process
      echo "Found directory on path "$path""
    fi
  fi
}
# Define function for searching files in a directory
require_pattern() {
  # Check if second argument is provided
  if [ -z "$pattern" ]; then
    echo "Error Occured:  second argument is not provided"
    echo "Old file extension name is $pattern"
    echo "Posible Fix: change value to desired schema 'jsx' or similar"
    # Exit Code 1: This is often used to indicate a general error.
    return 1
  fi
}
# count the number of files matching search critiria and count them
count_files_matching_criteria() {
  local count
  count=$(find "$path" -type f -name "*.{$pattern}" | wc -l)
  # if any matching files were found
  if [ "$count" -gt 0 ]; then
    # do things
    echo "Files found "$count" matching the search criteria "$pattern""
  else
    # No files found
    echo ""$count" files found matching search criteria"
    # echo "You are in the directory: "$path""
    return 1
  fi
}
require_new_name() {
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
}

# error handling first
require_path ""
require_pattern ""
# count_files_matching_criteria ""
# require_new_name ""
