#!/bin/bash

# Check if backup exists
if [ ! -f "index.html.bak" ]; then
  echo "Error: index.html.bak not found. Maintenance mode might not be active!"
  exit 1
fi

echo "Disabling maintenance mode and restoring site..."

# Remove temporary maintenance files
rm -f index.html 404.html

# Restore active pages
for file in index.html about.html contact.html engine.html pricing.html work.html; do
  if [ -f "$file.bak" ]; then
    echo "Restoring $file from $file.bak"
    mv "$file.bak" "$file"
  else
    echo "Warning: $file.bak not found, skipping."
  fi
done

echo "Website is back online!"
