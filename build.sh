#!/bin/bash

# Install dependencies
npm install

# Build the client
npm run build

# Create the dist directory if it doesn't exist
mkdir -p dist/public

# Copy the built files to the dist directory
cp -r client/dist/* dist/public/ 