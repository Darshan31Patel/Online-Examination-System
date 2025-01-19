# Online Examination System  

This is a full-stack application for conducting online examinations, including MCQ and programming sections. The project is built using Java Spring Boot for the backend and React for the frontend.  

## Steps to Run the Project  

### 1. Download the Project  
- Clone or download the project files from GitHub.  

### 2. Open the Project in Eclipse  
- Open **Eclipse IDE**.  
- Navigate to `File > Open Projects from File System` and select the project directory.  

### 3. Setup and Run the Frontend  
1. Open a terminal or command prompt and navigate to the `frontend/src/` directory.  
2. Run the following commands:  
   ```bash
   npm install
   npm run dev
3. The frontend will start running at http://localhost:3000.
   
### 4. Setup and Run the Backend
  1. Open the file `OnlineExamSystemApplication.java` located in `src/main/java/com/onlineExamSystem`.
  2. Run the file to start the backend server at http://localhost:8080.
### 5. Configure the Database
  1. Open the `application.properties` file located in `src/main/resources/`.
  2. Update the following fields with your database credentials:
     ```bash
      spring.datasource.url=jdbc:sqlserver://<server_name>:1433;database=<your_database_name>;encrypt=true;trustServerCertificate=true
      spring.datasource.username=<your_username>
      spring.datasource.password=<your_password>
### 6. Access the application
  1. Open a web browser and navigate to http://localhost:3000 to use the application.
