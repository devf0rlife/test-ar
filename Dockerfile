# Use the kasmweb/chrome:1.16.0 image as the base
FROM kasmweb/chrome:1.16.0

# Expose port 6901 for the VNC server
EXPOSE 6901

# Set environment variables
ENV VNC_PW=p9023ds3 \
    SHM_SIZE=512m

# Default command to run the container
CMD ["--shm-size=512m", "-p", "6901:6901"]
