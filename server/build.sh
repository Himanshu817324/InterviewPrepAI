#!/bin/bash

# Install all dependencies including devDependencies
npm install

# Install specific type definitions that are missing
npm install --save-dev @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/mongoose @types/multer @types/dotenv

# Run the build
npm run build
