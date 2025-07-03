

# Stage 1 - Use Node base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for caching install step)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY public/ /app/public/
COPY src/ /app/src/

# Optional: Copy other root-level config files if needed
# COPY tsconfig.json ./
# COPY vite.config.js ./
# COPY .env ./

# Expose dev port
EXPOSE 5173

# Start Vite development server
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]
