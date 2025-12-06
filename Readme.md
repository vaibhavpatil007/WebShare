# WebShare
![image](https://github.com/user-attachments/assets/d70e03b7-1963-4197-9d32-a0f3587e5700)

WebShare is a fast, secure, and lightweight file-sharing solution designed specifically for developers and tech teams. It enables quick file transfers over your local network—no sign-ins, no internet dependency. Your data stays private and within your network.
# Installation
Clone the repository
  git clone https://github.com/vaibhavpatil007/WebShare.git
>FrontEnd:
  - Folder Structure FileshareFE/webshare
  - npm install
  - npm start
>Backend:
  - Folder structure  webshare/webshare
  - python -m venv venv
  - On Windows:
  venv\Scripts\activate
  On Mac/Linux:
  source venv/bin/activate
  - pip install -r requirements.txt
  - python manage.py migrate
  - python manage.py createsuperuser
  - python manage.py runserver

# Contributing

Fork the repository
>Create a new branch (git checkout -b feature/xyz)
>Make changes and commit (git commit -m "Description")
>Push to your branch (git push origin feature/xyz)
>Open a Pull Request

# Features
> Create unique endpoints to start a file-sharing session.
> Upload any file type with a simple and intuitive interface.
> Share endpoint links with teammates or friends on the same network for seamless file access.
> No external servers — everything stays within your LAN.

# Getting Started
Create an endpoint to initialize a new file drop zone. 
![image](https://github.com/user-attachments/assets/6eac3f2c-f18b-4337-8818-aacc5ee6aa3f)

After creating the endpoint, you'll be directed to the upload page.
![image](https://github.com/user-attachments/assets/6c46670f-19e0-403f-b086-67078030ef26)

Upload your files by selecting the file type and choosing files from your system.
![image](https://github.com/user-attachments/assets/ef4776b4-299e-4504-9a0e-9f20f5c27a29)

Share the endpoint URL with anyone on the same local network for instant access and download.
![image](https://github.com/user-attachments/assets/0167ce29-74a6-474e-85b4-a7f1732cc98c)
