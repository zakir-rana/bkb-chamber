FROM alpine:3.19

# PocketBase version
ARG PB_VERSION=0.22.14

# Install dependencies
RUN apk add --no-cache \
    unzip \
    ca-certificates \
    wget

# Download PocketBase binary
RUN wget -q https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    -O /tmp/pb.zip && \
    unzip /tmp/pb.zip -d /pb && \
    rm /tmp/pb.zip && \
    chmod +x /pb/pocketbase

# Copy the frontend (index.html)
COPY index.html /pb/pb_public/index.html

# Copy migrations
COPY pb_migrations/ /pb/pb_migrations/

# Data volume mount point
VOLUME /pb/pb_data

EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations", "--publicDir=/pb/pb_public"]
