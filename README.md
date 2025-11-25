A simple Node.js application connected to MongoDB, with Mongo Express for database management, fully containerized using Docker and Docker Compose.
# Quick Start

Clone the repository and run using Docker Compose:

git clone https://github.com/yourusername/your-repo.git
cd your-repo
docker-compose -f mongo.yaml up 

Service	URL
Node App	**http://localhost:3000**

Mongo Express	**http://localhost:8081**

MongoDB Config
In server.js:
make sure-> const mongoUrl = "mongodb://admin:password@mongodb"

Stop services:
docker-compose down
