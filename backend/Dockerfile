FROM node:18-alpine

# Provide a human-readable description for the image
LABEL org.opencontainers.image.description="E-Commerce Backend - Express.js server for MERN e-commerce application."

WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies for backend service
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy backend application code
COPY . .

# Expose the port your app listens on
EXPOSE 8000

# Start your app
CMD ["node", "index.js"]
