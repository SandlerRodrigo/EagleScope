# 🦅 EagleScope

EagleScope was developed during the Hackathon 2024 AGES PUCRS. The project aims to create an innovative application that automates the planning of routes for autonomous drone flights, 
integrating an advanced image recognition system to identify victims in emergency situations. This system not only helps optimize rescue operations but also provides a user-friendly interface 
and an efficient backend to handle complex route calculations. By combining real-time person detection, dynamic mapping, and cloud integration, EagleScope enhances the capabilities of 
autonomous drones in search and rescue missions, making emergency response faster and more effective.

## 🛠️ Installation

To install all dependencies for both frontend and backend, run the following command from the root directory:

```bash
npm install
```

This will automatically install dependencies in both the `Frontend` and `Backend` folders.

## 🚀 Running the Full Application

To start both frontend and backend servers simultaneously, use:

```bash
npm start
```

- The backend app will be accessible at `http://localhost:5173`.


## 📂 Project Structure

The project is organized as follows:

- **🛠️ Backend**: Handles the core logic for route optimization, calculations, and API services.
- **💻 Frontend**: Provides a user interface for interacting with the system, allowing users to visualize routes and interact with drone mapping features.
- **📜 Detector**: Contains Python scripts for detecting specific conditions or data processing related to the project.

### 🔧 Backend

The backend is built with Node.js and provides the necessary APIs for the project.

#### 🗂️ Key Components

- **📡 Controllers**: Manage the logic for handling API requests.
- **💼 Services**: Contain the core business logic and computations.
- **🔗 Routes**: Define the API endpoints.
- **🧰 Utils**: Utility functions, such as distance matrix calculations.

### 🖥️ Frontend

The frontend is built with React and TypeScript, providing a modern and responsive user interface.

#### 🗂️ Key Components

- **🏠 App.tsx**: The main entry point of the React application.
- **🔧 Components**: Reusable UI components such as cards, sidebars, and form fields.
- **📊 Mock Data**: Sample data used during development.
- **🖼️ Assets**: Images and icons used in the UI.

#### 📚 Key Libraries

- **🗺️ Leaflet**: Used for integrating interactive maps into the application.
- **📈 Recharts**: Used for creating dynamic and interactive charts.

# 👁️ Real-Time Person Detection with OpenCV, MediaPipe, and Upload to Amazon S3

This project includes a real-time person detection system using OpenCV, MediaPipe, and the `cvzone` library. When a person is detected, the program captures an image, saves it in JPEG format, and automatically uploads the image to an Amazon S3 bucket. Additionally, a temporary link to the image is generated, which can be used in the front-end.

## 🚀 Features

- **👤 Real-Time Person Detection**: Uses MediaPipe and the `cvzone` library to detect the presence of people in the image captured by the webcam.
- **📸 Image Capture**: When a person is detected, an image is captured and saved locally in JPEG format.
- **☁️ Automatic Upload to Amazon S3**: The captured image is automatically sent to an Amazon S3 bucket.
- **🔗 Generation of Signed URLs**: After the upload, a signed URL is generated for temporary access to the image on S3. This URL can be used to display the image in a web interface.

## 📋 Requirements

Before running the program, make sure you have installed the following dependencies:

- 🐍 Python 3.7 or higher
- 🖼️ OpenCV
- 🧠 MediaPipe
- 🛠️ cvzone
- 🌐 boto3
- 🔑 AWS CLI configured with valid credentials

### 🔧 Installing Dependencies

You can install the required dependencies using `pip`:

```bash
pip install opencv-python-headless mediapipe cvzone boto3
```

### 🛠️ AWS CLI Configuration

Before running the program, you need to configure your AWS credentials so that boto3 can access S3. Use the following command to configure AWS CLI:

```bash
aws configure
```

Provide your `AWS Access Key ID`, `AWS Secret Access Key`, `default region`, and preferred output format.

## 🚀 Running the Program

1. Navigate to the `Detectar` directory:

   ```bash
   cd Detectar
   ```

2. Run the Python script:

   ```bash
   python Detector.py
   ```

   Make sure you have a connected and working webcam.

### ⚙️ Script Parameters

- **🗂️ bucket_name**: Name of the Amazon S3 bucket where the images will be stored.
- **⏱️ capture_interval**: Minimum interval between image captures in seconds.

### 💡 Usage Example

The script captures images when it detects a person and automatically uploads them to S3. A link to the image is generated and can be used in the front-end to display the captured image.

## 🛠️ Troubleshooting

### 🛑 `NoCredentialsError`

This error indicates that boto3 could not find the AWS credentials. Make sure you have correctly configured AWS CLI with `aws configure` and check if the credentials are in your credentials file (`~/.aws/credentials`).

### ❌ `S3UploadFailedError`

If you encounter this error, it might be related to permissions on the S3 bucket or the IAM policy. Check the bucket permissions and the policies attached to your user or role.

### 🚫 `AllAccessDisabled`

This error indicates that access to the object or bucket has been disabled. Check the S3 bucket access settings and IAM permissions.
